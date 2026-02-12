import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import { DiagramBackground } from "../../components/DiagramBackground";
import { AnimatedBox } from "../../components/AnimatedBox";
import { AnimatedArrow } from "../../components/AnimatedArrow";
import { AnimatedLabel } from "../../components/AnimatedLabel";
import { DARK_COLORS, FONTS } from "../../lib/design-tokens";
import { fadeIn, drawProgress, zoomTo, pulseRing } from "../../lib/animations";

/**
 * Schema anime : SSR & Hydratation (Dark Theme)
 *
 * Timeline (700 frames / ~23s a 30fps) :
 *
 * Scene 1 — CSR classique (0-150)
 * Scene 2 — SSR (150-320)
 * Scene 3 — HTML statique (320-420)
 * Scene 4a — JS Bundle Download (420-490)
 * Scene 4b — Hydratation + ZOOM (490-580)
 * Scene 5 — Recap (580-700)
 */

const C = DARK_COLORS;

// ── Inline SVG icons ──────────────────────────────────────────────

const LockIcon: React.FC<{ opacity: number }> = ({ opacity }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke={C.destructive}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ opacity }}
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const CursorIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={C.foreground}>
    <path d="M5 3l14 8-6.5 1.5L11 19z" />
  </svg>
);

const SpinnerIcon: React.FC<{ frame: number }> = ({ frame }) => {
  const rotation = (frame * 8) % 360;
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="3"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke={C.categories.rendering}
        strokeWidth="3"
        strokeLinecap="round"
        style={{
          transformOrigin: "center",
          transform: `rotate(${rotation}deg)`,
        }}
      />
    </svg>
  );
};

// ── UI Element (button/input/link styled box) ──────────────────────

interface UIElementProps {
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  active: boolean;
  opacity: number;
  showLock: boolean;
  lockOpacity: number;
}

const UIElement: React.FC<UIElementProps> = ({
  label,
  x,
  y,
  width,
  height,
  active,
  opacity,
  showLock,
  lockOpacity,
}) => {
  const bgColor = active
    ? C.categories.rendering
    : "rgba(255, 255, 255, 0.08)";
  const textColor = active ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.4)";
  const borderColor = active ? C.categories.rendering : C.border;
  const glowShadow = active
    ? `0 0 15px ${C.glow.blue}, 0 0 30px ${C.glow.blue}`
    : "none";

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        opacity,
        backgroundColor: bgColor,
        border: `1.5px solid ${borderColor}`,
        borderRadius: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONTS.sans,
        fontSize: 14,
        fontWeight: 600,
        color: textColor,
        boxShadow: glowShadow,
      }}
    >
      {label}
      {showLock && (
        <div
          style={{
            position: "absolute",
            top: -14,
            right: -10,
          }}
        >
          <LockIcon opacity={lockOpacity} />
        </div>
      )}
    </div>
  );
};

// ── Click flash feedback ──────────────────────────────────────────

interface ClickFlashProps {
  x: number;
  y: number;
  frame: number;
  startAt: number;
  success: boolean;
}

const ClickFlash: React.FC<ClickFlashProps> = ({
  x,
  y,
  frame,
  startAt,
  success,
}) => {
  const elapsed = frame - startAt;
  if (elapsed < 0 || elapsed > 30) return null;

  const color = success ? C.categories.fundamentals : C.destructive;
  const maxRadius = success ? 35 : 28;
  const radius = interpolate(elapsed, [0, 30], [6, maxRadius], {
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(elapsed, [0, 10, 30], [0.9, 0.7, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x - radius,
        top: y - radius,
        width: radius * 2,
        height: radius * 2,
        borderRadius: "50%",
        backgroundColor: color,
        boxShadow: `0 0 ${radius * 2}px ${color}`,
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};

// ── Browser viewport (screen zone) ──────────────────────────────

interface BrowserScreenProps {
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  shakeOffset?: number;
  children?: React.ReactNode;
}

const BrowserScreen: React.FC<BrowserScreenProps> = ({
  x,
  y,
  width,
  height,
  opacity,
  shakeOffset = 0,
  children,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width,
      height,
      opacity,
      backgroundColor: C.surface.browserBg,
      border: `1.5px solid ${C.surface.browserBorder}`,
      borderRadius: 10,
      overflow: "hidden",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
      transform: shakeOffset ? `translateX(${shakeOffset}px)` : undefined,
    }}
  >
    {/* Title bar */}
    <div
      style={{
        height: 28,
        backgroundColor: C.surface.browserTitleBar,
        borderBottom: `1px solid ${C.surface.browserBorder}`,
        display: "flex",
        alignItems: "center",
        gap: 5,
        paddingLeft: 10,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "rgb(239, 68, 68)",
        }}
      />
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "rgb(250, 204, 21)",
        }}
      />
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "rgb(34, 197, 94)",
        }}
      />
    </div>
    {/* Content area */}
    <div
      style={{
        position: "relative",
        width: "100%",
        height: height - 28,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  </div>
);

// ── Progress bar (JS bundle download) ──────────────────────────────

interface ProgressBarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  progress: number;
  opacity: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  x,
  y,
  width,
  height,
  progress,
  opacity,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width,
      height,
      opacity,
      backgroundColor: "rgba(255,255,255,0.06)",
      borderRadius: height / 2,
      border: `1px solid ${C.border}`,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: `${Math.min(progress * 100, 100)}%`,
        height: "100%",
        borderRadius: height / 2,
        background: `linear-gradient(90deg, ${C.categories.rendering}, ${C.categories.fundamentals})`,
        boxShadow: progress > 0.95 ? `0 0 20px ${C.glow.cyan}` : "none",
      }}
    />
  </div>
);

// ── Hydration pulse ring ──────────────────────────────────────────

interface HydrationPulseProps {
  x: number;
  y: number;
  width: number;
  height: number;
  frame: number;
  activateAt: number;
  color?: string;
}

const HydrationPulse: React.FC<HydrationPulseProps> = ({
  x,
  y,
  width,
  height,
  frame,
  activateAt,
  color = C.categories.fundamentals,
}) => {
  const { radius, opacity } = pulseRing(frame, activateAt, 18);
  if (opacity <= 0) return null;

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: x - radius,
          top: y - radius,
          width: width + radius * 2,
          height: height + radius * 2,
          borderRadius: 10,
          border: `2px solid ${color}`,
          opacity,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width,
          height,
          borderRadius: 6,
          boxShadow: `0 0 ${15 + radius}px ${color}`,
          opacity: opacity * 0.6,
          pointerEvents: "none",
        }}
      />
    </>
  );
};

// ── Timeline step (for recap) ──────────────────────────────────

interface TimelineStepProps {
  label: string;
  x: number;
  y: number;
  active: boolean;
  opacity: number;
}

const TimelineStep: React.FC<TimelineStepProps> = ({
  label,
  x,
  y,
  active,
  opacity,
}) => {
  const bg = active ? C.categories.rendering : C.muted;
  const color = active ? "rgb(255, 255, 255)" : C.foreground;
  const border = active ? C.categories.rendering : C.border;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        padding: "10px 20px",
        backgroundColor: bg,
        border: `1.5px solid ${border}`,
        borderRadius: 8,
        fontFamily: FONTS.sans,
        fontSize: 15,
        fontWeight: 600,
        color,
        whiteSpace: "nowrap",
        opacity,
      }}
    >
      {label}
    </div>
  );
};

// ── Main composition ──────────────────────────────────────────

export const SSRHydrationFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Scene boundaries ──
  const scene2Start = 150;
  const scene3Start = 320;
  const scene4aStart = 420;
  const scene4bStart = 490;
  const scene5Start = 580;

  // ── Scene 1 visibility (CSR) ──
  const scene1Opacity =
    frame < scene2Start
      ? 1
      : interpolate(frame, [scene2Start, scene2Start + 20], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

  // ── Scene 2+ visibility (SSR) — fade out before scene 5 ──
  const scene2FadeIn = fadeIn(frame, scene2Start + 15, 20);
  const scene2FadeOut =
    frame < scene5Start
      ? 1
      : interpolate(frame, [scene5Start, scene5Start + 20], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  const scene2Opacity = scene2FadeIn * scene2FadeOut;

  // ── Hydration element activation (scene 4b) ──
  const btnActive = frame >= 505;
  const inputActive = frame >= 515;
  const linkActive = frame >= 525;
  const allActive = frame >= 525;

  // Lock visibility (scene 3 to 4b start)
  const showLocks = frame >= scene3Start && !btnActive;
  const lockOpacity = showLocks ? fadeIn(frame, scene3Start, 20) : 0;

  // Cursor click frames
  const cursorClickFrame1 = 365;
  const cursorClickFrame2 = 555;

  // Shake effect on failed click
  const shakeOffset =
    frame >= cursorClickFrame1 && frame < cursorClickFrame1 + 10
      ? Math.sin((frame - cursorClickFrame1) * 2.5) * 3
      : 0;

  // Screen positions (enlarged)
  const browserScreenX = 100;
  const browserScreenY = 255;
  const browserScreenW = 380;
  const browserScreenH = 220;

  // JS Bundle progress bar (scene 4a)
  const jsBundleProgress =
    frame >= 445
      ? interpolate(frame, [445, 488], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  // ── Zoom (scene 4b) ──
  const focalX = browserScreenX + browserScreenW / 2;
  const focalY = browserScreenY + browserScreenH / 2;
  const zoom = zoomTo(frame, fps, scene4bStart, 565, 1.35, focalX, focalY);

  // UI element positions (inside browser screen area)
  const uiBtnX = browserScreenX + 25;
  const uiBtnY = browserScreenY + 150;
  const uiInputX = browserScreenX + 135;
  const uiInputY = browserScreenY + 150;
  const uiLinkX = browserScreenX + 270;
  const uiLinkY = browserScreenY + 150;

  return (
    <AbsoluteFill>
      <DiagramBackground
        gradient="rendering"
        bgColor={C.background}
        gridColor={C.surface.gridLine}
      />

      {/* ══════════ TITRE PRINCIPAL (hors zoom) ══════════ */}
      <AnimatedLabel
        text="SSR & Hydratation"
        x={640}
        y={42}
        appearAt={0}
        fontSize={36}
        fontWeight={700}
        color={C.foreground}
      />

      {/* ══════════ ZOOM WRAPPER (scenes 1-4) ══════════ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${zoom.scale}) translate(${zoom.translateX}px, ${zoom.translateY}px)`,
          transformOrigin: "center center",
        }}
      >
        {/* ══════════ SCENE 1 : CSR classique ══════════ */}
        <div style={{ opacity: scene1Opacity }}>
          {/* Phase label */}
          <AnimatedLabel
            text="Client-Side Rendering (CSR)"
            x={640}
            y={90}
            appearAt={5}
            fontSize={20}
            fontWeight={600}
            color={C.mutedForeground}
          />

          {/* Navigateur */}
          <AnimatedBox
            label="Navigateur"
            x={280}
            y={180}
            width={240}
            height={85}
            category="rendering"
            appearAt={20}
            bgColor={C.card}
            textColor={C.foreground}
          />

          {/* Serveur */}
          <AnimatedBox
            label="Serveur"
            x={1010}
            y={180}
            width={240}
            height={85}
            category="fundamentals"
            appearAt={30}
            bgColor={C.card}
            textColor={C.foreground}
          />

          {/* Fleche requete */}
          <AnimatedArrow
            fromX={400}
            fromY={165}
            toX={890}
            toY={165}
            category="rendering"
            appearAt={50}
            drawDuration={25}
            label="GET /page"
            labelColor={C.mutedForeground}
            labelFontSize={15}
          />

          {/* Texte explicatif requete */}
          {frame >= 50 && frame < 80 && (
            <AnimatedLabel
              text="Le navigateur envoie une requete au serveur"
              x={640}
              y={128}
              appearAt={50}
              fontSize={16}
              fontWeight={500}
              color={C.mutedForeground}
            />
          )}

          {/* Fleche reponse HTML vide */}
          <AnimatedArrow
            fromX={890}
            fromY={195}
            toX={400}
            toY={195}
            category="fundamentals"
            appearAt={80}
            drawDuration={25}
            labelColor={C.mutedForeground}
            labelFontSize={15}
          />

          {/* Label reponse */}
          {frame >= 80 && (
            <AnimatedLabel
              text={'<div id="root"></div>'}
              x={640}
              y={210}
              appearAt={80}
              fontSize={15}
              fontWeight={600}
              fontFamily={FONTS.mono}
              color={C.destructive}
            />
          )}

          {/* Texte explicatif reponse */}
          {frame >= 85 && (
            <AnimatedLabel
              text="Le serveur renvoie un HTML quasi-vide"
              x={640}
              y={238}
              appearAt={85}
              fontSize={16}
              fontWeight={500}
              color={C.mutedForeground}
            />
          )}

          {/* Ecran blanc / spinner */}
          {frame >= 110 && (
            <BrowserScreen
              x={browserScreenX}
              y={browserScreenY}
              width={browserScreenW}
              height={browserScreenH}
              opacity={fadeIn(frame, 110, 15)}
            >
              <SpinnerIcon frame={frame} />
              <span
                style={{
                  marginTop: 8,
                  fontFamily: FONTS.sans,
                  fontSize: 14,
                  color: C.mutedForeground,
                }}
              >
                Chargement...
              </span>
            </BrowserScreen>
          )}

          {/* Texte explicatif ecran blanc */}
          {frame >= 115 && (
            <AnimatedLabel
              text="L'utilisateur voit un ecran blanc pendant le chargement du JS"
              x={640}
              y={520}
              appearAt={115}
              fontSize={16}
              fontWeight={600}
              color={C.destructive}
            />
          )}
        </div>

        {/* ══════════ SCENE 2 : SSR ══════════ */}
        {frame >= scene2Start && (
          <div style={{ opacity: scene2Opacity }}>
            {/* Transition label */}
            <AnimatedLabel
              text="Avec le Server-Side Rendering..."
              x={640}
              y={90}
              appearAt={scene2Start}
              fontSize={20}
              fontWeight={600}
              color={C.categories.fundamentals}
            />

            {/* Navigateur SSR */}
            <AnimatedBox
              label="Navigateur"
              x={280}
              y={180}
              width={240}
              height={85}
              category="rendering"
              appearAt={scene2Start + 25}
              bgColor={C.card}
              textColor={C.foreground}
            />

            {/* Serveur SSR */}
            <AnimatedBox
              label="Serveur Node.js"
              subtitle="+ React"
              x={1010}
              y={180}
              width={250}
              height={85}
              category="fundamentals"
              appearAt={scene2Start + 30}
              highlightAt={scene2Start + 85}
              bgColor={C.card}
              textColor={C.foreground}
              subtitleColor={C.mutedForeground}
            />

            {/* Fleche requete SSR */}
            <AnimatedArrow
              fromX={400}
              fromY={165}
              toX={885}
              toY={165}
              category="rendering"
              appearAt={scene2Start + 55}
              drawDuration={25}
              label="GET /page"
              labelColor={C.mutedForeground}
              labelFontSize={15}
            />

            {/* Texte requete SSR */}
            {frame >= scene2Start + 55 && frame < scene2Start + 85 && (
              <AnimatedLabel
                text="Meme requete initiale"
                x={640}
                y={128}
                appearAt={scene2Start + 55}
                fontSize={16}
                fontWeight={500}
                color={C.mutedForeground}
              />
            )}

            {/* Serveur execute React */}
            {frame >= scene2Start + 85 && (
              <AnimatedLabel
                text="React s'execute sur le serveur"
                x={1010}
                y={240}
                appearAt={scene2Start + 85}
                fontSize={14}
                fontWeight={600}
                color={C.categories.fundamentals}
              />
            )}

            {/* Texte explicatif execution serveur */}
            {frame >= scene2Start + 90 && frame < scene2Start + 115 && (
              <AnimatedLabel
                text="Le serveur execute React et genere le HTML complet"
                x={640}
                y={128}
                appearAt={scene2Start + 90}
                fontSize={16}
                fontWeight={500}
                color={C.mutedForeground}
              />
            )}

            {/* Fleche reponse HTML complet */}
            <AnimatedArrow
              fromX={885}
              fromY={195}
              toX={400}
              toY={195}
              category="fundamentals"
              appearAt={scene2Start + 115}
              drawDuration={25}
              label="HTML complet"
              labelColor={C.mutedForeground}
              labelFontSize={15}
            />

            {/* Texte reponse HTML complet */}
            {frame >= scene2Start + 120 && frame < scene2Start + 145 && (
              <AnimatedLabel
                text="Le HTML contient deja tout le contenu visible"
                x={640}
                y={128}
                appearAt={scene2Start + 120}
                fontSize={16}
                fontWeight={500}
                color={C.mutedForeground}
              />
            )}

            {/* Browser screen avec contenu grise */}
            {frame >= scene2Start + 145 && (
              <BrowserScreen
                x={browserScreenX}
                y={browserScreenY}
                width={browserScreenW}
                height={browserScreenH}
                opacity={fadeIn(frame, scene2Start + 145, 15)}
                shakeOffset={shakeOffset}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    padding: "16px 24px",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      height: 12,
                      width: "70%",
                      backgroundColor: allActive
                        ? C.foreground
                        : "rgba(255,255,255,0.15)",
                      borderRadius: 3,
                    }}
                  />
                  <div
                    style={{
                      height: 8,
                      width: "90%",
                      backgroundColor: allActive
                        ? "rgba(255,255,255,0.5)"
                        : "rgba(255,255,255,0.08)",
                      borderRadius: 2,
                    }}
                  />
                  <div
                    style={{
                      height: 8,
                      width: "75%",
                      backgroundColor: allActive
                        ? "rgba(255,255,255,0.5)"
                        : "rgba(255,255,255,0.08)",
                      borderRadius: 2,
                    }}
                  />
                </div>
              </BrowserScreen>
            )}

            {/* Elements UI (bouton, input, lien) */}
            {frame >= scene2Start + 145 && (
              <>
                <UIElement
                  label="Bouton"
                  x={uiBtnX}
                  y={uiBtnY}
                  width={90}
                  height={36}
                  active={btnActive}
                  opacity={fadeIn(frame, scene2Start + 148, 15)}
                  showLock={showLocks}
                  lockOpacity={lockOpacity}
                />
                <UIElement
                  label="Input"
                  x={uiInputX}
                  y={uiInputY}
                  width={110}
                  height={36}
                  active={inputActive}
                  opacity={fadeIn(frame, scene2Start + 150, 15)}
                  showLock={showLocks}
                  lockOpacity={lockOpacity}
                />
                <UIElement
                  label="Lien"
                  x={uiLinkX}
                  y={uiLinkY}
                  width={70}
                  height={36}
                  active={linkActive}
                  opacity={fadeIn(frame, scene2Start + 152, 15)}
                  showLock={showLocks}
                  lockOpacity={lockOpacity}
                />
              </>
            )}

            {/* Texte "contenu visible immediatement" */}
            {frame >= scene2Start + 150 && frame < scene3Start && (
              <AnimatedLabel
                text="Contenu visible immediatement, mais..."
                x={640}
                y={520}
                appearAt={scene2Start + 150}
                fontSize={16}
                fontWeight={600}
                color={C.categories.rendering}
              />
            )}
          </div>
        )}

        {/* ══════════ SCENE 3 : HTML statique ══════════ */}
        {frame >= scene3Start && frame < scene4aStart && (
          <>
            <AnimatedLabel
              text="Les elements sont visibles mais non-interactifs"
              x={640}
              y={520}
              appearAt={scene3Start}
              fontSize={16}
              fontWeight={600}
              color={C.destructive}
            />

            {/* Texte event handlers */}
            {frame >= scene3Start + 35 && (
              <AnimatedLabel
                text="Les event handlers ne sont pas encore attaches"
                x={640}
                y={555}
                appearAt={scene3Start + 35}
                fontSize={14}
                fontWeight={500}
                color={C.mutedForeground}
              />
            )}
          </>
        )}

        {/* Curseur + clic echoue (scene 3) */}
        {frame >= cursorClickFrame1 - 10 && frame < scene4aStart && (
          <>
            <div
              style={{
                position: "absolute",
                left: interpolate(
                  frame,
                  [cursorClickFrame1 - 10, cursorClickFrame1],
                  [browserScreenX + 150, uiBtnX + 45],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                top: interpolate(
                  frame,
                  [cursorClickFrame1 - 10, cursorClickFrame1],
                  [browserScreenY + 80, uiBtnY + 18],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                opacity: fadeIn(frame, cursorClickFrame1 - 10, 5),
                pointerEvents: "none",
              }}
            >
              <CursorIcon />
            </div>

            <ClickFlash
              x={uiBtnX + 45}
              y={uiBtnY + 18}
              frame={frame}
              startAt={cursorClickFrame1}
              success={false}
            />
          </>
        )}

        {/* ══════════ SCENE 4a : JS Bundle Download ══════════ */}
        {frame >= scene4aStart && frame < scene5Start && (
          <>
            {/* Label Hydratation (grand, lumineux) */}
            <AnimatedLabel
              text="Hydratation"
              x={640}
              y={520}
              appearAt={scene4aStart}
              fontSize={24}
              fontWeight={700}
              color={C.categories.fundamentals}
            />

            {/* JS Bundle arrow */}
            <AnimatedArrow
              fromX={885}
              fromY={210}
              toX={480}
              toY={370}
              category="rendering"
              appearAt={scene4aStart + 10}
              drawDuration={25}
              label="JS Bundle"
              dashed
              labelColor={C.categories.rendering}
              labelFontSize={15}
            />

            {/* Progress bar */}
            {frame >= 445 && (
              <>
                <ProgressBar
                  x={browserScreenX}
                  y={browserScreenY + browserScreenH + 18}
                  width={browserScreenW}
                  height={10}
                  progress={jsBundleProgress}
                  opacity={fadeIn(frame, 445, 10)}
                />
                <AnimatedLabel
                  text={
                    jsBundleProgress >= 0.98
                      ? "Bundle pret"
                      : "Telechargement du bundle JavaScript..."
                  }
                  x={browserScreenX + browserScreenW / 2}
                  y={browserScreenY + browserScreenH + 46}
                  appearAt={445}
                  fontSize={14}
                  fontWeight={500}
                  color={
                    jsBundleProgress >= 0.98
                      ? C.categories.fundamentals
                      : C.mutedForeground
                  }
                />
              </>
            )}
          </>
        )}

        {/* ══════════ SCENE 4b : Hydratation Zoom ══════════ */}
        {frame >= scene4bStart && frame < scene5Start && (
          <>
            {/* Hydration pulses on each element */}
            <HydrationPulse
              x={uiBtnX}
              y={uiBtnY}
              width={90}
              height={36}
              frame={frame}
              activateAt={505}
              color={C.categories.fundamentals}
            />
            <HydrationPulse
              x={uiInputX}
              y={uiInputY}
              width={110}
              height={36}
              frame={frame}
              activateAt={515}
              color={C.categories.fundamentals}
            />
            <HydrationPulse
              x={uiLinkX}
              y={uiLinkY}
              width={70}
              height={36}
              frame={frame}
              activateAt={525}
              color={C.categories.fundamentals}
            />

            {/* Texte hydratation en cours */}
            {frame >= 505 && frame < 550 && (
              <AnimatedLabel
                text="React attache les event handlers un par un"
                x={640}
                y={555}
                appearAt={505}
                fontSize={14}
                fontWeight={500}
                color={C.mutedForeground}
              />
            )}

            {/* Texte succes */}
            {frame >= 555 && (
              <AnimatedLabel
                text="L'application est maintenant pleinement interactive"
                x={640}
                y={555}
                appearAt={555}
                fontSize={16}
                fontWeight={600}
                color={C.categories.fundamentals}
              />
            )}
          </>
        )}

        {/* Curseur + clic reussit (scene 4b) */}
        {frame >= cursorClickFrame2 - 15 && frame < scene5Start && (
          <>
            <div
              style={{
                position: "absolute",
                left: interpolate(
                  frame,
                  [cursorClickFrame2 - 15, cursorClickFrame2],
                  [browserScreenX + 200, uiBtnX + 45],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                top: interpolate(
                  frame,
                  [cursorClickFrame2 - 15, cursorClickFrame2],
                  [browserScreenY + 80, uiBtnY + 18],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
                opacity: fadeIn(frame, cursorClickFrame2 - 15, 5),
                pointerEvents: "none",
              }}
            >
              <CursorIcon />
            </div>

            <ClickFlash
              x={uiBtnX + 45}
              y={uiBtnY + 18}
              frame={frame}
              startAt={cursorClickFrame2}
              success
            />
          </>
        )}
      </div>

      {/* ══════════ SCENE 5 : Recapitulatif (hors zoom) ══════════ */}
      {frame >= scene5Start && (
        <>
          {/* Recap subtitle */}
          <AnimatedLabel
            text="Recapitulatif"
            x={640}
            y={90}
            appearAt={scene5Start + 20}
            fontSize={20}
            fontWeight={600}
            color={C.mutedForeground}
          />

          {/* 5 Timeline steps */}
          <TimelineStep
            label="HTML recu"
            x={150}
            y={280}
            active={false}
            opacity={fadeIn(frame, scene5Start + 25, 15)}
          />
          <TimelineStep
            label="Contenu visible"
            x={340}
            y={280}
            active
            opacity={fadeIn(frame, scene5Start + 30, 15)}
          />
          <TimelineStep
            label="JS Bundle"
            x={530}
            y={280}
            active={false}
            opacity={fadeIn(frame, scene5Start + 35, 15)}
          />
          <TimelineStep
            label="Hydratation"
            x={720}
            y={280}
            active
            opacity={fadeIn(frame, scene5Start + 40, 15)}
          />
          <TimelineStep
            label="Interactif"
            x={910}
            y={280}
            active
            opacity={fadeIn(frame, scene5Start + 45, 15)}
          />

          {/* Fleches entre les steps */}
          {frame >= scene5Start + 35 && (
            <svg
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
            >
              {[
                [230, 340 - 75],
                [420, 530 - 55],
                [600, 720 - 65],
                [800, 910 - 55],
              ].map(([x1, x2], i) => {
                const arrowOpacity = fadeIn(
                  frame,
                  scene5Start + 38 + i * 5,
                  10
                );
                return (
                  <g key={i} opacity={arrowOpacity}>
                    <line
                      x1={x1}
                      y1={280}
                      x2={x2}
                      y2={280}
                      stroke={C.border}
                      strokeWidth={2}
                    />
                    <polygon
                      points={`${x2},${280} ${x2 - 6},${274} ${x2 - 6},${286}`}
                      fill={C.border}
                    />
                  </g>
                );
              })}
            </svg>
          )}

          {/* Banner conclusion */}
          {frame >= scene5Start + 80 && (
            <div
              style={{
                position: "absolute",
                bottom: 120,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                opacity: fadeIn(frame, scene5Start + 80, 20),
              }}
            >
              <div
                style={{
                  padding: "16px 36px",
                  borderRadius: 10,
                  backgroundColor: "rgba(80, 160, 255, 0.08)",
                  border: "1.5px solid rgba(80, 160, 255, 0.25)",
                  fontFamily: FONTS.sans,
                  fontSize: 17,
                  fontWeight: 600,
                  color: C.categories.rendering,
                  textAlign: "center",
                  lineHeight: 1.5,
                }}
              >
                SSR = contenu visible rapidement.
                <br />
                Hydratation = React reprend le controle du DOM.
              </div>
            </div>
          )}
        </>
      )}
    </AbsoluteFill>
  );
};
