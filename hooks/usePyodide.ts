"use client";

import { useState, useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    loadPyodide: (config: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  loadPackage: (packages: string[]) => Promise<void>;
}

export type LoadingStage = "idle" | "downloading" | "initializing" | "packages" | "sklearn" | "ready" | "error";

export const LOADING_MESSAGES: Record<LoadingStage, string> = {
  idle: "",
  downloading: "Downloading Python runtime...",
  initializing: "Initializing Python environment...",
  packages: "Loading NumPy...",
  sklearn: "Installing scikit-learn...",
  ready: "Python environment ready! Click 'Run' to execute code.",
  error: "Failed to load Python environment. Please refresh the page.",
};

export const LOADING_PROGRESS: Record<LoadingStage, number> = {
  idle: 0,
  downloading: 15,
  initializing: 35,
  packages: 60,
  sklearn: 85,
  ready: 100,
  error: 0,
};

interface UsePyodideReturn {
  isPyodideReady: boolean;
  loadingStage: LoadingStage;
  isLoading: boolean;
  output: string;
  runCode: (code: string) => Promise<string>;
  clearOutput: () => void;
}

export function usePyodide(): UsePyodideReturn {
  const [loadingStage, setLoadingStage] = useState<LoadingStage>("idle");
  const [isPyodideReady, setIsPyodideReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<string>("");
  const pyodideRef = useRef<PyodideInterface | null>(null);

  // Load Pyodide on mount
  useEffect(() => {
    const loadPyodide = async () => {
      if (pyodideRef.current) return;

      setLoadingStage("downloading");

      // Load Pyodide script
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
      script.async = true;

      script.onload = async () => {
        try {
          setLoadingStage("initializing");
          pyodideRef.current = await window.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
          });

          // Load commonly used packages
          setLoadingStage("packages");
          await pyodideRef.current.loadPackage(["numpy", "micropip"]);

          // Install scikit-learn via micropip
          setLoadingStage("sklearn");
          await pyodideRef.current.runPythonAsync(`
import micropip
await micropip.install('scikit-learn')
          `);

          setLoadingStage("ready");
          setIsPyodideReady(true);
          setOutput(LOADING_MESSAGES.ready);
        } catch (error) {
          console.error("Failed to load Pyodide:", error);
          setLoadingStage("error");
          setOutput(LOADING_MESSAGES.error);
        }
      };

      script.onerror = () => {
        setLoadingStage("error");
        setOutput(LOADING_MESSAGES.error);
      };

      document.body.appendChild(script);
    };

    loadPyodide();
  }, []);

  const runCode = useCallback(async (code: string): Promise<string> => {
    if (!pyodideRef.current || !isPyodideReady) {
      const message = "Python environment is still loading...";
      setOutput(message);
      return message;
    }

    setIsLoading(true);
    setOutput("");

    try {
      // Capture stdout
      await pyodideRef.current.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = StringIO()
      `);

      // Run user code
      const result = await pyodideRef.current.runPythonAsync(code);

      // Get stdout content
      const stdout = await pyodideRef.current.runPythonAsync(`
output = sys.stdout.getvalue()
sys.stdout = sys.__stdout__
output
      `);

      let outputText = String(stdout || "");
      if (result !== undefined && result !== null) {
        outputText += (outputText ? "\n" : "") + String(result);
      }

      const finalOutput = outputText || "Code executed successfully (no output)";
      setOutput(finalOutput);
      return finalOutput;
    } catch (error) {
      const errorOutput = `Error: ${error instanceof Error ? error.message : String(error)}`;
      setOutput(errorOutput);
      return errorOutput;
    } finally {
      setIsLoading(false);
    }
  }, [isPyodideReady]);

  const clearOutput = useCallback(() => {
    setOutput("");
  }, []);

  return {
    isPyodideReady,
    loadingStage,
    isLoading,
    output,
    runCode,
    clearOutput,
  };
}
