"use client";

import { ReactNode } from "react";

interface DiagramProps {
  title?: string;
  children: ReactNode;
}

export function Diagram({ title, children }: DiagramProps) {
  return (
    <div className="my-6">
      {title && (
        <div className="text-sm font-semibold text-[var(--muted)] mb-2">
          {title}
        </div>
      )}
      <div className="ascii-diagram overflow-x-auto">
        {children}
      </div>
    </div>
  );
}
