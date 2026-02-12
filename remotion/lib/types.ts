import type { CategoryType } from "./design-tokens";

export interface DiagramNode {
  id: string;
  label: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  appearAt?: number;
  highlightAt?: number;
  category?: CategoryType;
  subtitle?: string;
}

export interface DiagramConnection {
  from: string;
  to: string;
  label?: string;
  appearAt?: number;
  dashed?: boolean;
}
