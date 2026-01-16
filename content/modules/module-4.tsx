"use client";

import { CodePlayground } from "@/components/code/CodePlayground";
import { Callout } from "@/components/mdx/Callout";
import { CodeBlock } from "@/components/mdx/CodeBlock";
import { MustKnow } from "@/components/mdx/MustKnow";
import { BiasVarianceTargetDiagram, RidgeLassoDiagram, RFEDiagram } from "@/components/mdx/diagrams";
import { RegularizationGame } from "@/components/games";

export default function Module4Content() {
  return (
    <>
      <h2>Module Overview</h2>
      <p>
        This module covers the fundamental concepts of bias-variance tradeoff and regularization techniques
        in supervised machine learning regression. You&apos;ll learn how to diagnose overfitting and underfitting,
        and apply regularization methods (Ridge, Lasso, Elastic Net) to optimize model complexity.
      </p>

      <Callout type="business" title="TechRetail's Challenge: Too Many Features">
        <p>
          TechRetail&apos;s data team expanded their model to include 50 features: price, reviews, category,
          seasonality, competitor prices, warehouse location, and more. But something strange happened—
          their cross-validation score dropped from 0.76 to 0.58.
        </p>
        <p className="mt-2 text-sm opacity-80">
          More features didn&apos;t help; it made things worse. The model was fitting noise in the training data.
          This module introduces regularization—the art of &quot;constraining&quot; a model to focus on what matters.
        </p>
      </Callout>

      <h2>Key Concepts</h2>

      <h3>1. Bias</h3>
      <ul>
        <li><strong>Definition:</strong> The tendency for a model to consistently miss the true values when predicting</li>
        <li><strong>Cause:</strong> Missing information or overly simplistic models</li>
        <li><strong>Association:</strong> High bias = Underfitting = Model too rigid to capture patterns</li>
      </ul>

      <h3>2. Variance</h3>
      <ul>
        <li><strong>Definition:</strong> The tendency for predictions to fluctuate dramatically</li>
        <li><strong>Cause:</strong> High sensitivity of output to small changes in input</li>
        <li><strong>Association:</strong> High variance = Overfitting = Model fits noise instead of signal</li>
      </ul>

      <Callout type="business" title="Business Analogy: The Dart Board">
        <p>
          Imagine TechRetail&apos;s forecasters throwing darts at a board (true sales = bullseye):
        </p>
        <ul className="mt-2">
          <li><strong>Low Bias, Low Variance:</strong> Darts clustered around bullseye. Ideal!</li>
          <li><strong>High Bias, Low Variance:</strong> Darts clustered together, but all miss the bullseye the same way. Consistent but wrong.</li>
          <li><strong>Low Bias, High Variance:</strong> Darts average near bullseye, but scattered everywhere. Right on average, unreliable individually.</li>
          <li><strong>High Bias, High Variance:</strong> Darts scattered AND missing the bullseye. Worst case.</li>
        </ul>
      </Callout>

      <h3>3. Regularization</h3>
      <p>
        Technique to reduce model complexity by adding a penalty term to the cost function.
        Lambda (alpha in sklearn) controls regularization strength:
      </p>
      <ul>
        <li><strong>Higher lambda:</strong> More penalty = Simpler model = Higher bias, lower variance</li>
        <li><strong>Lower lambda:</strong> Less penalty = Complex model = Lower bias, higher variance</li>
      </ul>

      <Callout type="business" title="Business Analogy: The Budget Constraint">
        <p>
          Think of regularization as a budget constraint for your model:
        </p>
        <p className="mt-2">
          Without regularization, TechRetail&apos;s model is like a shopper with unlimited credit—it buys
          everything (uses all features heavily), even unnecessary items (noise).
        </p>
        <p className="mt-2">
          <strong>Regularization</strong> is like giving the model a budget: &quot;You have $100 total to spend
          on feature coefficients.&quot; Now it must prioritize—spending big on important features and little
          (or nothing) on unimportant ones.
        </p>
        <p className="mt-2 text-sm opacity-80">
          Alpha (λ) is how tight the budget is. High alpha = tiny budget = only essential features get funding.
        </p>
      </Callout>

      <h2>Core Formulas</h2>

      <h3>Ridge Regression (L2 Regularization)</h3>
      <CodeBlock language="text">{`Cost = RSS + λ * Σ(wⱼ²)
     = Σ(y - Xw)² + λ * ||w||₂²

Where:
- λ (alpha): regularization strength parameter
- wⱼ: coefficient for feature j
- ||w||₂²: L2 norm (sum of squared coefficients)`}</CodeBlock>

      <h3>Lasso Regression (L1 Regularization)</h3>
      <CodeBlock language="text">{`Cost = RSS + λ * Σ|wⱼ|
     = Σ(y - Xw)² + λ * ||w||₁

Where:
- ||w||₁: L1 norm (sum of absolute values of coefficients)`}</CodeBlock>

      <h3>Elastic Net (Combined L1 + L2)</h3>
      <CodeBlock language="text">{`Cost = RSS + λ₁ * Σ|wⱼ| + λ₂ * Σ(wⱼ²)
     = RSS + λ * [α * ||w||₁ + (1-α) * ||w||₂²]

Where:
- α (l1_ratio): balance between L1 and L2
  - α = 1: Pure Lasso
  - α = 0: Pure Ridge
  - 0 < α < 1: Mix of both`}</CodeBlock>

      <h2>Bias-Variance Target Analogy</h2>

      <BiasVarianceTargetDiagram />

      <Callout type="tip" title="Reading This Diagram">
        <p>
          The bullseye (target) represents the true value. Each dot is a prediction from a model trained
          on different data samples. A good model has darts clustered tightly on the bullseye.
        </p>
      </Callout>

      <h2>Ridge vs Lasso Coefficient Behavior</h2>

      <RidgeLassoDiagram />

      <Callout type="business" title="Business Analogy: Salary Cuts">
        <p>
          Imagine TechRetail needs to reduce their data team budget:
        </p>
        <ul className="mt-2">
          <li><strong>Ridge (L2):</strong> &quot;Everyone takes a proportional pay cut.&quot; All employees keep their jobs, but salaries shrink as budget tightens. No one gets fired.</li>
          <li><strong>Lasso (L1):</strong> &quot;We&apos;ll lay off the least productive employees.&quot; Some people are completely let go (coefficient = 0), while top performers keep more of their salary.</li>
        </ul>
        <p className="mt-2 text-sm opacity-80">
          Use Ridge when all features might matter. Use Lasso when you suspect many features are useless—
          Lasso will automatically &quot;fire&quot; them by setting coefficients to exactly zero.
        </p>
      </Callout>

      <h2>Interactive Python Example</h2>

      <CodePlayground
        title="Ridge vs Lasso Regularization"
        description="Compare Ridge and Lasso regression behavior on the same dataset"
        initialCode={`import numpy as np
from sklearn.linear_model import Ridge, Lasso, RidgeCV, LassoCV
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

# Generate data with some irrelevant features
np.random.seed(42)
n_samples, n_features = 100, 10
X = np.random.randn(n_samples, n_features)
# Only first 3 features are relevant
y = 3*X[:, 0] + 2*X[:, 1] - X[:, 2] + np.random.randn(n_samples) * 0.5

# Split and scale
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Ridge with CV
alphas = [0.001, 0.01, 0.1, 1, 10, 100]
ridge_cv = RidgeCV(alphas=alphas, cv=5)
ridge_cv.fit(X_train_scaled, y_train)

# Lasso with CV
lasso_cv = LassoCV(alphas=alphas, cv=5, max_iter=10000)
lasso_cv.fit(X_train_scaled, y_train)

print("=== Ridge Regression ===")
print(f"Best alpha: {ridge_cv.alpha_}")
print(f"Coefficients: {np.round(ridge_cv.coef_, 3)}")
print(f"Non-zero coefficients: {np.sum(ridge_cv.coef_ != 0)}")

print("\\n=== Lasso Regression ===")
print(f"Best alpha: {lasso_cv.alpha_}")
print(f"Coefficients: {np.round(lasso_cv.coef_, 3)}")
print(f"Non-zero coefficients: {np.sum(lasso_cv.coef_ != 0)}")`}
      />

      <h2>Feature Selection with RFE</h2>

      <RFEDiagram />

      <Callout type="business" title="Business Analogy: Tournament Elimination">
        <p>
          RFE is like a tournament elimination process for features:
        </p>
        <ul className="mt-2">
          <li>Round 1: All 50 features compete. The weakest performer is eliminated.</li>
          <li>Round 2: 49 features compete. Another elimination.</li>
          <li>Continue until only the top performers remain.</li>
        </ul>
        <p className="mt-2 text-sm opacity-80">
          TechRetail used RFECV and discovered that only 12 of their 50 features actually improved predictions.
          The other 38 were adding noise, not signal.
        </p>
      </Callout>

      <h2>Code Examples</h2>

      <h3>Elastic Net with Cross-Validation</h3>
      <CodeBlock language="python">{`from sklearn.linear_model import ElasticNetCV

alphas = [0.001, 0.01, 0.1, 1, 10]
l1_ratios = [0.1, 0.3, 0.5, 0.7, 0.9]

elastic_cv = ElasticNetCV(
    alphas=alphas,
    l1_ratio=l1_ratios,
    cv=5,
    max_iter=10000
)
elastic_cv.fit(X_train_scaled, y_train)

print(f"Best alpha: {elastic_cv.alpha_}")
print(f"Best l1_ratio: {elastic_cv.l1_ratio_}")`}</CodeBlock>

      <h3>Recursive Feature Elimination</h3>
      <CodeBlock language="python">{`from sklearn.feature_selection import RFE, RFECV

# RFE with specified number of features
estimator = Ridge(alpha=1.0)
rfe = RFE(estimator, n_features_to_select=10)
rfe.fit(X_train_scaled, y_train)

# RFECV - automatically finds optimal number
rfecv = RFECV(estimator, cv=5)
rfecv.fit(X_train_scaled, y_train)
print(f"Optimal features: {rfecv.n_features_}")`}</CodeBlock>

      <h2>Practice: Tune the Regularization</h2>
      <p>
        Regularization strength (alpha) controls how many features survive. Can you find the
        right balance? Adjust the alpha slider to keep only the important features while
        eliminating noise.
      </p>

      <RegularizationGame />

      <MustKnow
        moduleNumber={4}
        title="Absolute Must-Know: Regularization & Feature Selection"
        tldr="Regularization adds a penalty to prevent overfitting. Lasso (L1) eliminates features (coef=0). Ridge (L2) shrinks all. Always scale first!"
        items={[
          {
            concept: "Bias-Variance Tradeoff - The Fundamental ML Dilemma",
            whyItMatters: "High bias = model too simple (misses patterns). High variance = model too complex (memorizes noise). Regularization lets you control this balance.",
            analogy: "Underfitting: 'Everything costs $50.' Overfitting: 'Item #4523 costs exactly $47.23 on rainy Tuesdays.' You want: 'Premium items cost more.'"
          },
          {
            concept: "Ridge (L2) = Everyone Takes a Pay Cut",
            whyItMatters: "Ridge shrinks ALL coefficients toward zero but never exactly to zero. Use when you believe all features contribute something.",
            analogy: "Budget cuts: 'Everyone takes a 20% pay cut.' All employees stay, but salaries shrink. No one gets fired.",
            codeSnippet: "Cost = MSE + λ × Σ(coefficients²)"
          },
          {
            concept: "Lasso (L1) = Fire the Underperformers",
            whyItMatters: "Lasso sets weak coefficients EXACTLY to zero, eliminating features automatically. Use for feature selection when you have many potentially useless features.",
            analogy: "Budget cuts: 'Lay off the bottom performers.' Some employees get completely eliminated (coef=0), others keep their salary.",
            codeSnippet: "Cost = MSE + λ × Σ|coefficients|\n# Some coefficients become exactly 0!"
          },
          {
            concept: "Alpha (λ) Controls Regularization Strength",
            whyItMatters: "Low alpha = weak penalty, complex model, risk overfitting. High alpha = strong penalty, simple model, risk underfitting. Use LassoCV/RidgeCV to find optimal.",
            analogy: "Alpha is how tight the budget is. α=0.001 = loose budget, keep everything. α=100 = brutal cuts, only essentials survive.",
            codeSnippet: "lasso_cv = LassoCV(cv=5)  # Auto-finds best alpha"
          },
          {
            concept: "MUST Scale Features Before Regularization",
            whyItMatters: "Regularization penalizes large coefficients. If 'price' is in millions and 'rating' is 1-5, the penalty unfairly punishes rating. Scaling makes it fair.",
            analogy: "It's like penalizing 'salary in yen' vs 'salary in dollars.' Without converting to same scale, comparison is meaningless.",
            codeSnippet: "scaler = StandardScaler()\nX_scaled = scaler.fit_transform(X_train)"
          }
        ]}
      />

      <h2>Key Takeaways</h2>

      <Callout type="info" title="Summary">
        <ul>
          <li><strong>Balance is Key:</strong> Find the optimal balance between bias (underfitting) and variance (overfitting).</li>
          <li><strong>Regularization Controls Complexity:</strong> Adding a penalty term allows fine-grained control over model complexity.</li>
          <li><strong>Choose the Right Regularization:</strong>
            <ul>
              <li><strong>Ridge (L2):</strong> Shrinks all coefficients; use when all features may be relevant</li>
              <li><strong>Lasso (L1):</strong> Can eliminate features entirely; use for feature selection</li>
              <li><strong>Elastic Net:</strong> Combines both; best of both worlds</li>
            </ul>
          </li>
          <li><strong>Always Scale Features:</strong> Without scaling, features with larger scales receive unfair penalties.</li>
          <li><strong>Use Cross-Validation:</strong> Never guess the optimal alpha - use RidgeCV, LassoCV, or ElasticNetCV.</li>
        </ul>
      </Callout>

      <Callout type="business" title="TechRetail's Module 4 Progress">
        <p>
          TechRetail applied Lasso regression to their 50-feature model. The results were eye-opening:
        </p>
        <ul className="mt-2">
          <li>28 features had coefficients set to exactly zero—Lasso &quot;fired&quot; them</li>
          <li>The remaining 22 features gave a CV R² of 0.79 (better than the original 50!)</li>
          <li>They learned that &quot;warehouse_distance_km&quot; had zero predictive power for sales</li>
        </ul>
        <p className="mt-2">
          <strong>Next challenge:</strong> How do they explain the model to executives? &quot;The coefficient
          is 2.3&quot; doesn&apos;t mean much if features aren&apos;t scaled consistently. Module 5 covers
          interpretation and feature scaling.
        </p>
      </Callout>
    </>
  );
}
