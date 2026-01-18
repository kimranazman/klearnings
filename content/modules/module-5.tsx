"use client";

import { CodePlayground } from "@/components/code/CodePlayground";
import { InteractiveCode } from "@/components/code/InteractiveCode";
import { Callout } from "@/components/mdx/Callout";
import { CodeBlock } from "@/components/mdx/CodeBlock";
import { MustKnow } from "@/components/mdx/MustKnow";
import { ConstraintRegionsDiagram, PriorDistributionsDiagram, FeatureScalingDiagram, AlphaEffectDiagram } from "@/components/mdx/diagrams";
import { CoefficientMatchingGame } from "@/components/games";
import { module5Exercises } from "@/lib/code-exercise-data";

export default function Module5Content() {
  return (
    <>
      <h2>Module Overview</h2>
      <p>
        This module provides a deep dive into regularization techniques (Ridge and Lasso) for supervised
        machine learning regression. It explores three complementary perspectives for understanding
        regularization: analytical, geometric, and probabilistic views.
      </p>

      <Callout type="business" title="TechRetail's Challenge: Explaining the Model">
        <p>
          TechRetail&apos;s data team presented their Lasso model to executives. &quot;The coefficient for
          price is -0.47, and for reviews it&apos;s 2.31.&quot; The CEO asked: &quot;Does that mean reviews
          are 5x more important than price?&quot;
        </p>
        <p className="mt-2 text-sm opacity-80">
          The answer depends on feature scaling. Without proper understanding, coefficients can be misleading.
          This module covers why standardization is critical and how to correctly interpret regularized models.
        </p>
      </Callout>

      <h2>Three Views of Regularization</h2>

      <h3>1. Analytical View</h3>
      <ul>
        <li>Smaller coefficients = simpler models with lower variance</li>
        <li>Eliminating features (zeroing coefficients) directly reduces model complexity</li>
        <li>Shrinking coefficients reduces sensitivity to feature changes</li>
      </ul>

      <Callout type="business" title="Business Analogy: The Simplicity Principle">
        <p>
          Imagine TechRetail&apos;s pricing strategy. A complex formula might be:
        </p>
        <p className="mt-2 font-mono text-sm">
          price = $50 + $3.47×(reviews) - $0.89×(competitor_price) + $12.5×(is_premium) - $2.1×(distance)...
        </p>
        <p className="mt-2">
          A simpler version (regularized):
        </p>
        <p className="mt-2 font-mono text-sm">
          price = $50 + $2×(reviews) + $5×(is_premium)
        </p>
        <p className="mt-2 text-sm opacity-80">
          The simpler model is easier to explain, less sensitive to data quirks, and often predicts just as well.
        </p>
      </Callout>

      <h3>2. Geometric View</h3>
      <ul>
        <li>Optimization occurs at intersection of OLS contours and penalty boundaries</li>
        <li>Ridge penalty creates a circular constraint region</li>
        <li>Lasso penalty creates a diamond-shaped constraint region</li>
        <li>Diamond edges more likely to intersect at axis points, zeroing coefficients</li>
      </ul>

      <h3>3. Probabilistic (Bayesian) View</h3>
      <ul>
        <li>Regularization imposes prior distributions on coefficients</li>
        <li>Ridge assumes Gaussian prior (bell curve centered at zero)</li>
        <li>Lasso assumes Laplacian prior (sharper peak at zero)</li>
        <li>Higher lambda = smaller prior variance = coefficients more likely near zero</li>
      </ul>

      <Callout type="business" title="Business Analogy: Prior Beliefs">
        <p>
          <strong>Without regularization:</strong> You have no opinion about coefficients—let the data decide everything.
        </p>
        <p className="mt-2">
          <strong>With regularization:</strong> You start with a belief: &quot;Most features are probably not that important.&quot;
          The data can override this belief, but only with strong evidence.
        </p>
        <p className="mt-2 text-sm opacity-80">
          TechRetail&apos;s prior belief: &quot;Warehouse distance probably doesn&apos;t affect online sales.&quot;
          If the data strongly disagrees, the coefficient will still be non-zero. But if the evidence is weak,
          regularization keeps the coefficient small.
        </p>
      </Callout>

      <h2>Geometric View: Ridge vs Lasso</h2>

      <ConstraintRegionsDiagram />

      <Callout type="tip" title="Why Lasso Creates Zeros">
        <p>
          The diamond shape of Lasso&apos;s constraint region has sharp corners on the axes. When the
          cost function contours intersect the constraint, they&apos;re statistically more likely to hit
          these corners—which means one coefficient equals exactly zero.
        </p>
      </Callout>

      <h2>Prior Distributions</h2>

      <PriorDistributionsDiagram />

      <Callout type="business" title="Business Analogy: Skepticism Levels">
        <p>
          <strong>Gaussian prior (Ridge):</strong> You&apos;re a mild skeptic. &quot;I think coefficients are
          probably small, but I&apos;m open to them being moderate.&quot;
        </p>
        <p className="mt-2">
          <strong>Laplacian prior (Lasso):</strong> You&apos;re a strong skeptic. &quot;I really think most
          coefficients should be zero. Convince me otherwise.&quot;
        </p>
        <p className="mt-2 text-sm opacity-80">
          TechRetail&apos;s team uses Lasso because they believe most of their 50 features are noise.
          Lasso&apos;s sharper prior helps identify the truly important ones.
        </p>
      </Callout>

      <h2>Standardization is Critical</h2>

      <Callout type="warning" title="Always Standardize Before Regularization">
        Features MUST be scaled before applying regularization. Without standardization,
        features on larger scales receive unfair penalties, leading to suboptimal models.
      </Callout>

      <FeatureScalingDiagram />

      <Callout type="business" title="Business Analogy: The Currency Problem">
        <p>
          Imagine comparing salaries without currency conversion:
        </p>
        <ul className="mt-2">
          <li>Employee A earns 50,000 (USD)</li>
          <li>Employee B earns 5,000,000 (Japanese Yen)</li>
          <li>Employee C earns 40,000 (Euros)</li>
        </ul>
        <p className="mt-2">
          Who earns more? You can&apos;t tell without converting to the same scale!
        </p>
        <p className="mt-2 text-sm opacity-80">
          TechRetail&apos;s features: price ($10-$500), reviews (1-5 stars), inventory (100-10,000 units).
          Without standardization, the model sees inventory as &quot;huge&quot; and reviews as &quot;tiny&quot;—
          even if reviews matter more for sales prediction.
        </p>
      </Callout>

      <h2>Effect of Alpha on Model</h2>

      <AlphaEffectDiagram />

      <Callout type="business" title="Business Analogy: The Control Dial">
        <p>
          Think of alpha (λ) as a dial that controls how much you trust the data vs your prior beliefs:
        </p>
        <ul className="mt-2">
          <li><strong>Alpha = 0:</strong> &quot;I completely trust the data. No prior beliefs.&quot; (OLS)</li>
          <li><strong>Alpha = 0.1:</strong> &quot;I mostly trust the data, but let&apos;s be a bit skeptical.&quot;</li>
          <li><strong>Alpha = 1.0:</strong> &quot;I&apos;m quite skeptical. Show me strong evidence.&quot;</li>
          <li><strong>Alpha = 10:</strong> &quot;I&apos;m very skeptical. Only the strongest signals survive.&quot;</li>
        </ul>
        <p className="mt-2 text-sm opacity-80">
          TechRetail uses LassoCV to automatically find the optimal alpha—the sweet spot where the model
          captures true patterns without fitting noise.
        </p>
      </Callout>

      <h2>Interactive Python Example</h2>

      <CodePlayground
        title="Understanding Regularization Effects"
        description="Explore how different alpha values affect coefficient magnitudes and feature selection"
        initialCode={`import numpy as np
from sklearn.linear_model import Lasso, Ridge
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

# Generate data with varying feature importance
np.random.seed(42)
X = np.random.randn(100, 5)
# True coefficients: [3, 2, 1, 0, 0] - last 2 are irrelevant
true_coef = np.array([3, 2, 1, 0, 0])
y = X @ true_coef + np.random.randn(100) * 0.5

# Proper train-test split with scaling
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)  # Fit AND transform
X_test_scaled = scaler.transform(X_test)        # Only transform!

print("True coefficients:", true_coef)
print("\\n" + "="*50)

# Test different alpha values
for alpha in [0.01, 0.1, 1.0]:
    lasso = Lasso(alpha=alpha, max_iter=10000)
    lasso.fit(X_train_scaled, y_train)

    print(f"\\nLasso (alpha={alpha}):")
    print(f"  Coefficients: {np.round(lasso.coef_, 3)}")
    print(f"  Non-zero: {np.sum(lasso.coef_ != 0)}")
    print(f"  Magnitude sum: {np.sum(np.abs(lasso.coef_)):.3f}")`}
      />

      <h2>Code Examples</h2>

      <h3>Complete Pipeline with Proper Scaling</h3>
      <CodeBlock language="python">{`from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.linear_model import Lasso
from sklearn.metrics import r2_score

# Create polynomial features (optional)
poly = PolynomialFeatures(degree=2, include_bias=False)
X_poly = poly.fit_transform(X)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X_poly, y, test_size=0.3, random_state=42
)

# Standardize - IMPORTANT: fit only on training data
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)  # fit + transform
X_test_scaled = scaler.transform(X_test)        # transform only

# Fit regularized model
lasso = Lasso(alpha=0.001, max_iter=10000)
lasso.fit(X_train_scaled, y_train)

# Predict and evaluate
y_pred = lasso.predict(X_test_scaled)
r2 = r2_score(y_test, y_pred)
print(f"R2 Score: {r2:.4f}")`}</CodeBlock>

      <h2>Common Mistakes to Avoid</h2>
      <p>
        Model interpretation requires proper scaling. Here are mistakes that lead to incorrect conclusions.
      </p>

      <h3>Mistake #1: Comparing Coefficients Without Scaling</h3>
      <p>
        Without standardization, coefficient magnitudes are meaningless for comparison.
        A coefficient of 0.001 might be more important than one of 100!
      </p>
      <InteractiveCode
        wrongCode={`# WRONG: Interpreting unscaled coefficients
# Features: price ($10-$500), rating (1-5)
model = Lasso(alpha=0.1)
model.fit(X_train, y_train)

# price coefficient: 0.05
# rating coefficient: 10.5
print("Rating is 210x more important than price!")
# WRONG! Coefficients aren't comparable`}
        rightCode={`# RIGHT: Scale first, then interpret
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)

model = Lasso(alpha=0.1)
model.fit(X_train_scaled, y_train)

# Now coefficients are comparable
# price coefficient: 2.1
# rating coefficient: 1.8
print("Price is slightly more important than rating")
# Correct interpretation`}
        wrongExplanation="Unscaled coefficients depend on feature units. Price in dollars vs rating in stars aren't comparable."
        rightExplanation="After scaling, both features have std=1. Coefficients now represent impact per standard deviation."
        exercise={module5Exercises[0]}
      />

      <h3>Mistake #2: Forgetting max_iter for Lasso</h3>
      <p>
        Lasso uses iterative optimization. With default iterations, it may not converge on complex data.
      </p>
      <InteractiveCode
        wrongCode={`# WRONG: Default max_iter might not converge
lasso = Lasso(alpha=0.01)
lasso.fit(X_train_scaled, y_train)
# ConvergenceWarning: Objective did not converge.
# You might want to increase the number of iterations.

# Results are unreliable!`}
        rightCode={`# RIGHT: Increase max_iter for convergence
lasso = Lasso(alpha=0.01, max_iter=10000)
lasso.fit(X_train_scaled, y_train)
# No warning - algorithm converged properly

# Or use LassoCV which handles this better
from sklearn.linear_model import LassoCV
lasso_cv = LassoCV(cv=5, max_iter=10000)
lasso_cv.fit(X_train_scaled, y_train)`}
        wrongExplanation="If optimization doesn't converge, coefficients are essentially random. Results are meaningless."
        rightExplanation="max_iter=10000 gives the algorithm enough iterations. Always check for convergence warnings!"
      />

      <h3>Mistake #3: Using Coefficients for Production Without Pipeline</h3>
      <p>
        In production, you need to apply the exact same preprocessing. Manual steps are error-prone.
      </p>
      <InteractiveCode
        wrongCode={`# WRONG: Manual steps for production
# Training
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
model = Lasso(alpha=0.1)
model.fit(X_train_scaled, y_train)

# Production - easy to forget a step!
def predict(new_data):
    # Oops, forgot to scale!
    return model.predict(new_data)
    # Or used wrong scaler
    # Or scaled with fit_transform`}
        rightCode={`# RIGHT: Pipeline for production
from sklearn.pipeline import Pipeline

pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model', Lasso(alpha=0.1, max_iter=10000))
])
pipeline.fit(X_train, y_train)

# Production - pipeline handles everything
def predict(new_data):
    return pipeline.predict(new_data)
# Scaler automatically applied correctly!`}
        wrongExplanation="Manual preprocessing in production is error-prone. One forgotten step ruins predictions."
        rightExplanation="Pipeline encapsulates all steps. Just call predict() and everything is applied correctly."
      />

      <h2>Quick Reference: Ridge vs Lasso</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[var(--secondary)]">
              <th className="p-3 text-left border border-[var(--border)]">Aspect</th>
              <th className="p-3 text-left border border-[var(--border)]">Ridge (L2)</th>
              <th className="p-3 text-left border border-[var(--border)]">Lasso (L1)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-[var(--border)]">Penalty</td>
              <td className="p-3 border border-[var(--border)]">Sum of squared coefficients</td>
              <td className="p-3 border border-[var(--border)]">Sum of absolute coefficients</td>
            </tr>
            <tr className="bg-[var(--secondary)]">
              <td className="p-3 border border-[var(--border)]">Coefficient behavior</td>
              <td className="p-3 border border-[var(--border)]">Shrinks toward zero</td>
              <td className="p-3 border border-[var(--border)]">Zeros out entirely</td>
            </tr>
            <tr>
              <td className="p-3 border border-[var(--border)]">Feature selection</td>
              <td className="p-3 border border-[var(--border)]">No</td>
              <td className="p-3 border border-[var(--border)]">Yes</td>
            </tr>
            <tr className="bg-[var(--secondary)]">
              <td className="p-3 border border-[var(--border)]">Geometric constraint</td>
              <td className="p-3 border border-[var(--border)]">Circle</td>
              <td className="p-3 border border-[var(--border)]">Diamond</td>
            </tr>
            <tr>
              <td className="p-3 border border-[var(--border)]">Prior distribution</td>
              <td className="p-3 border border-[var(--border)]">Gaussian</td>
              <td className="p-3 border border-[var(--border)]">Laplacian</td>
            </tr>
            <tr className="bg-[var(--secondary)]">
              <td className="p-3 border border-[var(--border)]">Computational speed</td>
              <td className="p-3 border border-[var(--border)]">Faster (closed-form)</td>
              <td className="p-3 border border-[var(--border)]">Slower (gradient descent)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Practice: Choose the Right Gradient Descent</h2>
      <p>
        Different data sizes and scenarios call for different gradient descent strategies.
        Test your understanding of when to use batch, stochastic, or mini-batch gradient descent!
      </p>

      <CoefficientMatchingGame />

      <MustKnow
        moduleNumber={5}
        title="Absolute Must-Know: Deep Dive into Regularization"
        tldr="Three views of regularization: analytical (smaller coefs = simpler), geometric (circle vs diamond), probabilistic (priors on coefficients). StandardScaler is mandatory."
        items={[
          {
            concept: "Geometric View: Circle (Ridge) vs Diamond (Lasso)",
            whyItMatters: "Lasso's diamond has sharp corners on the axes. Cost function contours are more likely to hit corners = coefficients become exactly zero. Ridge's circle has no corners = no exact zeros.",
            analogy: "Imagine rolling a ball into a room. In a circular room (Ridge), it can stop anywhere along the wall. In a diamond room (Lasso), it naturally slides into corners."
          },
          {
            concept: "Probabilistic View: Regularization = Prior Beliefs",
            whyItMatters: "Regularization is like saying 'I believe most coefficients should be small/zero.' Data can override this belief, but only with strong evidence.",
            analogy: "Ridge = mild skeptic: 'Probably small.' Lasso = strong skeptic: 'Probably zero, prove me wrong.'",
            codeSnippet: "# Ridge assumes Gaussian prior (bell curve)\n# Lasso assumes Laplacian prior (sharp peak at 0)"
          },
          {
            concept: "StandardScaler: z = (x - mean) / std",
            whyItMatters: "After scaling, all features have mean=0 and std=1. Now a coefficient of 2.0 means '2 standard deviations of X → 2.0 units of y' regardless of original scale.",
            analogy: "Converting all currencies to USD before comparing prices. Now $100 actually means the same thing everywhere.",
            codeSnippet: "scaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)\nX_test_scaled = scaler.transform(X_test)  # Same params!"
          },
          {
            concept: "Interpreting Scaled Coefficients",
            whyItMatters: "After standardization, larger |coefficient| = more important feature. A coef of 0.8 vs 0.2 means the first feature has 4x the impact per standard deviation.",
            analogy: "It's like asking 'How much does each ingredient affect the taste?' Now you can compare salt to sugar fairly."
          },
          {
            concept: "The Complete ML Regression Pipeline",
            whyItMatters: "This is the production-ready workflow. Memorize this pattern—it applies to almost every ML project.",
            codeSnippet: "# 1. Split data\nX_train, X_test, y_train, y_test = train_test_split(...)\n\n# 2. Build pipeline\npipe = Pipeline([('poly', PolynomialFeatures()),\n                 ('scale', StandardScaler()),\n                 ('model', LassoCV(cv=5))])\n\n# 3. Fit and evaluate\npipe.fit(X_train, y_train)\nprint(f'R² = {pipe.score(X_test, y_test):.3f}')"
          }
        ]}
      />

      <h2>Key Takeaways</h2>

      <Callout type="info" title="Summary">
        <ul>
          <li><strong>Regularization is essential for generalization:</strong> It prevents overfitting by constraining coefficient magnitudes.</li>
          <li><strong>Always standardize features:</strong> Without standardization, features on larger scales receive unfair penalties.</li>
          <li><strong>Lasso enables feature selection:</strong> Due to its diamond-shaped constraint, Lasso naturally zeros out coefficients.</li>
          <li><strong>Proper train-test splitting:</strong> Always fit the scaler on training data only, then use those parameters for test data.</li>
          <li><strong>Alpha controls bias-variance:</strong> Higher alpha = simpler model, higher bias, lower variance.</li>
        </ul>
      </Callout>

      <Callout type="business" title="TechRetail's Journey Complete!">
        <p>
          TechRetail&apos;s data science team has come full circle. Here&apos;s what they built:
        </p>
        <ul className="mt-2">
          <li><strong>Module 1:</strong> Understood ML basics and chose regression for sales prediction</li>
          <li><strong>Module 2:</strong> Learned to properly split data to avoid &quot;cheating&quot;</li>
          <li><strong>Module 3:</strong> Used cross-validation for reliable performance estimates</li>
          <li><strong>Module 4:</strong> Applied Lasso to eliminate 28 useless features</li>
          <li><strong>Module 5:</strong> Properly scaled features so coefficients are interpretable</li>
        </ul>
        <p className="mt-2">
          <strong>Final model:</strong> A Lasso regression with 22 features, polynomial degree 2, and alpha=0.1
          (found via LassoCV). CV R² = 0.81, with interpretable coefficients that the CEO can understand.
        </p>
        <p className="mt-2 font-semibold text-[var(--accent)]">
          Congratulations—you now have the same knowledge as TechRetail&apos;s data science team!
        </p>
      </Callout>
    </>
  );
}
