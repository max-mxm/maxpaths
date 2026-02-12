import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS, FONTS, type CategoryType } from "../lib/design-tokens";
import { drawProgress } from "../lib/animations";

interface AnimatedArrowProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  category?: CategoryType;
  appearAt?: number;
  drawDuration?: number;
  label?: string;
  dashed?: boolean;
  labelColor?: string;
  labelFontSize?: number;
}

export const AnimatedArrow: React.FC<AnimatedArrowProps> = ({
  fromX,
  fromY,
  toX,
  toY,
  category = "fundamentals",
  appearAt = 0,
  drawDuration = 30,
  label,
  dashed = false,
  labelColor,
  labelFontSize,
}) => {
  const frame = useCurrentFrame();
  const color = COLORS.categories[category];
  const progress = drawProgress(frame, appearAt, drawDuration);

  if (progress <= 0) return null;

  const dx = toX - fromX;
  const dy = toY - fromY;
  const angle = Math.atan2(dy, dx);
  const arrowSize = 8;

  const currentX = fromX + dx * progress;
  const currentY = fromY + dy * progress;

  const arrowP1x = currentX - arrowSize * Math.cos(angle - Math.PI / 6);
  const arrowP1y = currentY - arrowSize * Math.sin(angle - Math.PI / 6);
  const arrowP2x = currentX - arrowSize * Math.cos(angle + Math.PI / 6);
  const arrowP2y = currentY - arrowSize * Math.sin(angle + Math.PI / 6);

  const labelOpacity = progress > 0.5 ? (progress - 0.5) * 2 : 0;

  return (
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
      <line
        x1={fromX}
        y1={fromY}
        x2={currentX}
        y2={currentY}
        stroke={color}
        strokeWidth={2}
        strokeDasharray={dashed ? "8,4" : "none"}
      />
      {progress > 0.9 && (
        <polygon
          points={`${currentX},${currentY} ${arrowP1x},${arrowP1y} ${arrowP2x},${arrowP2y}`}
          fill={color}
          opacity={(progress - 0.9) * 10}
        />
      )}
      {label && labelOpacity > 0 && (
        <text
          x={(fromX + toX) / 2}
          y={(fromY + toY) / 2 - 10}
          textAnchor="middle"
          fill={labelColor ?? COLORS.mutedForeground}
          fontSize={labelFontSize ?? 13}
          fontFamily={FONTS.sans}
          opacity={labelOpacity}
        >
          {label}
        </text>
      )}
    </svg>
  );
};
