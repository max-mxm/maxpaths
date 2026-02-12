import { interpolate, spring, type SpringConfig } from "remotion";

export const SPRING_CONFIGS = {
  snappy: { damping: 12, stiffness: 100 } satisfies SpringConfig,
  gentle: { damping: 15, stiffness: 80 } satisfies SpringConfig,
  bouncy: { damping: 8, stiffness: 120 } satisfies SpringConfig,
} as const;

/**
 * Fade in from 0 to 1 over a given number of frames.
 */
export function fadeIn(
  frame: number,
  startAt: number,
  duration = 20
): number {
  return interpolate(frame, [startAt, startAt + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/**
 * Slide up with spring + fade in.
 * Returns { opacity, translateY }.
 */
export function slideUp(
  frame: number,
  fps: number,
  startAt: number,
  config: SpringConfig = SPRING_CONFIGS.gentle
) {
  const opacity = fadeIn(frame, startAt);
  const springValue = spring({
    frame: frame - startAt,
    fps,
    config,
  });
  const translateY = interpolate(springValue, [0, 1], [15, 0]);
  return { opacity, translateY };
}

/**
 * Scale in from 0.5 to 1 with spring + fade in.
 * Returns { opacity, scale }.
 */
export function scaleIn(
  frame: number,
  fps: number,
  startAt: number,
  config: SpringConfig = SPRING_CONFIGS.snappy
) {
  const opacity = fadeIn(frame, startAt, 15);
  const springValue = spring({
    frame: frame - startAt,
    fps,
    config,
  });
  const scale = interpolate(springValue, [0, 1], [0.5, 1]);
  return { opacity, scale };
}

/**
 * Draw progress from 0 to 1 over a given number of frames.
 */
export function drawProgress(
  frame: number,
  startAt: number,
  duration = 30
): number {
  return interpolate(frame, [startAt, startAt + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/**
 * Zoom to a focal point with spring animation.
 * Zooms in from startAt, holds, then zooms out from endAt.
 * Returns { scale, translateX, translateY }.
 */
export function zoomTo(
  frame: number,
  fps: number,
  startAt: number,
  endAt: number,
  targetScale: number,
  focalX: number,
  focalY: number,
  config: SpringConfig = SPRING_CONFIGS.gentle
): { scale: number; translateX: number; translateY: number } {
  const zoomInSpring = spring({
    frame: Math.max(0, frame - startAt),
    fps,
    config,
  });
  const zoomOutSpring =
    frame >= endAt
      ? spring({ frame: frame - endAt, fps, config })
      : 0;

  let scale: number;
  if (frame < startAt) {
    scale = 1;
  } else if (frame < endAt) {
    scale = interpolate(zoomInSpring, [0, 1], [1, targetScale]);
  } else {
    scale = interpolate(zoomOutSpring, [0, 1], [targetScale, 1]);
  }

  const viewportCenterX = 640;
  const viewportCenterY = 360;
  const maxTranslateX = (viewportCenterX - focalX) * (targetScale - 1);
  const maxTranslateY = (viewportCenterY - focalY) * (targetScale - 1);
  const t = targetScale > 1 ? (scale - 1) / (targetScale - 1) : 0;
  const translateX = maxTranslateX * t;
  const translateY = maxTranslateY * t;

  return { scale, translateX, translateY };
}

/**
 * Expanding pulse ring animation.
 * Returns { radius, opacity } for a single pulse at a given frame offset.
 */
export function pulseRing(
  frame: number,
  startAt: number,
  duration = 20
): { radius: number; opacity: number } {
  const elapsed = frame - startAt;
  if (elapsed < 0 || elapsed > duration) {
    return { radius: 0, opacity: 0 };
  }
  const progress = elapsed / duration;
  const radius = interpolate(progress, [0, 1], [0, 30]);
  const opacity = interpolate(progress, [0, 0.3, 1], [0.7, 0.5, 0]);
  return { radius, opacity };
}
