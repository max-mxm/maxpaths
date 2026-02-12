import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, type CategoryType } from "../lib/design-tokens";
import { scaleIn } from "../lib/animations";

interface AnimatedBoxProps {
  label: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  category?: CategoryType;
  appearAt?: number;
  highlightAt?: number;
  subtitle?: string;
  style?: React.CSSProperties;
  bgColor?: string;
  textColor?: string;
  subtitleColor?: string;
}

export const AnimatedBox: React.FC<AnimatedBoxProps> = ({
  label,
  x,
  y,
  width = 200,
  height = 80,
  category = "fundamentals",
  appearAt = 0,
  highlightAt,
  subtitle,
  style,
  bgColor,
  textColor,
  subtitleColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const color = COLORS.categories[category];
  const { opacity, scale } = scaleIn(frame, fps, appearAt);

  const isHighlighted =
    highlightAt !== undefined && frame >= highlightAt;
  const borderWidth = isHighlighted ? 3 : 1.5;

  return (
    <div
      style={{
        position: "absolute",
        left: x - width / 2,
        top: y - height / 2,
        width,
        height,
        opacity,
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        backgroundColor: bgColor ?? COLORS.card,
        border: `${borderWidth}px solid ${color}`,
        borderRadius: 12,
        boxShadow: isHighlighted
          ? `0 0 20px ${color}40`
          : "0 2px 8px rgba(0,0,0,0.08)",
        fontFamily: FONTS.sans,
        color: textColor ?? COLORS.foreground,
        ...style,
      }}
    >
      <span style={{ fontSize: 16, fontWeight: 600 }}>{label}</span>
      {subtitle && (
        <span
          style={{
            fontSize: 12,
            fontWeight: 400,
            color: subtitleColor ?? COLORS.mutedForeground,
          }}
        >
          {subtitle}
        </span>
      )}
    </div>
  );
};
