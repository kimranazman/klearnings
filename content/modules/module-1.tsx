"use client";

import { CodePlayground } from "@/components/code/CodePlayground";
import { Callout } from "@/components/mdx/Callout";
import { CodeBlock } from "@/components/mdx/CodeBlock";
import { Formula } from "@/components/mdx/Formula";
import { MustKnow } from "@/components/mdx/MustKnow";
import { SupervisedLearningDiagram } from "@/components/mdx/diagrams";
import { PredictionGame } from "@/components/games";

export default function Module1Content() {
  return (
    <>
      <h2>Module Overview</h2>
      <p>
        This module introduces the foundations of supervised machine learning with a focus on linear regression.
        It covers the distinction between machine learning and traditional statistical modeling, explains the
        difference between regression and classification tasks, and walks through the practical implementation
        of linear regression using scikit-learn.
      </p>

      <Callout type="business" title="Meet TechRetail: Your Learning Companion">
        <p>
          Throughout this course, we&apos;ll follow <strong>TechRetail</strong>, an e-commerce company trying to
          predict product sales. Their data science team faces real challenges that mirror what you&apos;ll learn
          in each module. By the end, you&apos;ll understand exactly how they built their sales prediction system.
        </p>
      </Callout>

      <h2>Key Concepts</h2>

      <h3>1. Machine Learning vs Traditional Statistical Modeling</h3>
      <ul>
        <li><strong>Traditional modeling:</strong> We know the underlying process and choose a model that approximates it</li>
        <li><strong>Machine learning:</strong> We approximate the equation directly from data when the process is unknown or too complex</li>
      </ul>

      <Callout type="business" title="Business Analogy: Recipe vs Reverse-Engineering">
        <p>
          <strong>Traditional modeling</strong> is like cooking from a recipe. You know the exact steps:
          &quot;Add 2 cups flour, 1 egg, bake at 350°F.&quot; The process is known.
        </p>
        <p className="mt-2">
          <strong>Machine learning</strong> is like being a food scientist trying to recreate a competitor&apos;s
          secret sauce. You don&apos;t know the recipe, but you have 1000 samples. You taste them, measure
          ingredients, and figure out the formula from the data.
        </p>
        <p className="mt-2 text-sm opacity-80">
          TechRetail doesn&apos;t have a formula for &quot;what makes a product sell well.&quot; They have data
          (price, reviews, category) and outcomes (sales). ML helps them discover the hidden recipe.
        </p>
      </Callout>

      <h3>2. Parameters vs Hyperparameters</h3>
      <ul>
        <li><strong>Parameters (fit parameters):</strong> Estimated from the data during training (e.g., regression coefficients β₀, β₁)</li>
        <li><strong>Hyperparameters:</strong> Decisions made before fitting the model; tweaks not learned directly by the model</li>
      </ul>

      <Callout type="business" title="Business Analogy: Factory Settings">
        <p>
          Think of building a car factory:
        </p>
        <ul className="mt-2 space-y-1">
          <li><strong>Hyperparameters</strong> = Decisions made BEFORE production: &quot;Use 18-inch wheels, install a V6 engine.&quot; You choose these upfront.</li>
          <li><strong>Parameters</strong> = Measurements AFTER production: &quot;This specific car weighs 3,847 lbs, has 0.003mm tolerance.&quot; The factory &quot;learns&quot; these.</li>
        </ul>
        <p className="mt-2 text-sm opacity-80">
          At TechRetail, hyperparameters might be: &quot;Use polynomial degree 2&quot; or &quot;Set regularization to 0.1.&quot;
          Parameters are what the model discovers: &quot;Each 5-star review adds $12 to expected sales.&quot;
        </p>
      </Callout>

      <h3>3. Regression vs Classification</h3>
      <ul>
        <li><strong>Regression:</strong> Predicting a continuous numeric value (stock price, revenue, housing price)</li>
        <li><strong>Classification:</strong> Predicting a categorical outcome (spam/not spam, churn/no churn, fraud detection)</li>
      </ul>

      <Callout type="business" title="Business Analogy: Different Questions, Different Answers">
        <p>
          <strong>Regression</strong> answers &quot;How much?&quot; or &quot;How many?&quot;
        </p>
        <ul className="mt-1">
          <li>&quot;How much revenue will this product generate?&quot; → $15,432</li>
          <li>&quot;How many units will we sell?&quot; → 847 units</li>
        </ul>
        <p className="mt-2">
          <strong>Classification</strong> answers &quot;Which category?&quot; or &quot;Yes or No?&quot;
        </p>
        <ul className="mt-1">
          <li>&quot;Will this customer churn?&quot; → Yes/No</li>
          <li>&quot;Is this transaction fraudulent?&quot; → Fraud/Legitimate</li>
        </ul>
        <p className="mt-2 text-sm opacity-80">
          TechRetail uses regression to predict sales amounts and classification to predict if a product will be a &quot;hit&quot; or &quot;flop.&quot;
        </p>
      </Callout>

      <Callout type="tip" title="Remember">
        Choose your objective wisely - decide upfront whether interpretation or prediction is more important
        for your business problem; this affects model selection and complexity.
      </Callout>

      <h3>4. Loss Function / Cost Function</h3>
      <p>
        A quantitative score measuring how good predictions are. The goal is to minimize the difference
        between predicted (ŷ) and actual (y) values.
      </p>

      <Callout type="business" title="Business Analogy: The Penalty System">
        <p>
          Imagine you&apos;re a sales forecaster at TechRetail. Your boss has a penalty system:
        </p>
        <ul className="mt-2">
          <li>Predict sales of $100K, actual was $90K → You were off by $10K</li>
          <li>Predict sales of $100K, actual was $50K → You were off by $50K</li>
        </ul>
        <p className="mt-2">
          The <strong>loss function</strong> is how your boss calculates your &quot;penalty score.&quot;
          Different penalty systems (loss functions) emphasize different things. MSE penalizes big
          mistakes much more than small ones.
        </p>
      </Callout>

      <h3>5. Mean Squared Error (MSE)</h3>
      <p>
        The average of squared differences between predictions and actual values. This is the most popular
        cost function for linear regression.
      </p>

      <Callout type="business" title="Business Analogy: Why &quot;Squared&quot; Matters">
        <p>
          MSE squares the errors. Why? Because in business, <strong>being very wrong is worse than being slightly wrong</strong>:
        </p>
        <ul className="mt-2">
          <li>Predicting sales off by $10K → Penalty = 100 (10² = 100)</li>
          <li>Predicting sales off by $50K → Penalty = 2,500 (50² = 2,500)</li>
        </ul>
        <p className="mt-2">
          The 5x bigger error gets a 25x bigger penalty! This makes sense: ordering 50K extra units is
          catastrophically worse than ordering 10K extra. Squaring captures this business reality.
        </p>
      </Callout>

      <h3>6. R-squared (Coefficient of Determination)</h3>
      <ul>
        <li>Measures explained variance by the model</li>
        <li>Range: 0 to 1 (closer to 1 is better)</li>
        <li>Caution: Can be &quot;gamed&quot; by adding more features</li>
      </ul>

      <Callout type="business" title="Business Analogy: The Explanation Score">
        <p>
          R² tells you what percentage of sales variation your model explains:
        </p>
        <ul className="mt-2">
          <li><strong>R² = 0.85</strong> → Your model explains 85% of why sales go up or down</li>
          <li><strong>R² = 0.15</strong> → Your model only explains 15% — external factors dominate</li>
        </ul>
        <p className="mt-2">
          At TechRetail, if R² = 0.85, then 85% of sales variation is explained by price, reviews,
          and category. The remaining 15% is noise — viral tweets, weather, random chance.
        </p>
      </Callout>

      <h2>Core Formulas</h2>

      <h3>Linear Regression Model</h3>
      <Formula block>{"\\hat{y} = \\beta_0 + \\beta_1 x"}</Formula>
      <p className="text-sm text-[var(--muted)] mt-2">
        Where: <strong>β₀</strong> = intercept (y value when x = 0), <strong>β₁</strong> = slope (change in y for each unit increase in x), <strong>x</strong> = input feature
      </p>

      <h3>Mean Squared Error (MSE)</h3>
      <Formula block>{"\\text{MSE} = \\frac{1}{m} \\sum_{i=1}^{m} (\\hat{y}_i - y_i)^2"}</Formula>
      <p className="text-sm text-[var(--muted)] mt-2">
        Where: <strong>m</strong> = number of observations. Note: Often written as 1/(2m) for calculus convenience.
      </p>

      <h3>R-squared</h3>
      <Formula block>{"R^2 = 1 - \\frac{\\text{SSE}}{\\text{SST}} = 1 - \\frac{\\sum_{i=1}^{m}(y_i - \\hat{y}_i)^2}{\\sum_{i=1}^{m}(y_i - \\bar{y})^2}"}</Formula>
      <p className="text-sm text-[var(--muted)] mt-2">
        Where: <strong>SSE</strong> = Sum of Squared Errors, <strong>SST</strong> = Total Sum of Squares, <strong>ȳ</strong> = mean of y values
      </p>

      <h2>Supervised Learning Workflow</h2>

      <SupervisedLearningDiagram />

      <Callout type="business" title="TechRetail&apos;s Workflow">
        <ol className="space-y-2">
          <li><strong>Training Phase:</strong> TechRetail feeds 3 years of historical sales data (with known outcomes) into the model.</li>
          <li><strong>Model Fitting:</strong> The algorithm discovers patterns: &quot;Products with 4+ stars sell 2.3x more.&quot;</li>
          <li><strong>Prediction Phase:</strong> For new products, the model predicts sales before launch.</li>
          <li><strong>Evaluation:</strong> After launch, compare predictions vs actual sales to measure accuracy.</li>
        </ol>
      </Callout>

      <h2>Interactive Python Example</h2>

      <p>Try running this example to see linear regression in action:</p>

      <CodePlayground
        title="Basic Linear Regression"
        description="This example demonstrates fitting a linear regression model to sample data"
        initialCode={`import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_squared_error

# Generate sample data
np.random.seed(42)
X = np.random.rand(100, 1) * 10  # Feature
y = 2.5 * X.flatten() + 5 + np.random.randn(100) * 2  # Target with noise

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# Create and fit model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate
r2 = r2_score(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)

print(f"Intercept (β₀): {model.intercept_:.4f}")
print(f"Slope (β₁): {model.coef_[0]:.4f}")
print(f"R-squared: {r2:.4f}")
print(f"MSE: {mse:.4f}")`}
      />

      <h2>Key scikit-learn Patterns</h2>

      <CodeBlock language="python">{`# Predictor pattern (has .fit() and .predict())
model = LinearRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)

# Transformer pattern (has .fit() and .transform())
scaler = StandardScaler()
scaler.fit(X_train)
X_scaled = scaler.transform(X_train)

# Combined fit_transform (for training data only)
X_train_scaled = scaler.fit_transform(X_train)`}</CodeBlock>

      <h2>Practice: Guess the Regression Line</h2>
      <p>
        Test your intuition! Look at scatter plots and try to guess the slope and intercept
        of the best-fit line. This game helps you develop an intuitive understanding of how
        linear regression works.
      </p>

      <PredictionGame />

      <MustKnow
        moduleNumber={1}
        title="Absolute Must-Know: Linear Regression Foundations"
        tldr="Supervised learning needs labeled data (X, y pairs). Use MSE to measure errors and R² to measure explained variance. Linear regression finds the best-fit line: y = β₀ + β₁x"
        items={[
          {
            concept: "Supervised Learning = Learning from Examples with Answers",
            whyItMatters: "You CANNOT train a model without historical data that includes both inputs AND outcomes. No labels = no supervised learning.",
            analogy: "It's like studying for an exam with a textbook that has answers in the back. Without answers, you can't check if you're learning correctly.",
            codeSnippet: "model.fit(X_train, y_train)  # X=features, y=answers"
          },
          {
            concept: "Regression = Predicting Numbers, Classification = Predicting Categories",
            whyItMatters: "Using the wrong type leads to meaningless results. You can't use classification for 'predict sales in dollars' or regression for 'spam or not spam'.",
            analogy: "Regression: 'How much will it cost?' → $47.50. Classification: 'Will they buy?' → Yes/No. Different questions, different tools."
          },
          {
            concept: "MSE (Mean Squared Error) - Your Prediction Penalty Score",
            whyItMatters: "MSE tells you how wrong your predictions are on average. Lower = better. It squares errors so big mistakes hurt MORE than small ones.",
            analogy: "Missing a sales forecast by $50K is not just 5x worse than $10K—it's 25x worse in MSE terms. Big mistakes are catastrophic.",
            codeSnippet: "MSE = (1/n) * Σ(predicted - actual)²"
          },
          {
            concept: "R² (R-Squared) - How Much Your Model Explains",
            whyItMatters: "R²=0.85 means your model explains 85% of the variation. The remaining 15% is noise or factors you didn't include.",
            analogy: "If R²=0.85, you've captured 85% of why sales go up or down. The other 15%? Random tweets, weather, cosmic rays—things you can't predict.",
            codeSnippet: "R² ranges from 0 (useless) to 1 (perfect)"
          },
          {
            concept: "The sklearn Pattern: fit() then predict()",
            whyItMatters: "Every sklearn model follows this pattern. Master it once, use it everywhere—Linear Regression, Random Forest, Neural Networks, all the same.",
            analogy: "fit() = studying for the exam. predict() = taking the exam. You must study first!",
            codeSnippet: "model.fit(X_train, y_train)\npredictions = model.predict(X_test)"
          }
        ]}
      />

      <h2>Key Takeaways</h2>

      <Callout type="info" title="Summary">
        <ul>
          <li><strong>Supervised learning requires labeled data</strong> - You need historical data with known outcomes (X, y pairs) to train a model.</li>
          <li><strong>Always split your data</strong> - Use train/test splits to avoid overfitting. Train on ~70% and evaluate on ~30%.</li>
          <li><strong>Transformations can improve results</strong> - Normalizing your target variable can lead to better performance.</li>
          <li><strong>Apply transformations consistently</strong> - When transforming training data, apply the same parameters to test data.</li>
        </ul>
      </Callout>

      <Callout type="business" title="TechRetail&apos;s Module 1 Progress">
        <p>
          TechRetail&apos;s data science team now understands the basics. They know they need:
        </p>
        <ul className="mt-2">
          <li>Historical sales data with known outcomes (supervised learning)</li>
          <li>To predict sales amounts (regression, not classification)</li>
          <li>To measure success with MSE and R²</li>
        </ul>
        <p className="mt-2">
          <strong>Next challenge:</strong> How do they avoid &quot;cheating&quot; by testing on training data?
          That&apos;s what Module 2 solves with train-test splits!
        </p>
      </Callout>
    </>
  );
}
