// src/components/FadeIn.tsx
"use client";

import { useObserverAnimation } from "@/hooks/useObserverAnimation";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  selector: string;
  animations?: any;
  duration?: number;
  staggerDelay?: number;
  threshold?: number;
  className?: string;
}

/**
 * COMPONENTE DE FRONTERA (Client Boundary)
 * Este componente aísla la necesidad de JavaScript en el cliente.
 * El 'children' que recibe puede ser un Server Component puro, 
 * evitando enviar JS innecesario para renderizar texto o estructura.
 */
export default function FadeIn({
  children,
  selector,
  animations,
  duration = 800,
  staggerDelay = 200,
  threshold = 0.15,
  className = "",
}: FadeInProps) {
  const sectionRef = useObserverAnimation({
    selector,
    animations,
    duration,
    staggerDelay,
    threshold,
  });

  return (
    <div ref={sectionRef as any} className={className}>
      {children}
    </div>
  );
}