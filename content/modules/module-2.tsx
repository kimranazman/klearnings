"use client";

import { CodePlayground } from "@/components/code/CodePlayground";
import { InteractiveCode } from "@/components/code/InteractiveCode";
import { Callout } from "@/components/mdx/Callout";
import { CodeBlock } from "@/components/mdx/CodeBlock";
import { Formula } from "@/components/mdx/Formula";
import { MustKnow } from "@/components/mdx/MustKnow";
import { TrainTestSplitDiagram, BiasVarianceDiagram, OneHotEncodingDiagram } from "@/components/mdx/diagrams";
import { DataLeakageGame } from "@/components/games";
import { module2Exercises } from "@/lib/code-exercise-data";

export default function Module2Content() {
  return (
    <>
      <h2>Module Overview</h2>
      <p>
        This module covers the essential concepts of splitting data into training and test sets for model
        validation, cross-validation approaches, and the relationship between model complexity and error.
        It also introduces polynomial regression as a method to capture nonlinear relationships while still
        using linear models.
      </p>

      <Callout type="business" title="TechRetail's Challenge: The Final Exam Problem">
        <p>
          TechRetail&apos;s data science team built their first model and got an R² of 0.95 on their sales data.
          They were excited—until they deployed it, and predictions were terrible. What went wrong?
        </p>
        <p className="mt-2 text-sm opacity-80">
          They had been &quot;cheating&quot; by testing on the same data they trained on. It&apos;s like a student
          who memorizes test answers but can&apos;t solve new problems. This module solves that problem.
        </p>
      </Callout>

      <h2>Key Concepts</h2>

      <h3>1. Train-Test Split</h3>
      <p>
        The practice of dividing your dataset into two portions: one for training the model (learning parameters)
        and one for testing (evaluating performance on unseen data). This ensures the model generalizes well to
        new situations.
      </p>

      <Callout type="business" title="Business Analogy: The Final Exam">
        <p>
          <strong>Training set</strong> = Homework and practice problems. Students learn from these.
        </p>
        <p className="mt-2">
          <strong>Test set</strong> = The final exam with new questions. It reveals if they truly understand
          or just memorized.
        </p>
        <p className="mt-2 text-sm opacity-80">
          TechRetail now keeps 30% of historical sales data locked away. Their model &quot;studies&quot; on 70%,
          then takes the &quot;final exam&quot; on the remaining 30%. If it scores well on both, they know
          it truly learned the patterns.
        </p>
      </Callout>

      <h3>2. Data Leakage</h3>
      <p>
        When information from the test set inadvertently influences the training process, leading to overly
        optimistic performance estimates. Training and test sets must remain completely independent.
      </p>

      <Callout type="business" title="Business Analogy: Insider Trading">
        <p>
          Data leakage is like insider trading in the stock market. If you know tomorrow&apos;s news today,
          of course you can &quot;predict&quot; stock movements—but that&apos;s not real prediction skill.
        </p>
        <p className="mt-2">
          Common leaks at TechRetail:
        </p>
        <ul className="mt-1">
          <li>Scaling using all data (reveals test set statistics)</li>
          <li>Feature selection using all data</li>
          <li>Using future data to predict past events</li>
        </ul>
      </Callout>

      <Callout type="warning" title="Important">
        Data leakage is one of the most common mistakes in machine learning. Always ensure your test data
        is completely separate from your training process!
      </Callout>

      <h3>3. One-Hot Encoding</h3>
      <p>
        A technique to convert categorical (string) variables into numerical format by creating binary columns
        for each category. The number of new columns is n-1, where n is the number of unique categories.
      </p>

      <Callout type="business" title="Business Analogy: The Checklist">
        <p>
          Imagine TechRetail&apos;s product categories: Electronics, Clothing, Home. Computers can&apos;t
          understand &quot;Electronics&quot; directly—they need numbers.
        </p>
        <p className="mt-2">
          One-hot encoding creates a checklist: &quot;Is it Electronics? Yes/No. Is it Clothing? Yes/No.&quot;
          Each product gets checkmarks (1s and 0s) that the model can process mathematically.
        </p>
      </Callout>

      <h3>4. Multicollinearity</h3>
      <p>
        When features are highly correlated with each other, causing issues with model interpretability.
        In one-hot encoding, dropping one category (drop=&apos;first&apos;) prevents this issue.
      </p>

      <h3>5. Overfitting vs Underfitting</h3>
      <ul>
        <li><strong>Overfitting:</strong> Model is too complex, fits training data perfectly but performs poorly on test data</li>
        <li><strong>Underfitting:</strong> Model is too simple, fails to capture the underlying patterns in the data</li>
      </ul>

      <Callout type="business" title="Business Analogy: The Restaurant Menu">
        <p>
          <strong>Underfitting</strong> = A restaurant with only one dish. &quot;We serve food.&quot;
          Too generic—doesn&apos;t satisfy specific customer tastes.
        </p>
        <p className="mt-2">
          <strong>Overfitting</strong> = A restaurant that memorizes every customer&apos;s exact order history.
          Works for regulars, but fails when a new customer walks in.
        </p>
        <p className="mt-2">
          <strong>Just Right</strong> = A restaurant with a varied menu based on common preferences.
          Serves most customers well, including new ones.
        </p>
        <p className="mt-2 text-sm opacity-80">
          TechRetail&apos;s model should learn &quot;products with good reviews sell better&quot; (general pattern),
          not &quot;Product #4523 sold 847 units on March 15th&quot; (memorized noise).
        </p>
      </Callout>

      <h3>6. Polynomial Features</h3>
      <p>
        Creating new features by raising existing features to powers (x², x³) or creating interaction terms (x₁ × x₂),
        allowing linear regression to capture nonlinear relationships.
      </p>

      <Callout type="business" title="Business Analogy: Diminishing Returns">
        <p>
          Some relationships aren&apos;t straight lines. At TechRetail, advertising spend has diminishing returns:
        </p>
        <ul className="mt-2">
          <li>$1K → $5K in extra sales (5x return)</li>
          <li>$10K → $30K in extra sales (3x return)</li>
          <li>$100K → $150K in extra sales (1.5x return)</li>
        </ul>
        <p className="mt-2">
          A linear model can&apos;t capture this curve. Adding ad_spend² as a feature lets the model
          understand the &quot;saturation effect&quot; where more spending yields less additional benefit.
        </p>
      </Callout>

      <h2>Core Formulas</h2>

      <h3>Polynomial Regression (Degree 2)</h3>
      <Formula block>{"y = \\beta_0 + \\beta_1 x + \\beta_2 x^2"}</Formula>

      <h3>Standard Scaler (Z-score Normalization)</h3>
      <Formula block>{"z = \\frac{x - \\mu}{\\sigma}"}</Formula>
      <p className="text-sm text-[var(--muted)] mt-2">
        Where: <strong>μ</strong> = mean, <strong>σ</strong> = standard deviation
      </p>

      <h3>MinMax Scaler</h3>
      <Formula block>{"x_{\\text{scaled}} = \\frac{x - x_{\\text{min}}}{x_{\\text{max}} - x_{\\text{min}}}"}</Formula>

      <h2>Train-Test Split Process</h2>

      <TrainTestSplitDiagram />

      <h2>Overfitting vs Underfitting</h2>

      <BiasVarianceDiagram />

      <Callout type="tip" title="Reading the Bias-Variance Curve">
        <ul>
          <li><strong>Left side (Underfitting):</strong> Both training and test error are high. Model is too simple.</li>
          <li><strong>Middle (Sweet Spot):</strong> Test error is minimized. This is your target complexity.</li>
          <li><strong>Right side (Overfitting):</strong> Training error keeps dropping, but test error rises. Model memorizes noise.</li>
        </ul>
      </Callout>

      <h2>Interactive Python Example</h2>

      <CodePlayground
        title="Train-Test Split and Polynomial Features"
        description="Demonstrates data splitting, polynomial features, and evaluating model performance"
        initialCode={`import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Generate nonlinear data
np.random.seed(42)
X = np.linspace(0, 10, 100).reshape(-1, 1)
y = 0.5 * X.flatten()**2 - 2*X.flatten() + 3 + np.random.randn(100) * 2

# Split data (70% train, 30% test)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# Create polynomial features (degree 2)
poly = PolynomialFeatures(degree=2)
X_train_poly = poly.fit_transform(X_train)
X_test_poly = poly.transform(X_test)  # Only transform!

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train_poly)
X_test_scaled = scaler.transform(X_test_poly)  # Only transform!

# Fit model
model = LinearRegression()
model.fit(X_train_scaled, y_train)

# Evaluate
train_pred = model.predict(X_train_scaled)
test_pred = model.predict(X_test_scaled)

print(f"Training R²: {r2_score(y_train, train_pred):.4f}")
print(f"Test R²: {r2_score(y_test, test_pred):.4f}")
print(f"Training MSE: {mean_squared_error(y_train, train_pred):.4f}")
print(f"Test MSE: {mean_squared_error(y_test, test_pred):.4f}")`}
      />

      <h2>One-Hot Encoding Example</h2>

      <CodeBlock language="python">{`from sklearn.preprocessing import OneHotEncoder

# Initialize encoder (drop='first' for interpretability)
ohc = OneHotEncoder(drop='first')

# Fit and transform categorical column
# Note: Use double brackets [[]] to maintain 2D shape
encoded_data = ohc.fit_transform(data[['category_column']])

# Get category names
category_names = ohc.categories_[0]`}</CodeBlock>

      <OneHotEncodingDiagram />

      <h2>Common Mistakes to Avoid</h2>
      <p>
        Data leakage is subtle and dangerous. Here are the most common mistakes that even AI-generated code often makes.
      </p>

      <h3>Mistake #1: Using fit_transform on Test Data</h3>
      <p>
        This is the #1 data leakage mistake. When you fit on test data, you&apos;re using &quot;future information&quot;
        that your model shouldn&apos;t have access to.
      </p>
      <InteractiveCode
        wrongCode={`# WRONG: fit_transform on test data = LEAKAGE!
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.fit_transform(X_test)  # BUG!
# Test data now has its own mean/std, not train's`}
        rightCode={`# RIGHT: fit on train, transform on test
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)  # Correct!
# Test data uses train's mean/std`}
        wrongExplanation="fit_transform() learns new parameters from test data. In production, you won't have test data to 'fit' on!"
        rightExplanation="transform() applies parameters learned from training. This simulates real production conditions."
        exercise={module2Exercises[0]}
      />

      <h3>Mistake #2: Scaling Before Splitting</h3>
      <p>
        If you scale all data first, the test set&apos;s statistics influence the training set&apos;s scaling.
        This is subtle but harmful leakage.
      </p>
      <InteractiveCode
        wrongCode={`# WRONG: Scaling before splitting = LEAKAGE!
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)  # Uses ALL data
X_train, X_test = train_test_split(X_scaled)
# Test data's mean/std leaked into training!`}
        rightCode={`# RIGHT: Split first, then scale
X_train, X_test = train_test_split(X)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
# Training and test are fully independent`}
        wrongExplanation="The scaler learns statistics from ALL data including test. Your training data now contains test information."
        rightExplanation="Split first, then fit transformers only on training data. This maintains true separation."
        exercise={module2Exercises[1]}
      />

      <h3>Mistake #3: Polynomial Features with Wrong Order</h3>
      <p>
        Polynomial features must also follow the fit/transform pattern. Apply them BEFORE scaling.
      </p>
      <InteractiveCode
        wrongCode={`# WRONG: Wrong order + fit_transform on test
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
poly = PolynomialFeatures(degree=2)
X_train_poly = poly.fit_transform(X_train_scaled)
X_test_poly = poly.fit_transform(X_test)  # Double bug!`}
        rightCode={`# RIGHT: Poly first, then scale, proper fit/transform
poly = PolynomialFeatures(degree=2)
X_train_poly = poly.fit_transform(X_train)
X_test_poly = poly.transform(X_test)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train_poly)
X_test_scaled = scaler.transform(X_test_poly)`}
        wrongExplanation="Wrong order and fit_transform on test data. This creates features differently for train vs test."
        rightExplanation="Polynomial features first, then scaling. Each step uses fit on train, transform on test."
        exercise={module2Exercises[2]}
      />

      <h3>Mistake #4: Forgetting to Encode Categorical Variables</h3>
      <p>
        Passing string data directly to models will crash or give meaningless results.
      </p>
      <InteractiveCode
        wrongCode={`# WRONG: Passing strings to model
data = pd.DataFrame({
    'category': ['A', 'B', 'A', 'C'],
    'value': [1, 2, 3, 4]
})
model.fit(data, y)  # Error or nonsense!
# ValueError: could not convert string`}
        rightCode={`# RIGHT: One-hot encode categories first
encoder = OneHotEncoder(drop='first', sparse_output=False)
categories = encoder.fit_transform(data[['category']])
X = np.hstack([categories, data[['value']].values])
model.fit(X, y)  # Works correctly`}
        wrongExplanation="Machine learning models need numbers. Strings like 'A', 'B', 'C' are meaningless to them."
        rightExplanation="One-hot encoding converts categories to binary columns (0s and 1s) that models can understand."
        exercise={module2Exercises[3]}
      />

      <h2>Practice: Spot the Data Leakage</h2>
      <p>
        Data leakage is one of the most common and dangerous mistakes in ML. Test your ability
        to identify leakage in code snippets. Can you spot when test data is influencing training?
      </p>

      <DataLeakageGame />

      <MustKnow
        moduleNumber={2}
        title="Absolute Must-Know: Train-Test Split & Data Leakage"
        tldr="ALWAYS split data BEFORE any processing. fit_transform() on train, transform() on test. Never let test data influence training—that's cheating."
        items={[
          {
            concept: "Train-Test Split is NON-NEGOTIABLE",
            whyItMatters: "Testing on training data gives fake high scores. Your model memorized answers instead of learning patterns. It will FAIL on new data.",
            analogy: "It's like grading a student using the exact questions they studied. Of course they score 100%—but give them a new exam and they fail.",
            codeSnippet: "X_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.3, random_state=42)"
          },
          {
            concept: "Data Leakage = Cheating (and You Will Get Caught)",
            whyItMatters: "Any information from test data that 'leaks' into training makes your metrics meaningless. In production, you won't have future data.",
            analogy: "It's insider trading. If you know tomorrow's news today, of course you can 'predict' stock prices—but that's not a real skill."
          },
          {
            concept: "fit_transform() vs transform() - The Critical Difference",
            whyItMatters: "fit_transform() learns parameters (mean, std) from data. Using it on test data leaks information. Test data must use parameters learned from training.",
            analogy: "fit_transform() = learn the grading rubric AND grade papers. transform() = grade papers using an already-learned rubric.",
            codeSnippet: "scaler.fit_transform(X_train)  # Learn + apply\nscaler.transform(X_test)        # Apply only!"
          },
          {
            concept: "Overfitting vs Underfitting - The Goldilocks Problem",
            whyItMatters: "Overfitting: training error low, test error high (memorized noise). Underfitting: both errors high (too simple). You want the sweet spot.",
            analogy: "Underfitting = 'All products sell the same.' Overfitting = 'Product #4523 sells exactly 847 units on Tuesdays in March.' Just right = 'Products with good reviews sell better.'"
          },
          {
            concept: "Polynomial Features Make Lines into Curves",
            whyItMatters: "Real relationships aren't always linear. x² lets you model curves (diminishing returns, saturation effects) while still using linear regression.",
            analogy: "A straight line can't capture 'more ads = more sales, but with diminishing returns.' Adding ad_spend² captures the curve.",
            codeSnippet: "poly = PolynomialFeatures(degree=2)\nX_poly = poly.fit_transform(X)"
          }
        ]}
      />

      <h2>Key Takeaways</h2>

      <Callout type="info" title="Summary">
        <ul>
          <li><strong>Always split your data</strong> into training and test sets before model fitting. Never evaluate performance on training data.</li>
          <li><strong>Watch for the complexity trade-off</strong>: More features can cause overfitting. A large gap between training and test error indicates overfitting.</li>
          <li><strong>Fit transformers only on training data</strong>: Use fit_transform() on training data but only transform() on test data.</li>
          <li><strong>Use double brackets [[]]</strong> when passing single columns to sklearn transformers.</li>
          <li><strong>Polynomial features enable nonlinear modeling</strong> while keeping the model linear in its parameters.</li>
        </ul>
      </Callout>

      <Callout type="business" title="TechRetail's Module 2 Progress">
        <p>
          TechRetail&apos;s team now properly splits their data 70/30. Their new test R² is 0.78—lower than the
          &quot;cheated&quot; 0.95, but this is a real measure of their model&apos;s ability to predict new products.
        </p>
        <p className="mt-2">
          They also discovered that polynomial features (price²) helped capture the &quot;luxury goods&quot; effect
          where very expensive items have different sales patterns.
        </p>
        <p className="mt-2">
          <strong>Next challenge:</strong> Is a 70/30 split reliable? What if they got &quot;lucky&quot; with which
          data ended up in the test set? Module 3 introduces cross-validation to solve this.
        </p>
      </Callout>
    </>
  );
}
