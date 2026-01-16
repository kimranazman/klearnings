"use client";

import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Loader2, Terminal, Copy, Check, Download } from "lucide-react";

interface CodePlaygroundProps {
  initialCode: string;
  title?: string;
  description?: string;
}

declare global {
  interface Window {
    loadPyodide: (config: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  loadPackage: (packages: string[]) => Promise<void>;
}

type LoadingStage = "idle" | "downloading" | "initializing" | "packages" | "sklearn" | "ready" | "error";

const LOADING_MESSAGES: Record<LoadingStage, string> = {
  idle: "",
  downloading: "Downloading Python runtime...",
  initializing: "Initializing Python environment...",
  packages: "Loading NumPy...",
  sklearn: "Installing scikit-learn...",
  ready: "Python environment ready! Click 'Run' to execute code.",
  error: "Failed to load Python environment. Please refresh the page.",
};

const LOADING_PROGRESS: Record<LoadingStage, number> = {
  idle: 0,
  downloading: 15,
  initializing: 35,
  packages: 60,
  sklearn: 85,
  ready: 100,
  error: 0,
};

export function CodePlayground({
  initialCode,
  title = "Python Playground",
  description,
}: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode.trim());
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState<LoadingStage>("idle");
  const [isPyodideReady, setIsPyodideReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const pyodideRef = useRef<PyodideInterface | null>(null);

  const isPyodideLoading = loadingStage !== "idle" && loadingStage !== "ready" && loadingStage !== "error";

  // Load Pyodide
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

  const runCode = async () => {
    if (!pyodideRef.current || !isPyodideReady) {
      setOutput("Python environment is still loading...");
      return;
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

      setOutput(outputText || "Code executed successfully (no output)");
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode.trim());
    setOutput("");
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 rounded-xl border border-[var(--border)] overflow-hidden bg-[var(--card)]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[var(--secondary)] border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <Terminal size={18} className="text-[var(--primary)]" />
          <span className="font-medium">{title}</span>
          {isPyodideReady && (
            <span className="text-xs text-[var(--accent)] px-2 py-0.5 rounded-full bg-[var(--accent)]/10">Ready</span>
          )}
          {loadingStage === "error" && (
            <span className="text-xs text-red-400 px-2 py-0.5 rounded-full bg-red-400/10">Error</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyCode}
            className="p-2 rounded-lg hover:bg-[var(--border)] transition-colors"
            title="Copy code"
          >
            {copied ? (
              <Check size={16} className="text-[var(--accent)]" />
            ) : (
              <Copy size={16} />
            )}
          </button>
          <button
            onClick={resetCode}
            className="p-2 rounded-lg hover:bg-[var(--border)] transition-colors"
            title="Reset code"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={runCode}
            disabled={isLoading || isPyodideLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent)] text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Play size={16} />
            )}
            Run
          </button>
        </div>
      </div>

      {description && (
        <div className="px-4 py-2 text-sm text-[var(--muted)] bg-[var(--secondary)] border-b border-[var(--border)]">
          {description}
        </div>
      )}

      {/* Loading Progress Bar */}
      {isPyodideLoading && (
        <div className="px-4 py-3 bg-[var(--code-bg)] border-b border-[var(--border)]">
          <div className="flex items-center gap-3 mb-2">
            <Download size={16} className="text-[var(--primary)] animate-pulse" />
            <span className="text-sm text-[var(--muted)]">
              {LOADING_MESSAGES[loadingStage]}
            </span>
          </div>
          <div className="w-full h-2 bg-[var(--border)] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] transition-all duration-500 ease-out"
              style={{ width: `${LOADING_PROGRESS[loadingStage]}%` }}
            />
          </div>
          <p className="text-xs text-[var(--muted)] mt-2 opacity-75">
            First load may take 10-15 seconds to download Python packages
          </p>
        </div>
      )}

      {/* Code Editor */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 p-4 font-mono text-sm bg-[var(--code-bg)] text-foreground resize-none focus:outline-none"
          spellCheck={false}
        />
      </div>

      {/* Output */}
      {output && (
        <div className="border-t border-[var(--border)]">
          <div className="px-4 py-2 text-xs font-medium text-[var(--muted)] bg-[var(--secondary)]">
            Output
          </div>
          <pre className="p-4 text-sm font-mono bg-[var(--code-bg)] text-foreground overflow-x-auto max-h-64 overflow-y-auto">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
