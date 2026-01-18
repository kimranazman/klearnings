// Types for Interactive Code Learning Feature

export interface CodeStep {
  id: string;
  title: string;
  code: string;
  explanation: string;
  highlight?: string[]; // Line numbers or code snippets to highlight
}

export interface DraggableBlock {
  id: string;
  code: string;
  label?: string; // Short description for the block
}

export interface DragDropExercise {
  blocks: DraggableBlock[];
  correctOrder: string[]; // Array of block IDs in correct order
  hints?: string[];
}

export interface CodeExercise {
  id: string;
  title: string;
  description: string;
  steps: CodeStep[];
  dragDropExercise: DragDropExercise;
  runnableCode: string; // Complete code for Pyodide execution
  wrongCode?: string; // Optional: wrong code to show comparison
  wrongExplanation?: string;
  rightExplanation?: string;
}

// Modal state machine types
export type ModalState = "explanation" | "exercise" | "result" | "playground";

export interface ExerciseResult {
  isCorrect: boolean;
  userOrder: string[];
  correctOrder: string[];
  feedback: string;
}

// Exercise data structure for each module
export interface ModuleExercises {
  moduleId: string;
  exercises: CodeExercise[];
}
