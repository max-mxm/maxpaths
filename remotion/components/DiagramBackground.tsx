import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, type GradientType } from "../lib/design-tokens";

interface DiagramBackgroundProps {
  gradient?: GradientType;
  bgColor?: string;
  gridColor?: string;
}

export const DiagramBackground: React.FC<DiagramBackgroundProps> = ({
  gradient = "fundamentals",
  bgColor,
  gridColor,
}) => {
  const [from, to] = COLORS.gradients[gradient];
  const bg = bgColor ?? COLORS.background;
  const grid = gridColor ?? `${COLORS.border}30`;

  return (
    <AbsoluteFill style={{ background: bg }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse at 30% 20%, ${from}15, transparent 60%),
            radial-gradient(ellipse at 70% 80%, ${to}10, transparent 60%)
          `,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(${grid} 1px, transparent 1px),
            linear-gradient(90deg, ${grid} 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          opacity: 0.5,
        }}
      />
    </AbsoluteFill>
  );
};
