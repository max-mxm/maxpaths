import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../lib/design-tokens";
import { slideUp } from "../lib/animations";

interface AnimatedLabelProps {
  text: string;
  x: number;
  y: number;
  appearAt?: number;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  fontFamily?: string;
}

export const AnimatedLabel: React.FC<AnimatedLabelProps> = ({
  text,
  x,
  y,
  appearAt = 0,
  fontSize = 14,
  fontWeight = 500,
  color = COLORS.foreground,
  fontFamily = FONTS.sans,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { opacity, translateY } = slideUp(frame, fps, appearAt);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) translateY(${translateY}px)`,
        opacity,
        fontFamily,
        fontSize,
        fontWeight,
        color,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
};
