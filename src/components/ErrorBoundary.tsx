"use client";

import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary para componentes con animaciones pesadas
 * Previene que fallos en canvas/video/animaciones rompan toda la página
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Mostrar fallback personalizado o uno por defecto
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Fallback por defecto: invisible (no rompe el layout)
      return (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "transparent",
            pointerEvents: "none",
            zIndex: 0,
          }}
          aria-hidden="true"
        />
      );
    }

    return this.props.children;
  }
}
