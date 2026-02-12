import React from "react";
import { AbsoluteFill } from "remotion";
import { AnimatedBox } from "./AnimatedBox";
import { AnimatedArrow } from "./AnimatedArrow";
import { AnimatedLabel } from "./AnimatedLabel";
import { DiagramBackground } from "./DiagramBackground";
import type { GradientType, CategoryType } from "../lib/design-tokens";
import { COLORS } from "../lib/design-tokens";
import type { DiagramNode, DiagramConnection } from "../lib/types";

interface FlowDiagramProps {
  nodes: DiagramNode[];
  connections: DiagramConnection[];
  category?: CategoryType;
  gradient?: GradientType;
  title?: string;
  titleAppearAt?: number;
}

export const FlowDiagram: React.FC<FlowDiagramProps> = ({
  nodes,
  connections,
  category = "fundamentals",
  gradient,
  title,
  titleAppearAt = 0,
}) => {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const resolvedGradient =
    gradient ?? (category in COLORS.gradients
      ? (category as GradientType)
      : "fundamentals");

  return (
    <AbsoluteFill>
      <DiagramBackground gradient={resolvedGradient} />

      {title && (
        <AnimatedLabel
          text={title}
          x={640}
          y={40}
          appearAt={titleAppearAt}
          fontSize={24}
          fontWeight={700}
          color={COLORS.foreground}
        />
      )}

      {connections.map((conn, i) => {
        const fromNode = nodeMap.get(conn.from);
        const toNode = nodeMap.get(conn.to);
        if (!fromNode || !toNode) return null;
        return (
          <AnimatedArrow
            key={`conn-${i}`}
            fromX={fromNode.x}
            fromY={fromNode.y}
            toX={toNode.x}
            toY={toNode.y}
            category={category}
            appearAt={conn.appearAt}
            label={conn.label}
            dashed={conn.dashed}
          />
        );
      })}

      {nodes.map((node) => (
        <AnimatedBox
          key={node.id}
          label={node.label}
          x={node.x}
          y={node.y}
          width={node.width}
          height={node.height}
          category={node.category ?? category}
          appearAt={node.appearAt}
          highlightAt={node.highlightAt}
          subtitle={node.subtitle}
        />
      ))}
    </AbsoluteFill>
  );
};
