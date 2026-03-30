// ─── Design System Tokens (from Stitch: "Precision in Darkness") ───────────

export const TOKENS = {
  color: {
    surface: "#131313",
    surfaceContainerLowest: "#0e0e0e",
    surfaceContainerLow: "#1c1b1b",
    surfaceContainer: "#201f1f",
    surfaceContainerHigh: "#2a2a2a",
    surfaceContainerHighest: "#353534",
    surfaceBright: "#393939",
    surfaceVariant: "#353534",
    onSurface: "#e5e2e1",
    onSurfaceVariant: "#cac4d4",
    primary: "#cebdff",
    primaryContainer: "#a78bfa",
    onPrimaryFixed: "#21005e",
    outline: "#948e9d",
    outlineVariant: "#494552",
  },
  font: {
    display: "'Space Grotesk', sans-serif",
    body: "'Inter', sans-serif",
    label: "'Space Grotesk', sans-serif",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "2.75rem",
    "3xl": "4rem",
  },
  radius: {
    sm: "0.25rem",
    md: "0.5rem",
  },
} as const;

// ─── Data Interfaces ─────────────────────────────────────────────────────────

export interface TechSkill {
  name: string;
  description: string;
  icon: string; // Material Symbol name or unicode
}

export interface CommitBar {
  /** Label shown below the bar (e.g. "MON", "TUE") */
  day: string;
  /** Normalized height 0–100 */
  value: number;
  highlight: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface CVImpactoMonocromoData {
  nav: NavItem[];
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  persona: {
    heading: string;
    body: string;
  };
  featuredSystem: {
    label: string;
    title: string;
    description: string;
  };
  techStack: TechSkill[];
  commitSection: {
    label: string;
    description: string;
    bars: CommitBar[];
  };
  footer: {
    links: Array<{ label: string; href: string }>;
  };
}

// ─── Hook Return Interface ────────────────────────────────────────────────────

export interface UseCVImpactoMonocromoReturn {
  data: CVImpactoMonocromoData;
  isNavScrolled: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

// ─── Component Props Interface ────────────────────────────────────────────────

export interface CVImpactoMonocromoProps {
  /** Override default data (useful for SSG/SSR injection) */
  initialData?: Partial<CVImpactoMonocromoData>;
}
