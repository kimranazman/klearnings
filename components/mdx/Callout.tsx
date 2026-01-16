"use client";

import { Info, AlertTriangle, CheckCircle, Lightbulb, Building2 } from "lucide-react";
import { ReactNode } from "react";

type CalloutType = "info" | "warning" | "success" | "tip" | "business";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const icons = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  tip: Lightbulb,
  business: Building2,
};

const styles = {
  info: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100",
  warning: "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100",
  success: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100",
  tip: "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-100",
  business: "bg-cyan-50 dark:bg-cyan-950 border-cyan-200 dark:border-cyan-800 text-cyan-900 dark:text-cyan-100",
};

const iconStyles = {
  info: "text-blue-500",
  warning: "text-amber-500",
  success: "text-green-500",
  tip: "text-purple-500",
  business: "text-cyan-500",
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const Icon = icons[type];

  return (
    <div className={`my-6 rounded-lg border-l-4 p-4 ${styles[type]}`}>
      <div className="flex items-start gap-3">
        <Icon className={`flex-shrink-0 mt-0.5 ${iconStyles[type]}`} size={20} />
        <div className="flex-1 min-w-0">
          {title && (
            <div className="font-semibold mb-1">{title}</div>
          )}
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
