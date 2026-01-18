"use client";

import { useState, useCallback, useMemo } from "react";
import { Check, X, RotateCcw, Lightbulb, ArrowRight } from "lucide-react";
import { DraggableCodeBlock } from "./DraggableCodeBlock";
import type { DragDropExercise, ExerciseResult } from "@/lib/code-exercises";

interface CodeExerciseProps {
  exercise: DragDropExercise;
  onComplete: (result: ExerciseResult) => void;
  onReset?: () => void;
}

export function CodeExercise({ exercise, onComplete, onReset }: CodeExerciseProps) {
  // Shuffle blocks initially
  const shuffledBlocks = useMemo(() => {
    const blocks = [...exercise.blocks];
    // Fisher-Yates shuffle
    for (let i = blocks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
    }
    return blocks;
  }, [exercise.blocks]);

  const [orderedBlocks, setOrderedBlocks] = useState(shuffledBlocks);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<ExerciseResult | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  const handleDragStart = useCallback((e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDragEnter = useCallback((index: number) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      setDropTargetIndex(index);
    }
  }, [draggedIndex]);

  const handleDragLeave = useCallback(() => {
    setDropTargetIndex(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDropTargetIndex(null);
      return;
    }

    // Reorder blocks
    const newBlocks = [...orderedBlocks];
    const [draggedBlock] = newBlocks.splice(draggedIndex, 1);
    newBlocks.splice(dropIndex, 0, draggedBlock);

    setOrderedBlocks(newBlocks);
    setDraggedIndex(null);
    setDropTargetIndex(null);
  }, [draggedIndex, orderedBlocks]);

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
    setDropTargetIndex(null);
  }, []);

  const handleSubmit = useCallback(() => {
    const userOrder = orderedBlocks.map((b) => b.id);
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(exercise.correctOrder);

    const exerciseResult: ExerciseResult = {
      isCorrect,
      userOrder,
      correctOrder: exercise.correctOrder,
      feedback: isCorrect
        ? "Excellent! You've correctly ordered all the steps."
        : "Not quite right. Review the correct order below.",
    };

    setResult(exerciseResult);
    setSubmitted(true);
    onComplete(exerciseResult);
  }, [orderedBlocks, exercise.correctOrder, onComplete]);

  const handleReset = useCallback(() => {
    // Re-shuffle blocks
    const blocks = [...exercise.blocks];
    for (let i = blocks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
    }
    setOrderedBlocks(blocks);
    setSubmitted(false);
    setResult(null);
    setShowHint(false);
    setCurrentHintIndex(0);
    onReset?.();
  }, [exercise.blocks, onReset]);

  const handleNextHint = useCallback(() => {
    if (exercise.hints && currentHintIndex < exercise.hints.length - 1) {
      setCurrentHintIndex((prev) => prev + 1);
    }
  }, [currentHintIndex, exercise.hints]);

  const getCorrectPosition = useCallback((blockId: string): number => {
    return exercise.correctOrder.indexOf(blockId);
  }, [exercise.correctOrder]);

  const isBlockCorrect = useCallback((blockId: string, currentIndex: number): boolean => {
    return exercise.correctOrder[currentIndex] === blockId;
  }, [exercise.correctOrder]);

  return (
    <div className="space-y-4">
      {/* Instructions */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--muted)]">
          Drag and drop the code blocks to arrange them in the correct order.
        </p>
        {!submitted && exercise.hints && exercise.hints.length > 0 && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
          >
            <Lightbulb size={14} />
            {showHint ? "Hide Hint" : "Show Hint"}
          </button>
        )}
      </div>

      {/* Hint section */}
      {showHint && exercise.hints && (
        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-2">
            <Lightbulb size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                {exercise.hints[currentHintIndex]}
              </p>
              {exercise.hints.length > 1 && currentHintIndex < exercise.hints.length - 1 && (
                <button
                  onClick={handleNextHint}
                  className="mt-2 text-xs text-amber-600 dark:text-amber-400 hover:underline"
                >
                  Need another hint? ({currentHintIndex + 1}/{exercise.hints.length})
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Draggable blocks */}
      <div
        className="space-y-3"
        onDragLeave={handleDragLeave}
        onDragEnd={handleDragEnd}
      >
        {orderedBlocks.map((block, index) => (
          <div
            key={block.id}
            onDragEnter={() => handleDragEnter(index)}
          >
            <DraggableCodeBlock
              block={block}
              index={index}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              isDragging={draggedIndex === index}
              isDropTarget={dropTargetIndex === index}
              showResult={submitted}
              isCorrect={submitted ? isBlockCorrect(block.id, index) : undefined}
              correctPosition={submitted && !isBlockCorrect(block.id, index) ? getCorrectPosition(block.id) : undefined}
            />
          </div>
        ))}
      </div>

      {/* Result feedback */}
      {submitted && result && (
        <div className={`p-4 rounded-lg flex items-start gap-3 ${
          result.isCorrect
            ? "bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700"
            : "bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700"
        }`}>
          {result.isCorrect ? (
            <Check className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
          ) : (
            <X className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          )}
          <div className="flex-1">
            <p className={`font-medium ${
              result.isCorrect
                ? "text-green-800 dark:text-green-200"
                : "text-red-800 dark:text-red-200"
            }`}>
              {result.feedback}
            </p>
            {!result.isCorrect && (
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                Check the step numbers above to see where each block should be.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-3 pt-2">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
          >
            Check Order
            <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--secondary)] transition-colors"
          >
            <RotateCcw size={16} />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
