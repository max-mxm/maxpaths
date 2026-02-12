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
import { COLORS, FONTS } from "../../lib/design-tokens";
import { fadeIn } from "../../lib/animations";

/**
 * Schema anime : Flux de re-render Parent -> Child
 *
 * Timeline (300 frames / 10 secondes a 30fps) :
 * 0-30    : Titre apparait
 * 15-45   : Parent box apparait
 * 35-65   : Child A et Child B apparaissent
 * 50-80   : Fleches props se dessinent
 * 90-120  : setState highlight sur Parent + label "setState()"
 * 120-150 : Re-render cascade - toutes les boxes pulsent en rouge
 * 160-190 : Label "Avec React.memo()" apparait
 * 190-220 : Child B obtient un bouclier (bordure verte, icone memo)
 * 220-260 : Nouveau setState - Parent re-rend, Child A re-rend, Child B est protege
 * 260-300 : Texte conclusion
 */
export const MemoReRenderFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 : Etat initial
  const phase2Start = 90;
  const phase3Start = 160;
  const phase4Start = 220;
  const conclusionStart = 260;

  // Phase 2 : re-render cascade (frames 90-150)
  const isReRendering =
    frame >= phase2Start && frame < phase3Start;
  const reRenderPulse = isReRendering
    ? Math.sin((frame - phase2Start) * 0.3) * 0.5 + 0.5
    : 0;

  // Phase 3 : memo shield on Child B (frames 160-220)
  const hasMemoShield = frame >= phase3Start;
  const shieldOpacity = fadeIn(frame, phase3Start, 30);

  // Phase 4 : second re-render (frames 220-260)
  const isSecondReRender =
    frame >= phase4Start && frame < conclusionStart;
  const secondPulse = isSecondReRender
    ? Math.sin((frame - phase4Start) * 0.3) * 0.5 + 0.5
    : 0;

  // Child B protected in phase 4
  const childBProtected = frame >= phase4Start;

  return (
    <AbsoluteFill>
      <DiagramBackground gradient="fundamentals" />

      {/* Title */}
      <AnimatedLabel
        text="Re-render : Parent vers Children"
        x={640}
        y={45}
        appearAt={0}
        fontSize={26}
        fontWeight={700}
      />

      {/* Parent Box */}
      <AnimatedBox
        label="Parent"
        subtitle="state: { count }"
        x={640}
        y={180}
        width={240}
        height={90}
        category="fundamentals"
        appearAt={15}
        highlightAt={phase2Start}
        style={
          isReRendering || isSecondReRender
            ? {
                boxShadow: `0 0 ${20 + (isReRendering ? reRenderPulse : secondPulse) * 20}px ${COLORS.categories.fundamentals}60`,
              }
            : undefined
        }
      />

      {/* Child A */}
      <AnimatedBox
        label="Child A"
        subtitle="props: { count }"
        x={440}
        y={400}
        width={200}
        height={80}
        category="rendering"
        appearAt={35}
        style={
          isReRendering || isSecondReRender
            ? {
                boxShadow: `0 0 ${20 + (isReRendering ? reRenderPulse : secondPulse) * 20}px ${COLORS.categories.rendering}60`,
              }
            : undefined
        }
      />

      {/* Child B */}
      <AnimatedBox
        label={hasMemoShield ? "memo(Child B)" : "Child B"}
        subtitle="props: { label }"
        x={840}
        y={400}
        width={200}
        height={80}
        category={hasMemoShield ? "best-practices" : "rendering"}
        appearAt={35}
        style={{
          ...(isReRendering
            ? {
                boxShadow: `0 0 ${20 + reRenderPulse * 20}px ${COLORS.categories.rendering}60`,
              }
            : {}),
          ...(childBProtected
            ? {
                borderColor: "rgb(34, 197, 94)",
                boxShadow: "0 0 15px rgba(34, 197, 94, 0.3)",
              }
            : {}),
        }}
      />

      {/* Arrows: Parent -> Child A */}
      <AnimatedArrow
        fromX={560}
        fromY={225}
        toX={440}
        toY={360}
        category="fundamentals"
        appearAt={50}
        label="props"
      />

      {/* Arrows: Parent -> Child B */}
      <AnimatedArrow
        fromX={720}
        fromY={225}
        toX={840}
        toY={360}
        category="fundamentals"
        appearAt={55}
        label="props"
      />

      {/* Phase 2: setState label */}
      {frame >= phase2Start && (
        <AnimatedLabel
          text="setState() !"
          x={870}
          y={170}
          appearAt={phase2Start}
          fontSize={18}
          fontWeight={700}
          color={COLORS.categories.advanced}
        />
      )}

      {/* Phase 2: "All children re-render" - hidden once phase 3 starts */}
      {frame >= phase2Start + 20 && frame < phase3Start && (
        <AnimatedLabel
          text="Tous les enfants se re-rendent"
          x={640}
          y={530}
          appearAt={phase2Start + 20}
          fontSize={16}
          fontWeight={600}
          color={COLORS.categories.advanced}
        />
      )}

      {/* Phase 3: memo label */}
      {frame >= phase3Start && (
        <AnimatedLabel
          text="Avec React.memo()"
          x={640}
          y={530}
          appearAt={phase3Start}
          fontSize={20}
          fontWeight={700}
          color={COLORS.categories["best-practices"]}
        />
      )}

      {/* Memo shield icon on Child B */}
      {hasMemoShield && (
        <div
          style={{
            position: "absolute",
            left: 840 - 15,
            top: 400 - 55,
            opacity: shieldOpacity,
            fontSize: 22,
            fontFamily: FONTS.sans,
          }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgb(34, 197, 94)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
      )}

      {/* Phase 4: second setState */}
      {frame >= phase4Start && (
        <AnimatedLabel
          text="setState() !"
          x={870}
          y={170}
          appearAt={phase4Start}
          fontSize={18}
          fontWeight={700}
          color={COLORS.categories.advanced}
        />
      )}

      {/* Phase 4: explanation */}
      {frame >= phase4Start + 15 && (
        <AnimatedLabel
          text="Child B ne re-rend pas (props inchangees)"
          x={640}
          y={570}
          appearAt={phase4Start + 15}
          fontSize={16}
          fontWeight={600}
          color="rgb(34, 197, 94)"
        />
      )}

      {/* Blocked arrow indicator for phase 4 */}
      {childBProtected && (
        <div
          style={{
            position: "absolute",
            left: 750,
            top: 290,
            opacity: fadeIn(frame, phase4Start + 5, 15),
            fontFamily: FONTS.sans,
            fontSize: 28,
            color: "rgb(34, 197, 94)",
            fontWeight: 700,
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgb(34, 197, 94)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m15 9-6 6" />
            <path d="m9 9 6 6" />
          </svg>
        </div>
      )}

      {/* Conclusion */}
      {frame >= conclusionStart && (
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: fadeIn(frame, conclusionStart, 20),
          }}
        >
          <div
            style={{
              padding: "12px 28px",
              borderRadius: 10,
              backgroundColor: `${COLORS.primary}15`,
              border: `1.5px solid ${COLORS.primary}40`,
              fontFamily: FONTS.sans,
              fontSize: 15,
              fontWeight: 600,
              color: COLORS.primary,
            }}
          >
            React.memo() empeche les re-renders inutiles quand les props
            ne changent pas
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
