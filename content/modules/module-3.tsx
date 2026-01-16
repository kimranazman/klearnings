"use client";

import { CodePlayground } from "@/components/code/CodePlayground";
import { Callout } from "@/components/mdx/Callout";
import { CodeBlock } from "@/components/mdx/CodeBlock";
import { MustKnow } from "@/components/mdx/MustKnow";
import { KFoldDiagram, PipelineDiagram, GridSearchDiagram } from "@/components/mdx/diagrams";
import { PipelineBuilderGame } from "@/components/games";

export default function Module3Content() {
  return (
    <>
      <h2>Module Overview</h2>
      <p>
        This module covers cross-validation techniques for evaluating machine learning models more reliably
        than single train-test splits. You&apos;ll learn to use K-fold cross-validation, build preprocessing
        pipelines, and perform hyperparameter tuning using GridSearchCV to find optimal model complexity.
      </p>

      <Callout type="business" title="TechRetail's Challenge: The Lucky Split Problem">
        <p>
          TechRetail&apos;s team got an R² of 0.78 on their test set. But when they repeated the experiment
          with a different random split, they got 0.65. Another time, 0.82. Which score should they trust?
        </p>
        <p className="mt-2 text-sm opacity-80">
          A single train-test split can give misleading results depending on which data points end up where.
          This module introduces cross-validation to get reliable, reproducible performance estimates.
        </p>
      </Callout>

      <h2>Key Concepts</h2>

      <h3>1. Cross-Validation</h3>
      <p>
        Using multiple train-validation splits instead of a single train-test split to get a more
        statistically significant performance measure. Averages error scores across all splits to
        provide a comprehensive picture of model performance.
      </p>

      <Callout type="business" title="Business Analogy: Multiple Job Interviews">
        <p>
          A single train-test split is like having one job interviewer. Maybe you clicked with them,
          maybe not—it&apos;s not representative of your actual ability.
        </p>
        <p className="mt-2">
          <strong>Cross-validation</strong> is like being interviewed by 5 different managers. Your average
          score across all interviews is a much more reliable indicator of your skills.
        </p>
        <p className="mt-2 text-sm opacity-80">
          TechRetail now tests their model against 5 different &quot;panels of judges&quot; (K=5 folds).
          The average score across all panels is the number they report to leadership.
        </p>
      </Callout>

      <h3>2. K-Fold Cross-Validation</h3>
      <p>
        Splits data into K non-overlapping validation sets (folds). Each fold serves as a validation
        set once while remaining K-1 folds are used for training. Common values: K=4, K=10.
      </p>

      <h3>3. Stratified K-Fold</h3>
      <p>
        Ensures each fold maintains the same proportion of target classes as the original dataset
        (e.g., 80% true, 20% false in each split). Important for imbalanced datasets.
      </p>

      <Callout type="tip" title="Best Practice">
        Always use cross-validation instead of a single train-test split to get reliable performance
        estimates and avoid lucky/unlucky splits.
      </Callout>

      <h3>4. Pipeline</h3>
      <p>
        Chains multiple preprocessing and modeling steps together. Each step must have a fit method;
        all steps except the last must have fit_transform. Ensures proper data flow and prevents data leakage.
      </p>

      <Callout type="business" title="Business Analogy: The Assembly Line">
        <p>
          Think of a car factory assembly line:
        </p>
        <ul className="mt-2">
          <li><strong>Station 1:</strong> Install engine (PolynomialFeatures)</li>
          <li><strong>Station 2:</strong> Paint job (StandardScaler)</li>
          <li><strong>Station 3:</strong> Final inspection (Ridge/Lasso model)</li>
        </ul>
        <p className="mt-2">
          Each car must pass through all stations in order. You can&apos;t paint before installing the engine.
          A pipeline ensures every data point goes through the same sequence of transformations.
        </p>
        <p className="mt-2 text-sm opacity-80">
          TechRetail uses pipelines so that new products always get processed the same way their training
          data was processed—no accidental shortcuts or missed steps.
        </p>
      </Callout>

      <h3>5. GridSearchCV: Finding the Best Hyperparameters</h3>
      <p>
        Systematically tests all combinations of hyperparameters you specify, using cross-validation to
        evaluate each combination. Returns the best hyperparameters based on validation performance.
      </p>

      <Callout type="business" title="Business Analogy: Recipe Testing">
        <p>
          TechRetail&apos;s chef (data scientist) is perfecting a recipe. They want to test:
        </p>
        <ul className="mt-2">
          <li>Salt: [1 tsp, 2 tsp, 3 tsp]</li>
          <li>Cook time: [20 min, 30 min, 40 min]</li>
          <li>Temperature: [350°F, 400°F]</li>
        </ul>
        <p className="mt-2">
          GridSearchCV tests ALL combinations (3 × 3 × 2 = 18 recipes), has 5 taste testers rate each,
          and reports which combination got the highest average rating.
        </p>
        <p className="mt-2 text-sm opacity-80">
          For TechRetail, hyperparameters might be polynomial degree (1, 2, 3) and regularization strength
          (0.01, 0.1, 1.0). GridSearchCV finds the winning combination.
        </p>
      </Callout>

      <h2>K-Fold Cross-Validation Process</h2>

      <KFoldDiagram />

      <Callout type="info" title="How to Read This Diagram">
        <ul>
          <li>The dataset is split into K equal parts (folds)</li>
          <li>Each iteration uses a different fold as the test set</li>
          <li>Training happens on the remaining K-1 folds</li>
          <li>Final score is the average of all K iterations</li>
        </ul>
      </Callout>

      <h2>Pipeline Structure</h2>

      <PipelineDiagram />

      <h2>Hyperparameter Tuning Workflow</h2>

      <GridSearchDiagram />

      <Callout type="warning" title="GridSearchCV Computation Cost">
        <p>
          Be careful with large parameter grids! If you have 4 hyperparameters with 5 values each,
          that&apos;s 5⁴ = 625 combinations. With 5-fold CV, that&apos;s 3,125 model fits!
        </p>
        <p className="mt-2">
          Start with a coarse grid, then refine around the best parameters.
        </p>
      </Callout>

      <h2>Interactive Python Example</h2>

      <CodePlayground
        title="Cross-Validation with GridSearchCV"
        description="Demonstrates K-fold cross-validation and hyperparameter tuning"
        initialCode={`import numpy as np
from sklearn.model_selection import KFold, cross_val_score, GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.linear_model import Ridge

# Generate sample data
np.random.seed(42)
X = np.random.rand(100, 2) * 10
y = 0.5 * X[:, 0]**2 + 2 * X[:, 1] + np.random.randn(100) * 2

# Create pipeline
pipeline = Pipeline([
    ('poly', PolynomialFeatures()),
    ('scaler', StandardScaler()),
    ('ridge', Ridge())
])

# Define parameter grid
param_grid = {
    'poly__degree': [1, 2, 3],
    'ridge__alpha': [0.01, 0.1, 1.0, 10.0]
}

# Create K-Fold
kf = KFold(n_splits=5, shuffle=True, random_state=42)

# GridSearchCV
grid = GridSearchCV(pipeline, param_grid, cv=kf, scoring='r2')
grid.fit(X, y)

print(f"Best Score (R²): {grid.best_score_:.4f}")
print(f"Best Parameters: {grid.best_params_}")
print(f"\\nAll mean scores:")
for params, score in zip(grid.cv_results_['params'],
                          grid.cv_results_['mean_test_score']):
    print(f"  {params}: {score:.4f}")`}
      />

      <h2>Code Examples</h2>

      <h3>Basic K-Fold Cross-Validation</h3>
      <CodeBlock language="python">{`from sklearn.model_selection import KFold, cross_val_score
from sklearn.linear_model import LinearRegression

# Create KFold object
kf = KFold(n_splits=4, shuffle=True, random_state=42)

# Using cross_val_score
lr = LinearRegression()
scores = cross_val_score(lr, X, y, cv=4, scoring='neg_mean_squared_error')
print(f"Mean CV Score: {-scores.mean():.4f}")`}</CodeBlock>

      <h3>Pipeline with Preprocessing</h3>
      <CodeBlock language="python">{`from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.linear_model import Lasso

# Create pipeline
estimator = Pipeline([
    ('polynomial_features', PolynomialFeatures(degree=2)),
    ('scaler', StandardScaler()),
    ('lasso_regression', Lasso(alpha=0.01, max_iter=10000))
])

# Fit and predict
estimator.fit(X_train, y_train)
predictions = estimator.predict(X_test)`}</CodeBlock>

      <h3>Accessing Best Model Coefficients</h3>
      <CodeBlock language="python">{`# Get feature names from polynomial features
feature_names = grid.best_estimator_.named_steps['poly'].get_feature_names_out()

# Get coefficients from model
coefficients = grid.best_estimator_.named_steps['ridge'].coef_

# Create importance DataFrame
import pandas as pd
df_importances = pd.DataFrame(
    list(zip(feature_names, coefficients)),
    columns=['Feature', 'Coefficient']
).sort_values('Coefficient', key=abs, ascending=False)`}</CodeBlock>

      <h2>Practice: Build the Pipeline</h2>
      <p>
        ML pipelines must be assembled in the correct order. Test your understanding by
        arranging pipeline steps correctly. Remember: transformers before estimators,
        and the model is always last!
      </p>

      <PipelineBuilderGame />

      <MustKnow
        moduleNumber={3}
        title="Absolute Must-Know: Cross-Validation & Pipelines"
        tldr="Use K-fold CV for reliable scores (not lucky splits). Pipelines prevent leakage. GridSearchCV finds optimal hyperparameters automatically."
        items={[
          {
            concept: "K-Fold Cross-Validation = Multiple Test Runs for Confidence",
            whyItMatters: "A single train-test split can be lucky or unlucky. K-fold tests on K different splits and averages results. Your reported score is now reliable.",
            analogy: "One job interview might go great or terrible due to random factors. Five interviews with different managers? That average score actually means something.",
            codeSnippet: "scores = cross_val_score(model, X, y, cv=5)\nprint(f'R² = {scores.mean():.2f} ± {scores.std():.2f}')"
          },
          {
            concept: "Pipeline = Assembly Line That Prevents Mistakes",
            whyItMatters: "Pipelines chain preprocessing + model together. They guarantee test data goes through the exact same transformations as training data. No manual errors.",
            analogy: "An assembly line ensures every car gets engine, then paint, then inspection—in that order. A pipeline ensures every data point gets scaled, then polynomials, then model.",
            codeSnippet: "pipe = Pipeline([\n    ('poly', PolynomialFeatures()),\n    ('scale', StandardScaler()),\n    ('model', Ridge())\n])"
          },
          {
            concept: "GridSearchCV = Systematic Recipe Testing",
            whyItMatters: "Don't guess hyperparameters! GridSearchCV tests all combinations with CV, finds the best, and automatically refits on all data. Production-ready.",
            analogy: "Testing 3 salt levels × 3 temperatures × 3 cook times = 27 recipes. GridSearchCV tests all 27, picks the winner, and gives you the final recipe.",
            codeSnippet: "grid = GridSearchCV(pipe, param_grid, cv=5)\ngrid.fit(X, y)\nprint(grid.best_params_)"
          },
          {
            concept: "Hyperparameters vs Parameters - You Choose vs Model Learns",
            whyItMatters: "Parameters (coefficients) are learned by fit(). Hyperparameters (alpha, degree) are chosen by YOU before training. Wrong choices = bad model.",
            analogy: "Parameters = the answers on the exam (model figures out). Hyperparameters = which textbook to study from (you decide)."
          },
          {
            concept: "Pipeline Naming: step__parameter for GridSearchCV",
            whyItMatters: "To tune hyperparameters inside a pipeline, use double underscore: 'stepname__parametername'. This is how GridSearchCV accesses nested parameters.",
            codeSnippet: "param_grid = {\n    'poly__degree': [1, 2, 3],\n    'model__alpha': [0.01, 0.1, 1.0]\n}"
          }
        ]}
      />

      <h2>Key Takeaways</h2>

      <Callout type="info" title="Summary">
        <ul>
          <li><strong>Always use cross-validation</strong> instead of a single train-test split to get reliable performance estimates.</li>
          <li><strong>Use pipelines</strong> to chain preprocessing steps with models - this prevents data leakage and makes code cleaner.</li>
          <li><strong>Scale your data</strong> before using Lasso or Ridge regression - these methods are sensitive to feature scales.</li>
          <li><strong>Hyperparameter tuning is essential</strong> - use GridSearchCV to systematically search for the optimal balance.</li>
          <li><strong>GridSearchCV refits on full data</strong> after finding best hyperparameters, making it production-ready.</li>
        </ul>
      </Callout>

      <Callout type="business" title="TechRetail's Module 3 Progress">
        <p>
          TechRetail&apos;s team now reports their model as &quot;R² = 0.76 ± 0.04&quot; based on 5-fold cross-validation.
          The ± 0.04 shows the variation across folds—giving leadership confidence in the reliability of this number.
        </p>
        <p className="mt-2">
          Using GridSearchCV, they discovered that polynomial degree 2 with alpha=0.1 works best for their
          sales prediction model—much better than their initial guesses.
        </p>
        <p className="mt-2">
          <strong>Next challenge:</strong> Their model has 50 features, but some might be useless or harmful.
          How do they automatically identify and remove unimportant features? Module 4 introduces regularization.
        </p>
      </Callout>
    </>
  );
}
