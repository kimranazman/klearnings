"use client";

import { useState } from "react";
import { GripVertical, Check, X } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import type { DraggableBlock } from "@/lib/code-exercises";

interface DraggableCodeBlockProps {
  block: DraggableBlock;
  index: number;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  isDragging: boolean;
  isDropTarget: boolean;
  showResult?: boolean;
  isCorrect?: boolean;
  correctPosition?: number;
}

export function DraggableCodeBlock({
  block,
  index,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging,
  isDropTarget,
  showResult,
  isCorrect,
  correctPosition,
}: DraggableCodeBlockProps) {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const getBorderColor = () => {
    if (showResult) {
      return isCorrect
        ? "border-green-500 dark:border-green-600"
        : "border-red-500 dark:border-red-600";
    }
    if (isDropTarget) {
      return "border-purple-500 dark:border-purple-400 border-dashed";
    }
    if (isDragging) {
      return "border-purple-400 dark:border-purple-500";
    }
    return "border-[var(--border)]";
  };

  const getBackgroundColor = () => {
    if (showResult) {
      return isCorrect
        ? "bg-green-50 dark:bg-green-950/30"
        : "bg-red-50 dark:bg-red-950/30";
    }
    return "bg-[var(--card)]";
  };

  return (
    <div
      draggable={!showResult}
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative rounded-lg border-2 overflow-hidden transition-all duration-200
        ${getBorderColor()}
        ${getBackgroundColor()}
        ${isDragging ? "opacity-50 scale-95" : "opacity-100 scale-100"}
        ${!showResult ? "cursor-grab active:cursor-grabbing" : ""}
        ${isDropTarget ? "transform scale-[1.02]" : ""}
      `}
    >
      {/* Header with drag handle and label */}
      <div className={`
        flex items-center gap-2 px-3 py-2 border-b
        ${showResult
          ? isCorrect
            ? "bg-green-100 dark:bg-green-900/50 border-green-200 dark:border-green-800"
            : "bg-red-100 dark:bg-red-900/50 border-red-200 dark:border-red-800"
          : "bg-[var(--secondary)] border-[var(--border)]"
        }
      `}>
        {!showResult && (
          <GripVertical
            size={16}
            className={`flex-shrink-0 transition-colors ${
              isHovered ? "text-purple-500" : "text-[var(--muted)]"
            }`}
          />
        )}

        {showResult && (
          isCorrect ? (
            <Check size={16} className="text-green-600 flex-shrink-0" />
          ) : (
            <X size={16} className="text-red-600 flex-shrink-0" />
          )
        )}

        <span className="text-sm font-medium flex-1">
          Step {index + 1}
          {block.label && (
            <span className="text-[var(--muted)] font-normal ml-2">
              - {block.label}
            </span>
          )}
        </span>

        {showResult && !isCorrect && correctPosition !== undefined && (
          <span className="text-xs text-red-600 dark:text-red-400">
            Should be step {correctPosition + 1}
          </span>
        )}
      </div>

      {/* Code content */}
      <SyntaxHighlighter
        language="python"
        style={theme === "dark" ? vscDarkPlus : vs}
        showLineNumbers={false}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          padding: "0.75rem 1rem",
          fontSize: "0.8rem",
          background: "transparent",
        }}
      >
        {block.code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
