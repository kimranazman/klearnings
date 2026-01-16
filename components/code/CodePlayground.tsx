"use client";

import { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Loader2, Terminal, Copy, Check } from "lucide-react";

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

export function CodePlayground({
  initialCode,
  title = "Python Playground",
  description,
}: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode.trim());
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPyodideLoading, setIsPyodideLoading] = useState(false);
  const [isPyodideReady, setIsPyodideReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const pyodideRef = useRef<PyodideInterface | null>(null);

  // Load Pyodide
  useEffect(() => {
    const loadPyodide = async () => {
      if (pyodideRef.current) return;

      setIsPyodideLoading(true);

      // Load Pyodide script
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
      script.async = true;

      script.onload = async () => {
        try {
          pyodideRef.current = await window.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
          });

          // Load commonly used packages
          await pyodideRef.current.loadPackage(["numpy", "micropip"]);

          // Install scikit-learn via micropip
          await pyodideRef.current.runPythonAsync(`
import micropip
await micropip.install('scikit-learn')
          `);

          setIsPyodideReady(true);
          setOutput("Python environment ready! Click 'Run' to execute code.");
        } catch (error) {
          console.error("Failed to load Pyodide:", error);
          setOutput("Failed to load Python environment. Please refresh the page.");
        } finally {
          setIsPyodideLoading(false);
        }
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
          {isPyodideLoading && (
            <span className="text-xs text-[var(--muted)] flex items-center gap-1">
              <Loader2 size={12} className="animate-spin" />
              Loading Python...
            </span>
          )}
          {isPyodideReady && (
            <span className="text-xs text-[var(--accent)]">Ready</span>
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
