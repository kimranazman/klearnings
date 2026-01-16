"use client";

import { useEffect, useRef, useState } from "react";
import "katex/dist/katex.min.css";

interface FormulaProps {
  children: string;
  block?: boolean;
}

export function Formula({ children, block = false }: FormulaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadKatex = async () => {
      if (typeof window !== "undefined" && containerRef.current) {
        const katex = await import("katex");

        try {
          katex.default.render(children, containerRef.current, {
            displayMode: block,
            throwOnError: false,
          });
          setLoaded(true);
        } catch (error) {
          console.error("KaTeX error:", error);
          containerRef.current.textContent = children;
        }
      }
    };

    loadKatex();
  }, [children, block]);

  if (block) {
    return (
      <div className="my-4 overflow-x-auto">
        <div
          ref={containerRef}
          className={`text-center py-4 ${!loaded ? "opacity-50" : ""}`}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <span
      ref={containerRef}
      className={!loaded ? "opacity-50" : ""}
    >
      {children}
    </span>
  );
}
