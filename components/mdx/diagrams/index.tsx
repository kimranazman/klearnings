"use client";

import { ReactNode } from "react";

// Base diagram wrapper with consistent styling
interface DiagramContainerProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function DiagramContainer({ title, children, className = "" }: DiagramContainerProps) {
  return (
    <div className={`my-8 ${className}`}>
      {title && (
        <div className="text-sm font-semibold text-[var(--muted)] mb-3">
          {title}
        </div>
      )}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 overflow-x-auto">
        {children}
      </div>
    </div>
  );
}

// Reusable diagram elements
export function DiagramBox({
  children,
  variant = "default",
  className = ""
}: {
  children: ReactNode;
  variant?: "default" | "primary" | "accent" | "muted" | "warning";
  className?: string;
}) {
  const variants = {
    default: "bg-[var(--secondary)] border-[var(--border)]",
    primary: "bg-[var(--primary)] text-white border-[var(--primary)]",
    accent: "bg-[var(--accent)] text-white border-[var(--accent)]",
    muted: "bg-[var(--secondary)] border-[var(--muted)] text-[var(--muted)]",
    warning: "bg-amber-100 dark:bg-amber-900/30 border-amber-400 dark:border-amber-600 text-amber-800 dark:text-amber-200",
  };

  return (
    <div className={`px-4 py-3 rounded-lg border-2 text-center font-medium text-sm ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}

export function DiagramArrow({ direction = "right", label }: { direction?: "right" | "down" | "left" | "up"; label?: string }) {
  const arrows = {
    right: "→",
    down: "↓",
    left: "←",
    up: "↑",
  };

  return (
    <div className="flex items-center justify-center text-[var(--muted)] font-medium">
      <span className="text-2xl">{arrows[direction]}</span>
      {label && <span className="ml-2 text-xs">{label}</span>}
    </div>
  );
}

// Supervised Learning Workflow Diagram
export function SupervisedLearningDiagram() {
  return (
    <DiagramContainer title="Supervised Learning Workflow">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
        {/* Training Phase */}
        <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-800">
          <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Training Phase</div>
          <DiagramBox variant="primary">Historical Data<br/><span className="text-xs opacity-80">(X_train, y_train)</span></DiagramBox>
          <DiagramArrow direction="down" />
          <DiagramBox>Learn Patterns<br/><span className="text-xs opacity-80">model.fit()</span></DiagramBox>
          <DiagramArrow direction="down" />
          <DiagramBox variant="accent">Trained Model<br/><span className="text-xs opacity-80">(β₀, β₁ learned)</span></DiagramBox>
        </div>

        <DiagramArrow direction="right" />

        {/* Prediction Phase */}
        <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800">
          <div className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wide">Prediction Phase</div>
          <DiagramBox variant="muted">New Data<br/><span className="text-xs opacity-80">(X_test)</span></DiagramBox>
          <DiagramArrow direction="down" />
          <DiagramBox>Apply Model<br/><span className="text-xs opacity-80">model.predict()</span></DiagramBox>
          <DiagramArrow direction="down" />
          <DiagramBox variant="accent">Predictions<br/><span className="text-xs opacity-80">(ŷ values)</span></DiagramBox>
        </div>

        <DiagramArrow direction="right" />

        {/* Evaluation */}
        <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border-2 border-purple-200 dark:border-purple-800">
          <div className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide">Evaluation</div>
          <DiagramBox>Compare ŷ vs y</DiagramBox>
          <DiagramArrow direction="down" />
          <DiagramBox variant="primary">MSE, R²<br/><span className="text-xs opacity-80">Performance Metrics</span></DiagramBox>
        </div>
      </div>
    </DiagramContainer>
  );
}

// Train-Test Split Diagram
export function TrainTestSplitDiagram() {
  return (
    <DiagramContainer title="Train-Test Split Process">
      <div className="space-y-6">
        {/* Full Dataset */}
        <div className="text-center">
          <div className="text-sm font-semibold mb-2">Full Dataset (100%)</div>
          <div className="h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
            All Your Data
          </div>
        </div>

        <div className="flex justify-center">
          <DiagramArrow direction="down" label="Split" />
        </div>

        {/* Split View */}
        <div className="flex gap-2">
          <div className="flex-[7] text-center">
            <div className="text-sm font-semibold mb-2 text-blue-600 dark:text-blue-400">Training Set (70-80%)</div>
            <div className="h-12 rounded-lg bg-blue-500 flex items-center justify-center text-white font-medium">
              Learn Patterns Here
            </div>
            <div className="mt-2 text-xs text-[var(--muted)]">Model sees this data during training</div>
          </div>
          <div className="flex-[3] text-center">
            <div className="text-sm font-semibold mb-2 text-green-600 dark:text-green-400">Test Set (20-30%)</div>
            <div className="h-12 rounded-lg bg-green-500 flex items-center justify-center text-white font-medium">
              Evaluate Here
            </div>
            <div className="mt-2 text-xs text-[var(--muted)]">Model never sees this until evaluation</div>
          </div>
        </div>

        {/* Warning */}
        <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <span className="text-amber-500">⚠️</span>
          <span className="text-sm text-amber-800 dark:text-amber-200">Never train on test data - this causes data leakage!</span>
        </div>
      </div>
    </DiagramContainer>
  );
}

// Overfitting vs Underfitting Diagram
export function BiasVarianceDiagram() {
  return (
    <DiagramContainer title="The Bias-Variance Tradeoff">
      <div className="space-y-6">
        {/* Error Curve */}
        <div className="relative h-48 bg-[var(--secondary)] rounded-lg p-4">
          <svg viewBox="0 0 400 160" className="w-full h-full">
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="400" height="160" fill="url(#grid)" />

            {/* Axes */}
            <line x1="40" y1="140" x2="380" y2="140" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2"/>
            <line x1="40" y1="20" x2="40" y2="140" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2"/>

            {/* Training Error (decreasing) */}
            <path
              d="M 60 40 Q 150 60, 200 90 T 360 130"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeDasharray="5,5"
            />

            {/* Test Error (U-shaped) */}
            <path
              d="M 60 50 Q 150 70, 200 75 Q 280 80, 360 40"
              fill="none"
              stroke="#ef4444"
              strokeWidth="3"
            />

            {/* Optimal zone */}
            <rect x="170" y="20" width="80" height="120" fill="#10b981" fillOpacity="0.1" rx="4"/>
            <line x1="210" y1="20" x2="210" y2="140" stroke="#10b981" strokeWidth="2" strokeDasharray="4,4"/>

            {/* Labels */}
            <text x="60" y="15" fontSize="10" fill="currentColor" opacity="0.7">Error</text>
            <text x="360" y="155" fontSize="10" fill="currentColor" opacity="0.7">Complexity →</text>
            <text x="200" y="15" fontSize="10" fill="#10b981" fontWeight="bold">Sweet Spot</text>

            {/* Legend */}
            <line x1="280" y1="25" x2="300" y2="25" stroke="#ef4444" strokeWidth="3"/>
            <text x="305" y="28" fontSize="9" fill="currentColor" opacity="0.8">Test Error</text>
            <line x1="280" y1="40" x2="300" y2="40" stroke="#3b82f6" strokeWidth="3" strokeDasharray="5,5"/>
            <text x="305" y="43" fontSize="9" fill="currentColor" opacity="0.8">Training Error</text>
          </svg>
        </div>

        {/* Three zones */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800 text-center">
            <div className="text-2xl mb-2">📉</div>
            <div className="font-bold text-red-600 dark:text-red-400">Underfitting</div>
            <div className="text-xs text-[var(--muted)] mt-1">High Bias</div>
            <div className="text-xs mt-2">Model too simple<br/>Misses patterns</div>
          </div>
          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800 text-center">
            <div className="text-2xl mb-2">✅</div>
            <div className="font-bold text-green-600 dark:text-green-400">Just Right</div>
            <div className="text-xs text-[var(--muted)] mt-1">Balanced</div>
            <div className="text-xs mt-2">Captures patterns<br/>Generalizes well</div>
          </div>
          <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950/30 border-2 border-orange-200 dark:border-orange-800 text-center">
            <div className="text-2xl mb-2">📈</div>
            <div className="font-bold text-orange-600 dark:text-orange-400">Overfitting</div>
            <div className="text-xs text-[var(--muted)] mt-1">High Variance</div>
            <div className="text-xs mt-2">Model too complex<br/>Memorizes noise</div>
          </div>
        </div>
      </div>
    </DiagramContainer>
  );
}

// K-Fold Cross Validation Diagram
export function KFoldDiagram({ k = 5 }: { k?: number }) {
  const folds = Array.from({ length: k }, (_, i) => i);

  return (
    <DiagramContainer title={`${k}-Fold Cross-Validation`}>
      <div className="space-y-4">
        <div className="text-sm text-[var(--muted)] text-center mb-4">
          Each fold takes a turn being the test set
        </div>

        {folds.map((testFold) => (
          <div key={testFold} className="flex items-center gap-2">
            <div className="w-20 text-xs text-[var(--muted)]">Iteration {testFold + 1}</div>
            <div className="flex-1 flex gap-1">
              {folds.map((fold) => (
                <div
                  key={fold}
                  className={`flex-1 h-8 rounded flex items-center justify-center text-xs font-medium ${
                    fold === testFold
                      ? "bg-green-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {fold === testFold ? "Test" : "Train"}
                </div>
              ))}
            </div>
            <div className="w-24 text-xs text-[var(--muted)]">→ Score {testFold + 1}</div>
          </div>
        ))}

        <div className="flex items-center gap-2 pt-4 border-t border-[var(--border)]">
          <div className="w-20"></div>
          <div className="flex-1 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent)] text-white font-medium">
              Final Score = Average of all {k} scores
            </div>
          </div>
          <div className="w-24"></div>
        </div>
      </div>
    </DiagramContainer>
  );
}

// Pipeline Diagram
export function PipelineDiagram() {
  return (
    <DiagramContainer title="ML Pipeline: Chaining Steps Together">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-3">
        <DiagramBox variant="muted">
          Raw Data<br/>
          <span className="text-xs">(X, y)</span>
        </DiagramBox>

        <DiagramArrow direction="right" />

        <div className="p-3 rounded-lg border-2 border-dashed border-[var(--primary)] bg-[var(--primary)]/5">
          <div className="text-xs text-[var(--primary)] font-bold mb-2 text-center">Pipeline</div>
          <div className="flex flex-col lg:flex-row items-center gap-2">
            <DiagramBox>
              Step 1<br/>
              <span className="text-xs">PolynomialFeatures</span>
            </DiagramBox>
            <DiagramArrow direction="right" />
            <DiagramBox>
              Step 2<br/>
              <span className="text-xs">StandardScaler</span>
            </DiagramBox>
            <DiagramArrow direction="right" />
            <DiagramBox variant="primary">
              Step 3<br/>
              <span className="text-xs">Ridge/Lasso</span>
            </DiagramBox>
          </div>
        </div>

        <DiagramArrow direction="right" />

        <DiagramBox variant="accent">
          Predictions<br/>
          <span className="text-xs">(ŷ)</span>
        </DiagramBox>
      </div>

      <div className="mt-4 text-center text-sm text-[var(--muted)]">
        Each step transforms data before passing it to the next step
      </div>
    </DiagramContainer>
  );
}

// Ridge vs Lasso Comparison
export function RidgeLassoDiagram() {
  return (
    <DiagramContainer title="Ridge vs Lasso: How They Handle Coefficients">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Ridge */}
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-800">
          <div className="text-center mb-4">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">Ridge (L2)</div>
            <div className="text-xs text-[var(--muted)]">Shrinks coefficients</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs w-12">β₁</span>
              <div className="flex-1 bg-blue-200 dark:bg-blue-800 rounded h-4">
                <div className="bg-blue-500 h-4 rounded" style={{ width: "80%" }}></div>
              </div>
              <span className="text-xs w-8">0.8</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs w-12">β₂</span>
              <div className="flex-1 bg-blue-200 dark:bg-blue-800 rounded h-4">
                <div className="bg-blue-500 h-4 rounded" style={{ width: "45%" }}></div>
              </div>
              <span className="text-xs w-8">0.45</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs w-12">β₃</span>
              <div className="flex-1 bg-blue-200 dark:bg-blue-800 rounded h-4">
                <div className="bg-blue-500 h-4 rounded" style={{ width: "15%" }}></div>
              </div>
              <span className="text-xs w-8">0.15</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs w-12">β₄</span>
              <div className="flex-1 bg-blue-200 dark:bg-blue-800 rounded h-4">
                <div className="bg-blue-500 h-4 rounded" style={{ width: "5%" }}></div>
              </div>
              <span className="text-xs w-8">0.05</span>
            </div>
          </div>

          <div className="mt-4 text-xs text-center text-[var(--muted)]">
            All features kept, small ones shrunk
          </div>
        </div>

        {/* Lasso */}
        <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border-2 border-purple-200 dark:border-purple-800">
          <div className="text-center mb-4">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">Lasso (L1)</div>
            <div className="text-xs text-[var(--muted)]">Eliminates coefficients</div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs w-12">β₁</span>
              <div className="flex-1 bg-purple-200 dark:bg-purple-800 rounded h-4">
                <div className="bg-purple-500 h-4 rounded" style={{ width: "90%" }}></div>
              </div>
              <span className="text-xs w-8">0.9</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs w-12">β₂</span>
              <div className="flex-1 bg-purple-200 dark:bg-purple-800 rounded h-4">
                <div className="bg-purple-500 h-4 rounded" style={{ width: "60%" }}></div>
              </div>
              <span className="text-xs w-8">0.6</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs w-12 text-red-500">β₃</span>
              <div className="flex-1 bg-red-200 dark:bg-red-800/30 rounded h-4 flex items-center justify-center">
                <span className="text-[10px] text-red-500">ELIMINATED</span>
              </div>
              <span className="text-xs w-8 text-red-500">0</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs w-12 text-red-500">β₄</span>
              <div className="flex-1 bg-red-200 dark:bg-red-800/30 rounded h-4 flex items-center justify-center">
                <span className="text-[10px] text-red-500">ELIMINATED</span>
              </div>
              <span className="text-xs w-8 text-red-500">0</span>
            </div>
          </div>

          <div className="mt-4 text-xs text-center text-[var(--muted)]">
            Weak features eliminated completely
          </div>
        </div>
      </div>
    </DiagramContainer>
  );
}

// One-Hot Encoding Diagram
export function OneHotEncodingDiagram() {
  return (
    <DiagramContainer title="One-Hot Encoding: Converting Categories to Numbers">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Before */}
        <div className="text-center">
          <div className="text-sm font-semibold mb-3 text-red-500">Before (Categorical)</div>
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="border border-[var(--border)] px-4 py-2 bg-[var(--secondary)]">Neighborhood</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border border-[var(--border)] px-4 py-2">Downtown</td></tr>
              <tr><td className="border border-[var(--border)] px-4 py-2">Suburb</td></tr>
              <tr><td className="border border-[var(--border)] px-4 py-2">Downtown</td></tr>
              <tr><td className="border border-[var(--border)] px-4 py-2">Rural</td></tr>
            </tbody>
          </table>
        </div>

        <div className="text-4xl text-[var(--primary)]">→</div>

        {/* After */}
        <div className="text-center">
          <div className="text-sm font-semibold mb-3 text-green-500">After (Numerical)</div>
          <table className="border-collapse text-sm">
            <thead>
              <tr>
                <th className="border border-[var(--border)] px-3 py-2 bg-[var(--secondary)]">Downtown</th>
                <th className="border border-[var(--border)] px-3 py-2 bg-[var(--secondary)]">Suburb</th>
                <th className="border border-[var(--border)] px-3 py-2 bg-[var(--secondary)]">Rural</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[var(--border)] px-3 py-2 bg-green-100 dark:bg-green-900/30 font-bold">1</td>
                <td className="border border-[var(--border)] px-3 py-2">0</td>
                <td className="border border-[var(--border)] px-3 py-2">0</td>
              </tr>
              <tr>
                <td className="border border-[var(--border)] px-3 py-2">0</td>
                <td className="border border-[var(--border)] px-3 py-2 bg-green-100 dark:bg-green-900/30 font-bold">1</td>
                <td className="border border-[var(--border)] px-3 py-2">0</td>
              </tr>
              <tr>
                <td className="border border-[var(--border)] px-3 py-2 bg-green-100 dark:bg-green-900/30 font-bold">1</td>
                <td className="border border-[var(--border)] px-3 py-2">0</td>
                <td className="border border-[var(--border)] px-3 py-2">0</td>
              </tr>
              <tr>
                <td className="border border-[var(--border)] px-3 py-2">0</td>
                <td className="border border-[var(--border)] px-3 py-2">0</td>
                <td className="border border-[var(--border)] px-3 py-2 bg-green-100 dark:bg-green-900/30 font-bold">1</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-[var(--muted)]">
        Each category becomes its own column with 1 (yes) or 0 (no)
      </div>
    </DiagramContainer>
  );
}

// GridSearchCV Diagram
export function GridSearchDiagram() {
  return (
    <DiagramContainer title="GridSearchCV: Finding the Best Settings">
      <div className="space-y-6">
        {/* Parameter Grid */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <div className="text-sm font-semibold mb-2">Parameter Grid</div>
            <div className="inline-flex gap-4 p-4 rounded-lg bg-[var(--secondary)]">
              <div className="text-sm">
                <div className="font-mono text-[var(--primary)]">alpha:</div>
                <div className="text-xs text-[var(--muted)]">[0.01, 0.1, 1.0, 10]</div>
              </div>
              <div className="text-xl text-[var(--muted)]">×</div>
              <div className="text-sm">
                <div className="font-mono text-[var(--primary)]">degree:</div>
                <div className="text-xs text-[var(--muted)]">[1, 2, 3]</div>
              </div>
              <div className="text-xl text-[var(--muted)]">=</div>
              <div className="text-sm">
                <div className="font-bold text-[var(--accent)]">12</div>
                <div className="text-xs text-[var(--muted)]">combinations</div>
              </div>
            </div>
          </div>
        </div>

        <DiagramArrow direction="down" />

        {/* Process */}
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <div key={i} className="p-2 rounded bg-blue-100 dark:bg-blue-900/30 text-center text-xs">
              <div className="font-bold">Combo {i}</div>
              <div className="text-[var(--muted)]">5-fold CV</div>
            </div>
          ))}
        </div>

        <DiagramArrow direction="down" />

        {/* Result */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 p-4 rounded-lg bg-[var(--accent)] text-white">
            <span className="text-2xl">🏆</span>
            <div>
              <div className="font-bold">Best Parameters Found!</div>
              <div className="text-sm opacity-80">Highest average CV score wins</div>
            </div>
          </div>
        </div>
      </div>
    </DiagramContainer>
  );
}

// Bias-Variance Target Diagram (Dart Board Analogy)
export function BiasVarianceTargetDiagram() {
  return (
    <DiagramContainer title="Bias vs Variance: The Dart Board Analogy">
      <div className="grid grid-cols-2 gap-6">
        {/* Low Bias, Low Variance */}
        <div className="text-center">
          <svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto">
            <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2"/>
            <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2"/>
            <circle cx="60" cy="60" r="25" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2"/>
            <circle cx="60" cy="60" r="10" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2"/>
            {/* Clustered darts around center */}
            <circle cx="58" cy="58" r="4" fill="#3b82f6"/>
            <circle cx="63" cy="57" r="4" fill="#3b82f6"/>
            <circle cx="60" cy="64" r="4" fill="#3b82f6"/>
            <circle cx="55" cy="61" r="4" fill="#3b82f6"/>
          </svg>
          <div className="mt-2 font-bold text-green-600 dark:text-green-400">Low Bias, Low Variance</div>
          <div className="text-xs text-[var(--muted)]">IDEAL: Accurate & Consistent</div>
        </div>

        {/* High Bias, Low Variance */}
        <div className="text-center">
          <svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto">
            <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2"/>
            <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2"/>
            <circle cx="60" cy="60" r="25" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2"/>
            <circle cx="60" cy="60" r="10" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2"/>
            {/* Clustered darts off-center */}
            <circle cx="85" cy="40" r="4" fill="#ef4444"/>
            <circle cx="90" cy="38" r="4" fill="#ef4444"/>
            <circle cx="87" cy="45" r="4" fill="#ef4444"/>
            <circle cx="83" cy="42" r="4" fill="#ef4444"/>
          </svg>
          <div className="mt-2 font-bold text-orange-600 dark:text-orange-400">High Bias, Low Variance</div>
          <div className="text-xs text-[var(--muted)]">Consistent but wrong</div>
        </div>

        {/* Low Bias, High Variance */}
        <div className="text-center">
          <svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto">
            <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2"/>
            <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2"/>
            <circle cx="60" cy="60" r="25" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2"/>
            <circle cx="60" cy="60" r="10" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2"/>
            {/* Scattered darts around center */}
            <circle cx="40" cy="50" r="4" fill="#f59e0b"/>
            <circle cx="80" cy="70" r="4" fill="#f59e0b"/>
            <circle cx="55" cy="85" r="4" fill="#f59e0b"/>
            <circle cx="75" cy="35" r="4" fill="#f59e0b"/>
          </svg>
          <div className="mt-2 font-bold text-yellow-600 dark:text-yellow-400">Low Bias, High Variance</div>
          <div className="text-xs text-[var(--muted)]">Right on average, unreliable</div>
        </div>

        {/* High Bias, High Variance */}
        <div className="text-center">
          <svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto">
            <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2"/>
            <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2"/>
            <circle cx="60" cy="60" r="25" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2"/>
            <circle cx="60" cy="60" r="10" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2"/>
            {/* Scattered darts off-center */}
            <circle cx="25" cy="30" r="4" fill="#ef4444"/>
            <circle cx="100" cy="25" r="4" fill="#ef4444"/>
            <circle cx="95" cy="95" r="4" fill="#ef4444"/>
            <circle cx="30" cy="85" r="4" fill="#ef4444"/>
          </svg>
          <div className="mt-2 font-bold text-red-600 dark:text-red-400">High Bias, High Variance</div>
          <div className="text-xs text-[var(--muted)]">WORST: Inaccurate & Inconsistent</div>
        </div>
      </div>
      <div className="mt-4 text-center text-sm text-[var(--muted)]">
        Green center = true value | Blue dots = predictions
      </div>
    </DiagramContainer>
  );
}

// RFE (Recursive Feature Elimination) Diagram
export function RFEDiagram() {
  return (
    <DiagramContainer title="Recursive Feature Elimination (RFE)">
      <div className="flex flex-col items-center gap-4">
        {/* Starting features */}
        <div className="flex items-center gap-2">
          <div className="text-sm font-semibold w-24">Start:</div>
          <div className="flex gap-1">
            {["F1", "F2", "F3", "F4", "F5"].map((f) => (
              <div key={f} className="w-10 h-10 rounded bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
                {f}
              </div>
            ))}
          </div>
          <div className="text-sm text-[var(--muted)]">5 features</div>
        </div>

        <DiagramArrow direction="down" label="Fit model, rank features" />

        {/* Round 1 */}
        <div className="flex items-center gap-2">
          <div className="text-sm font-semibold w-24">Round 1:</div>
          <div className="flex gap-1">
            {["F1", "F2", "F3", "F4"].map((f) => (
              <div key={f} className="w-10 h-10 rounded bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
                {f}
              </div>
            ))}
            <div className="w-10 h-10 rounded bg-red-200 dark:bg-red-900/30 text-red-500 flex items-center justify-center text-xs line-through">
              F5
            </div>
          </div>
          <div className="text-sm text-red-500">Remove weakest</div>
        </div>

        <DiagramArrow direction="down" label="Repeat..." />

        {/* Round 2 */}
        <div className="flex items-center gap-2">
          <div className="text-sm font-semibold w-24">Round 2:</div>
          <div className="flex gap-1">
            {["F1", "F2", "F4"].map((f) => (
              <div key={f} className="w-10 h-10 rounded bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
                {f}
              </div>
            ))}
            <div className="w-10 h-10 rounded bg-red-200 dark:bg-red-900/30 text-red-500 flex items-center justify-center text-xs line-through">
              F3
            </div>
          </div>
          <div className="text-sm text-red-500">Remove weakest</div>
        </div>

        <DiagramArrow direction="down" label="Until target # reached" />

        {/* Final */}
        <div className="flex items-center gap-2 p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800">
          <div className="text-sm font-semibold w-24">Final:</div>
          <div className="flex gap-1">
            {["F1", "F2"].map((f) => (
              <div key={f} className="w-10 h-10 rounded bg-green-500 text-white flex items-center justify-center text-xs font-bold">
                {f}
              </div>
            ))}
          </div>
          <div className="text-sm text-green-600 dark:text-green-400 font-semibold">Best features selected!</div>
        </div>
      </div>
    </DiagramContainer>
  );
}

// Constraint Regions Diagram (Geometric View)
export function ConstraintRegionsDiagram() {
  return (
    <DiagramContainer title="Geometric View: Ridge vs Lasso Constraint Regions">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Ridge */}
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-4">Ridge (L2) - Circle</div>
          <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
            {/* Axes */}
            <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1"/>
            <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1"/>

            {/* Contour ellipses (OLS cost function) */}
            <ellipse cx="140" cy="60" rx="60" ry="40" fill="none" stroke="#ef4444" strokeOpacity="0.3" strokeWidth="1" transform="rotate(30 140 60)"/>
            <ellipse cx="140" cy="60" rx="45" ry="30" fill="none" stroke="#ef4444" strokeOpacity="0.4" strokeWidth="1" transform="rotate(30 140 60)"/>
            <ellipse cx="140" cy="60" rx="30" ry="20" fill="none" stroke="#ef4444" strokeOpacity="0.5" strokeWidth="1" transform="rotate(30 140 60)"/>

            {/* Circle constraint */}
            <circle cx="100" cy="100" r="50" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2"/>

            {/* Intersection point */}
            <circle cx="135" cy="70" r="5" fill="#10b981"/>

            {/* OLS point */}
            <circle cx="140" cy="60" r="4" fill="#ef4444"/>
            <text x="150" y="55" fontSize="10" fill="#ef4444">OLS</text>

            {/* Labels */}
            <text x="100" y="15" fontSize="10" fill="currentColor" textAnchor="middle">β₂</text>
            <text x="185" y="105" fontSize="10" fill="currentColor">β₁</text>
          </svg>
          <div className="text-sm text-[var(--muted)] mt-2">
            Intersection can occur<br/>anywhere on the circle
          </div>
        </div>

        {/* Lasso */}
        <div className="text-center">
          <div className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-4">Lasso (L1) - Diamond</div>
          <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
            {/* Axes */}
            <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1"/>
            <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1"/>

            {/* Contour ellipses (OLS cost function) */}
            <ellipse cx="140" cy="60" rx="60" ry="40" fill="none" stroke="#ef4444" strokeOpacity="0.3" strokeWidth="1" transform="rotate(30 140 60)"/>
            <ellipse cx="140" cy="60" rx="45" ry="30" fill="none" stroke="#ef4444" strokeOpacity="0.4" strokeWidth="1" transform="rotate(30 140 60)"/>
            <ellipse cx="140" cy="60" rx="30" ry="20" fill="none" stroke="#ef4444" strokeOpacity="0.5" strokeWidth="1" transform="rotate(30 140 60)"/>

            {/* Diamond constraint */}
            <polygon points="100,50 150,100 100,150 50,100" fill="#8b5cf6" fillOpacity="0.1" stroke="#8b5cf6" strokeWidth="2"/>

            {/* Intersection point at corner (β₂ = 0) */}
            <circle cx="150" cy="100" r="5" fill="#10b981"/>

            {/* OLS point */}
            <circle cx="140" cy="60" r="4" fill="#ef4444"/>
            <text x="150" y="55" fontSize="10" fill="#ef4444">OLS</text>

            {/* Labels */}
            <text x="100" y="15" fontSize="10" fill="currentColor" textAnchor="middle">β₂</text>
            <text x="185" y="105" fontSize="10" fill="currentColor">β₁</text>
            <text x="155" y="115" fontSize="8" fill="#10b981">β₂=0!</text>
          </svg>
          <div className="text-sm text-[var(--muted)] mt-2">
            Likely to hit corners where<br/>one coefficient = 0
          </div>
        </div>
      </div>
    </DiagramContainer>
  );
}

// Prior Distributions Diagram
export function PriorDistributionsDiagram() {
  return (
    <DiagramContainer title="Bayesian View: Prior Distributions">
      <div className="relative h-48 bg-[var(--secondary)] rounded-lg p-4">
        <svg viewBox="0 0 400 160" className="w-full h-full">
          {/* Grid */}
          <defs>
            <pattern id="prior-grid" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="400" height="160" fill="url(#prior-grid)" />

          {/* Axes */}
          <line x1="40" y1="140" x2="360" y2="140" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2"/>
          <line x1="200" y1="20" x2="200" y2="140" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4,4"/>

          {/* Gaussian (Ridge) - wider bell curve */}
          <path
            d="M 60 140 Q 80 130, 120 110 Q 160 70, 200 40 Q 240 70, 280 110 Q 320 130, 340 140"
            fill="#3b82f6"
            fillOpacity="0.2"
            stroke="#3b82f6"
            strokeWidth="3"
          />

          {/* Laplacian (Lasso) - sharper peak */}
          <path
            d="M 80 140 L 200 30 L 320 140"
            fill="#8b5cf6"
            fillOpacity="0.2"
            stroke="#8b5cf6"
            strokeWidth="3"
          />

          {/* Labels */}
          <text x="200" y="155" fontSize="10" fill="currentColor" textAnchor="middle">0 (coefficient value)</text>
          <text x="30" y="30" fontSize="10" fill="currentColor">P(β)</text>

          {/* Legend */}
          <rect x="250" y="25" width="20" height="10" fill="#3b82f6" fillOpacity="0.5"/>
          <text x="275" y="33" fontSize="9" fill="currentColor">Gaussian (Ridge)</text>
          <rect x="250" y="45" width="20" height="10" fill="#8b5cf6" fillOpacity="0.5"/>
          <text x="275" y="53" fontSize="9" fill="currentColor">Laplacian (Lasso)</text>
        </svg>
      </div>
      <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="font-bold text-blue-600 dark:text-blue-400">Gaussian (Ridge)</div>
          <div className="text-[var(--muted)]">Broader peak - coefficients can be moderate</div>
        </div>
        <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
          <div className="font-bold text-purple-600 dark:text-purple-400">Laplacian (Lasso)</div>
          <div className="text-[var(--muted)]">Sharp peak at zero - favors exact zeros</div>
        </div>
      </div>
    </DiagramContainer>
  );
}

// Alpha Effect Diagram
export function AlphaEffectDiagram() {
  return (
    <DiagramContainer title="How Alpha (λ) Controls Model Behavior">
      <div className="space-y-4">
        {/* Spectrum bar */}
        <div className="relative h-12 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-500 to-red-500"></div>
          <div className="absolute inset-0 flex items-center justify-between px-4 text-white font-bold text-sm">
            <span>α = 0</span>
            <span>α = 0.1</span>
            <span>α = 1</span>
            <span>α = 10</span>
            <span>α = 100</span>
          </div>
        </div>

        {/* Properties */}
        <div className="grid grid-cols-5 gap-2 text-xs text-center">
          <div>No regularization</div>
          <div>Mild</div>
          <div>Moderate</div>
          <div>Strong</div>
          <div>Very strong</div>
        </div>

        {/* Effect rows */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-32 font-semibold">Coefficients:</span>
            <div className="flex-1 h-6 rounded bg-gradient-to-r from-blue-500 to-blue-100 flex items-center px-2 text-white text-xs">
              Large → → → → → → → → Small
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-32 font-semibold">Model complexity:</span>
            <div className="flex-1 h-6 rounded bg-gradient-to-r from-purple-500 to-purple-100 flex items-center px-2 text-white text-xs">
              Complex → → → → → → → Simple
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-32 font-semibold">Bias:</span>
            <div className="flex-1 h-6 rounded bg-gradient-to-r from-green-100 to-green-500 flex items-center px-2 text-white text-xs justify-end">
              Low → → → → → → → → High
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-32 font-semibold">Variance:</span>
            <div className="flex-1 h-6 rounded bg-gradient-to-r from-orange-500 to-orange-100 flex items-center px-2 text-white text-xs">
              High → → → → → → → → Low
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-32 font-semibold">Features (Lasso):</span>
            <div className="flex-1 h-6 rounded bg-gradient-to-r from-cyan-500 to-cyan-100 flex items-center px-2 text-white text-xs">
              Many → → → → → → → → Few
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[var(--secondary)] text-center text-sm">
          <span className="font-semibold text-[var(--accent)]">Use LassoCV or RidgeCV</span> to find the optimal alpha automatically!
        </div>
      </div>
    </DiagramContainer>
  );
}

// Feature Scaling Comparison
export function FeatureScalingDiagram() {
  return (
    <DiagramContainer title="Why Feature Scaling Matters">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Without Scaling */}
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800">
          <div className="text-center mb-4">
            <div className="text-lg font-bold text-red-600 dark:text-red-400">❌ Without Scaling</div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Price ($):</span>
              <span className="font-mono">100,000 - 1,000,000</span>
            </div>
            <div className="flex justify-between">
              <span>Bedrooms:</span>
              <span className="font-mono">1 - 5</span>
            </div>
            <div className="h-8 bg-red-200 dark:bg-red-800 rounded relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 bg-red-500" style={{ width: "95%" }}>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white">Price dominates!</span>
              </div>
            </div>
          </div>
          <div className="mt-3 text-xs text-center text-[var(--muted)]">
            Large values get unfair penalty in regularization
          </div>
        </div>

        {/* With Scaling */}
        <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800">
          <div className="text-center mb-4">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">✅ With Scaling</div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Price (scaled):</span>
              <span className="font-mono">-1.5 to +1.5</span>
            </div>
            <div className="flex justify-between">
              <span>Bedrooms (scaled):</span>
              <span className="font-mono">-1.5 to +1.5</span>
            </div>
            <div className="h-8 rounded flex gap-1">
              <div className="flex-1 bg-green-500 rounded flex items-center justify-center text-xs text-white">Price</div>
              <div className="flex-1 bg-green-500 rounded flex items-center justify-center text-xs text-white">Bedrooms</div>
            </div>
          </div>
          <div className="mt-3 text-xs text-center text-[var(--muted)]">
            Fair comparison - all features on same scale
          </div>
        </div>
      </div>
    </DiagramContainer>
  );
}
