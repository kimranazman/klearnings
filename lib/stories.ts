export interface StorySection {
  type: "narrative" | "lesson" | "dialogue" | "revelation";
  content: string;
  character?: string;
  highlight?: string;
}

export interface Story {
  slug: string;
  title: string;
  subtitle: string;
  module?: string;
  readingTime: number;
  coverEmoji: string;
  synopsis: string;
  sections: StorySection[];
  keyTakeaways: string[];
}

export const stories: Story[] = [
  {
    slug: "the-fortune-teller",
    title: "The Fortune Teller",
    subtitle: "How TechRetail Learned to Predict the Future",
    module: "module-1",
    readingTime: 8,
    coverEmoji: "🔮",
    synopsis: "When TechRetail's CEO demands accurate sales predictions, data scientist Maya discovers that the secret isn't magic—it's learning from the past.",
    sections: [
      {
        type: "narrative",
        content: "Maya Chen had been at TechRetail for exactly three weeks when the CEO called an emergency meeting. The conference room was tense—last quarter's inventory disaster had cost the company $2.3 million. They'd ordered 50,000 units of a product that flopped, while running out of stock on three bestsellers."
      },
      {
        type: "dialogue",
        character: "CEO",
        content: "I need someone to tell me what's going to sell. Not guesses. Not gut feelings. I need to know before we order inventory."
      },
      {
        type: "narrative",
        content: "Everyone looked at Maya. She was the new 'data person,' after all. Her mouth went dry. Predict the future? That was impossible... wasn't it?"
      },
      {
        type: "narrative",
        content: "That night, Maya couldn't sleep. She kept thinking about her grandmother, who ran a small bakery in Taipei. Grandma Wei always knew exactly how many pineapple cakes to make each day. 'It's not magic,' she'd say, tapping her worn notebook. 'Mondays are slow. Fridays before holidays, everyone wants gifts. I've been watching patterns for forty years.'"
      },
      {
        type: "revelation",
        content: "Patterns. That was the key. Grandma Wei wasn't predicting the future—she was learning from the past.",
        highlight: "Machine learning doesn't predict from magic. It finds patterns in historical data and applies them to new situations."
      },
      {
        type: "narrative",
        content: "Maya rushed to her laptop. TechRetail had three years of sales data—hundreds of thousands of transactions. Each one told a story: this product, at this price, with these reviews, sold this many units. If she could find the patterns in that data..."
      },
      {
        type: "narrative",
        content: "She started simple. A scatter plot of price versus sales. The relationship was clear—as price went up, sales went down. But it wasn't a perfect line. Some expensive products sold well; some cheap ones flopped. There was a pattern, but also noise."
      },
      {
        type: "dialogue",
        character: "Maya",
        content: "I need a way to draw the best possible line through this mess. A line that captures the real relationship, not the random noise."
      },
      {
        type: "lesson",
        content: "She discovered linear regression—a method to find the line that minimizes the distance between predictions and reality. The computer would try millions of possible lines and find the one that worked best.",
        highlight: "Linear regression finds the best-fit line: y = β₀ + β₁x, where β₀ is the starting point (intercept) and β₁ is how much y changes when x increases (slope)."
      },
      {
        type: "narrative",
        content: "Her first model was crude: predict sales using only price. It worked... sort of. The R² score was 0.35. She was explaining about a third of why products sold differently. Better than nothing, but not good enough for the CEO."
      },
      {
        type: "dialogue",
        character: "Colleague",
        content: "What about reviews? Products with five-star ratings always seem to sell better."
      },
      {
        type: "narrative",
        content: "Maya added review scores to her model. R² jumped to 0.52. She added product category. 0.61. Shipping time. 0.67. Each piece of information helped the model understand more of the puzzle."
      },
      {
        type: "revelation",
        content: "By the end of the week, Maya had a model with an R² of 0.85. It could explain 85% of why some products sold more than others. The remaining 15%? Random factors—a viral tweet, an influencer mention, pure luck. Things no model could predict.",
        highlight: "R² (R-squared) measures how much of the variation your model explains. R²=0.85 means 85% explained, 15% is unpredictable noise."
      },
      {
        type: "narrative",
        content: "She presented her findings to the CEO. 'I can't tell you exactly how many units we'll sell,' Maya explained. 'But I can tell you that a $49 product with 4.5-star reviews in the Electronics category will likely sell between 800 and 1,200 units in Q4.'"
      },
      {
        type: "dialogue",
        character: "CEO",
        content: "That's... that's actually useful. How confident are you?"
      },
      {
        type: "narrative",
        content: "Maya smiled. 'Confident enough that I'd bet my bonus on it.' The CEO laughed for the first time in weeks. TechRetail had found their fortune teller—and she didn't need a crystal ball. Just data, patterns, and a little bit of math."
      },
      {
        type: "lesson",
        content: "The model wasn't perfect. It never would be. But it was infinitely better than guessing. And that's the promise of machine learning: not perfection, but consistent, measurable improvement over intuition alone.",
        highlight: "The goal isn't perfect predictions—it's predictions that are consistently better than guessing. Even 70% accuracy can save millions."
      }
    ],
    keyTakeaways: [
      "Machine learning finds patterns in historical data to make predictions about new data",
      "Linear regression draws the best-fit line through data: y = β₀ + β₁x",
      "R² measures how much variation your model explains (0.85 = 85% explained)",
      "More relevant features generally improve predictions",
      "Some variation is pure noise—no model can predict everything"
    ]
  },
  {
    slug: "the-exam-cheat",
    title: "The Exam Cheat",
    subtitle: "Why Testing on Training Data is Academic Fraud",
    module: "module-2",
    readingTime: 7,
    coverEmoji: "📝",
    synopsis: "Maya's model scores 95%—until she discovers she's been 'cheating' the whole time. A humbling lesson in honest evaluation.",
    sections: [
      {
        type: "narrative",
        content: "Three months after her first success, Maya was riding high. Her latest model scored an incredible R² of 0.95 on the sales data. She couldn't wait to show the CEO."
      },
      {
        type: "dialogue",
        character: "Maya",
        content: "Our new model explains 95% of sales variation! We can predict almost anything!"
      },
      {
        type: "narrative",
        content: "The CEO approved a major inventory bet based on Maya's predictions. They ordered heavily on products the model said would sell, and lightly on products it said would flop."
      },
      {
        type: "narrative",
        content: "Six weeks later, the results came in. The model had been wrong. Badly wrong. Products it predicted would fly sat in warehouses. Products it said would flop sold out instantly. The company lost $1.8 million—almost as bad as before Maya joined."
      },
      {
        type: "dialogue",
        character: "CEO",
        content: "You said 95% accuracy. What happened?"
      },
      {
        type: "narrative",
        content: "Maya went back to her code, checking everything. The math was right. The data was clean. So why did the model fail so spectacularly in the real world?"
      },
      {
        type: "narrative",
        content: "Then she found it. A chill ran down her spine."
      },
      {
        type: "revelation",
        content: "She had tested the model on the same data she used to train it. It was like a student memorizing the answer key, then taking a test using that exact answer key. Of course the score was 95%—the model had seen all the answers!",
        highlight: "Testing on training data is cheating. The model memorizes specific examples instead of learning general patterns."
      },
      {
        type: "narrative",
        content: "Maya thought about her college days. Her professor always made exams from new questions, not homework problems. 'If I just gave you the same questions,' he'd say, 'I'd be testing your memory, not your understanding.'"
      },
      {
        type: "lesson",
        content: "She needed to do the same thing. Split her data into two parts: training data (the homework) and test data (the exam). Train the model on one set, evaluate it on the other.",
        highlight: "Train-test split: Use 70% of data to train the model, hold out 30% to test it honestly. Never let the model see test data during training."
      },
      {
        type: "narrative",
        content: "Maya rebuilt everything. She randomly split the three years of sales data: 70% for training, 30% for testing. The model learned from the training set, then she evaluated it on the test set—data it had never seen before."
      },
      {
        type: "narrative",
        content: "The new R² score? 0.72. Not 0.95."
      },
      {
        type: "dialogue",
        character: "Maya",
        content: "That's... much lower. But it's honest."
      },
      {
        type: "narrative",
        content: "Her colleague Marcus looked over her shoulder. 'What's the difference between the training score and test score?'"
      },
      {
        type: "narrative",
        content: "Training R²: 0.89. Test R²: 0.72. A gap of 0.17."
      },
      {
        type: "revelation",
        content: "'That gap is the problem,' Marcus said. 'When training score is much higher than test score, the model is overfitting—memorizing the training data instead of learning general patterns.'",
        highlight: "Overfitting: When a model performs well on training data but poorly on new data. The gap between training and test scores reveals this."
      },
      {
        type: "narrative",
        content: "Maya simplified her model, removing some of the complex features she'd added. The training score dropped to 0.78, but the test score rose to 0.75. The gap was smaller—the model was generalizing better."
      },
      {
        type: "lesson",
        content: "She learned a painful but valuable lesson: the goal isn't the highest training score. It's the best performance on data the model has never seen. That's what matters in the real world.",
        highlight: "The only score that matters is performance on unseen data. A 75% honest score beats a 95% cheated score every time."
      },
      {
        type: "narrative",
        content: "Maya presented her revised model to the CEO, this time with both numbers. 'Training score: 78%. Test score: 75%. This is what we can actually expect in production.' The CEO nodded slowly. A lower number, but one they could trust."
      },
      {
        type: "dialogue",
        character: "CEO",
        content: "I'd rather have honest 75% than fake 95%. Let's try again."
      },
      {
        type: "narrative",
        content: "The next quarter, the model's predictions were within 12% of actual sales—good enough to prevent any major inventory disasters. Maya had learned that in machine learning, as in life, honesty was always the best policy."
      }
    ],
    keyTakeaways: [
      "Never test on training data—it's like grading a test using the answer key you studied from",
      "Split data: 70% for training, 30% for testing (held-out, unseen data)",
      "Overfitting happens when training score >> test score",
      "A smaller gap between training and test scores means better generalization",
      "The test score is the only honest measure of real-world performance"
    ]
  },
  {
    slug: "the-five-judges",
    title: "The Five Judges",
    subtitle: "Why One Opinion Isn't Enough",
    module: "module-3",
    readingTime: 7,
    coverEmoji: "⚖️",
    synopsis: "When Maya's test scores swing wildly between runs, she discovers the wisdom of crowds—and cross-validation.",
    sections: [
      {
        type: "narrative",
        content: "Maya ran her model evaluation three times, each with a different random split of training and test data. The results troubled her: R² of 0.72, then 0.68, then 0.79. Which one was right?"
      },
      {
        type: "dialogue",
        character: "Marcus",
        content: "It's like being judged by a single random person. Maybe you got a tough grader, maybe an easy one. One data point isn't enough."
      },
      {
        type: "narrative",
        content: "Maya thought about reality TV singing competitions. One judge might love your performance; another might hate it. The truth was usually somewhere in the average of all opinions."
      },
      {
        type: "revelation",
        content: "What if she could get multiple 'judges' to evaluate her model? Not just one random train-test split, but five? Or ten?",
        highlight: "Cross-validation uses multiple train-test splits to get a reliable performance estimate. Like having five judges instead of one."
      },
      {
        type: "lesson",
        content: "She discovered K-fold cross-validation. The idea was elegant: split the data into K equal parts (folds). Train on K-1 folds, test on the remaining fold. Repeat K times, each time using a different fold for testing. Average all K scores.",
        highlight: "K-fold CV: Split data into K parts. Each part takes a turn being the test set. Final score = average of all K tests."
      },
      {
        type: "narrative",
        content: "Maya implemented 5-fold cross-validation. Her data was split into five equal chunks. In round one, chunk 5 was the test set. In round two, chunk 4. And so on. Each chunk got its turn as the 'judge.'"
      },
      {
        type: "narrative",
        content: "The five scores came back: 0.71, 0.74, 0.73, 0.69, 0.76. Average: 0.726. Standard deviation: 0.025."
      },
      {
        type: "dialogue",
        character: "Maya",
        content: "So our model is 72.6% accurate, plus or minus about 2.5%. That's a much more reliable estimate than any single split."
      },
      {
        type: "narrative",
        content: "But she noticed something else. Different random splits shouldn't matter much—unless something was wrong. When she saw huge variation between folds (like 0.50 one time and 0.90 another), it meant the model was unstable."
      },
      {
        type: "narrative",
        content: "Marcus introduced her to pipelines—a way to chain all preprocessing steps with the model itself. 'This way, you can't accidentally leak information between training and testing,' he explained."
      },
      {
        type: "revelation",
        content: "Data leakage! Maya realized she'd been fitting her StandardScaler on ALL data before splitting, then splitting. That meant the scaler 'knew' about the test data—another form of cheating.",
        highlight: "Data leakage occurs when information from the test set influences training. Pipelines prevent this by keeping all steps properly isolated."
      },
      {
        type: "lesson",
        content: "With a proper pipeline, every preprocessing step (scaling, polynomial features, etc.) was fitted only on training data and applied to test data. No leakage possible.",
        highlight: "Pipeline rule: fit_transform() on training data, transform() only on test data. Pipelines enforce this automatically."
      },
      {
        type: "narrative",
        content: "Now Maya could confidently report to the CEO: 'Our model achieves 72.6% R² with a standard deviation of 2.5%, validated across five independent test sets.' It wasn't just a number—it was a reliable number."
      },
      {
        type: "narrative",
        content: "The CFO, who had been skeptical, finally nodded. 'That confidence interval is something I can work with. We can plan inventory around the lower bound and keep a buffer for the upper bound.'"
      },
      {
        type: "narrative",
        content: "Maya smiled. Five judges were indeed wiser than one."
      }
    ],
    keyTakeaways: [
      "Single train-test splits can be lucky or unlucky—results vary with different random splits",
      "K-fold cross-validation trains and tests K times, using each fold as test data once",
      "Report the mean score ± standard deviation for reliable estimates",
      "Pipelines chain preprocessing + model together to prevent data leakage",
      "High variance between folds indicates an unstable model"
    ]
  },
  {
    slug: "the-budget-constraint",
    title: "The Budget Constraint",
    subtitle: "When Too Much Freedom Leads to Chaos",
    module: "module-4",
    readingTime: 8,
    coverEmoji: "💰",
    synopsis: "Maya's 50-feature model goes haywire. The solution? Give it a budget and force it to prioritize.",
    sections: [
      {
        type: "narrative",
        content: "Success bred ambition. Maya's team had expanded the sales prediction model from 5 features to 50. Product price, category, reviews, seller rating, shipping speed, warehouse location, competitor prices, day of week, weather patterns, social media mentions..."
      },
      {
        type: "dialogue",
        character: "Team member",
        content: "More data is always better, right?"
      },
      {
        type: "narrative",
        content: "Wrong. The cross-validation score dropped from 0.73 to 0.58. Adding 45 features had made the model worse, not better."
      },
      {
        type: "narrative",
        content: "Maya stared at the coefficient table. The model had assigned importance to everything—including 'average_daily_temperature' and 'competitor_ceo_twitter_followers.' These couldn't possibly matter for predicting TV sales. But the model, given unlimited freedom, had found spurious patterns in the noise."
      },
      {
        type: "revelation",
        content: "The model was like a shopper with unlimited credit. It bought everything, even junk, because there was no constraint. It needed a budget.",
        highlight: "Regularization adds a 'budget constraint' to the model. It must justify every coefficient it wants to keep."
      },
      {
        type: "narrative",
        content: "Maya learned about Ridge regression. It added a penalty term to the cost function: not just 'minimize prediction errors,' but 'minimize prediction errors PLUS the squared size of all coefficients.' Big coefficients were expensive."
      },
      {
        type: "lesson",
        content: "Ridge was like telling the model: 'You have a budget of $100 to spend on coefficients. Spend wisely.' A coefficient of 10 would cost $100 (10² = 100), leaving nothing for other features. The model had to be economical.",
        highlight: "Ridge (L2): Adds penalty = λ × Σ(coefficients²). Large coefficients become expensive. Model must prioritize."
      },
      {
        type: "narrative",
        content: "She applied Ridge with λ (alpha) = 1.0. The cross-validation score jumped back to 0.69. Better, but many useless features still had small coefficients. The model was shrinking them but not eliminating them."
      },
      {
        type: "dialogue",
        character: "Marcus",
        content: "Try Lasso instead. It's... more brutal."
      },
      {
        type: "revelation",
        content: "Lasso used absolute values instead of squares for its penalty. The mathematical effect was dramatic: instead of shrinking all coefficients proportionally, Lasso drove weak ones to exactly zero. It didn't just cut budgets—it fired employees.",
        highlight: "Lasso (L1): Adds penalty = λ × Σ|coefficients|. Can set coefficients exactly to zero, automatically selecting features."
      },
      {
        type: "narrative",
        content: "Maya applied Lasso with α = 0.1. The results were eye-opening: of 50 features, 28 had coefficients of exactly zero. The model had 'fired' them. The remaining 22 features gave a CV R² of 0.74—better than the original 50!"
      },
      {
        type: "narrative",
        content: "She examined which features survived: price, review_score, category, seller_rating, shipping_days, is_prime_eligible... These made sense. Which were eliminated? competitor_ceo_twitter_followers, lunar_phase, average_rainfall. Good riddance."
      },
      {
        type: "lesson",
        content: "The lambda (α) parameter controlled how tight the budget was. Low alpha = loose budget, keep more features. High alpha = tight budget, keep only essentials. The trick was finding the sweet spot.",
        highlight: "Alpha controls regularization strength. Low α = complex model (risk overfitting). High α = simple model (risk underfitting). Use CV to find optimal α."
      },
      {
        type: "dialogue",
        character: "Maya",
        content: "So Lasso is always better than Ridge?"
      },
      {
        type: "narrative",
        content: "'Not always,' Marcus explained. 'Ridge is better when you believe most features matter somewhat. Lasso is better when you suspect many features are useless. Elastic Net combines both—it can zero out useless features while keeping related useful features together.'"
      },
      {
        type: "narrative",
        content: "Maya used LassoCV to automatically find the best alpha through cross-validation. The final model: 22 features, α = 0.08, CV R² = 0.76. Simpler, more interpretable, and more accurate than the bloated 50-feature version."
      },
      {
        type: "narrative",
        content: "The CEO loved the simplicity. 'So you're telling me that warehouse distance doesn't affect online sales at all?' 'Not according to the data,' Maya confirmed. 'Lasso eliminated it completely.' It was the kind of insight that could save millions in logistics optimization."
      }
    ],
    keyTakeaways: [
      "More features doesn't always mean better predictions—often the opposite",
      "Regularization adds a penalty for large coefficients, forcing the model to prioritize",
      "Ridge (L2) shrinks all coefficients but keeps them non-zero",
      "Lasso (L1) can eliminate features entirely by setting coefficients to exactly zero",
      "Use LassoCV/RidgeCV to find the optimal regularization strength automatically"
    ]
  },
  {
    slug: "the-currency-conversion",
    title: "The Currency Conversion",
    subtitle: "Why Scale Matters When Comparing Importance",
    module: "module-5",
    readingTime: 6,
    coverEmoji: "💱",
    synopsis: "The CEO asks which feature matters most. Maya almost gives the wrong answer—until she learns about standardization.",
    sections: [
      {
        type: "narrative",
        content: "The board meeting was in an hour. The CEO had one question: 'Which factor most influences our sales? I need to know where to focus our resources.'"
      },
      {
        type: "narrative",
        content: "Maya pulled up her Lasso model coefficients:\n- price: -0.47\n- review_score: 2.31\n- shipping_days: -0.89"
      },
      {
        type: "dialogue",
        character: "Maya",
        content: "Reviews have the highest coefficient, so they're the most important factor."
      },
      {
        type: "narrative",
        content: "Marcus frowned. 'Wait. What are the scales of those features?'"
      },
      {
        type: "narrative",
        content: "Maya checked: price ranged from $10 to $500. Review scores ranged from 1 to 5. Shipping days ranged from 1 to 14."
      },
      {
        type: "revelation",
        content: "'Those coefficients aren't comparable,' Marcus said. 'A coefficient of 2.31 for reviews means: every 1-point increase in reviews (say, 3 to 4 stars) adds 2.31 units to predicted sales. But for price, -0.47 means every $1 increase loses 0.47 units. That's not the same scale!'",
        highlight: "Raw coefficients are in different units. You can't compare 'per 1 star' to 'per $1' directly."
      },
      {
        type: "narrative",
        content: "Maya did the math. A realistic change in price might be $50 (from $100 to $150). Impact: 50 × -0.47 = -23.5 units. A realistic change in reviews might be 0.5 stars (from 4.0 to 4.5). Impact: 0.5 × 2.31 = 1.16 units."
      },
      {
        type: "dialogue",
        character: "Maya",
        content: "So price actually has a much bigger practical impact than reviews? Even though the coefficient looks smaller?"
      },
      {
        type: "narrative",
        content: "Marcus nodded. 'This is why we standardize. If you scale all features to have mean 0 and standard deviation 1, then a coefficient of 2.0 means: a 1 standard deviation increase in this feature leads to a 2.0 unit increase in the target. Now all coefficients are in the same currency.'"
      },
      {
        type: "lesson",
        content: "StandardScaler transformed each feature: z = (x - mean) / std. After scaling, every feature had the same spread. A change of 1.0 meant 'one standard deviation'—comparable across all features.",
        highlight: "StandardScaler: z = (x - μ) / σ. After scaling, coefficient magnitude directly reflects feature importance."
      },
      {
        type: "narrative",
        content: "Maya rebuilt her model with proper standardization:\n1. Split data into train/test\n2. Fit StandardScaler on training data only\n3. Transform both train and test\n4. Fit Lasso on scaled training data"
      },
      {
        type: "narrative",
        content: "The new standardized coefficients told a different story:\n- price: -0.82\n- review_score: 0.31\n- shipping_days: -0.45"
      },
      {
        type: "revelation",
        content: "Now the interpretation was clear: price had the biggest impact (coefficient of -0.82), followed by shipping speed (-0.45), then reviews (0.31). The CEO should focus on pricing strategy first.",
        highlight: "After standardization: larger |coefficient| = more important feature. Now you can fairly compare."
      },
      {
        type: "narrative",
        content: "Maya rushed to update her presentation. In the board meeting, she showed the standardized coefficients on a bar chart. 'Price sensitivity is our biggest lever. A one standard deviation increase in price—about $45—reduces expected sales by 0.82 units per product.'"
      },
      {
        type: "dialogue",
        character: "CEO",
        content: "So we should focus on competitive pricing rather than chasing more reviews?"
      },
      {
        type: "narrative",
        content: "'Based on this data, yes. That doesn't mean reviews don't matter—they do, with a coefficient of 0.31. But price is nearly three times more impactful.'"
      },
      {
        type: "narrative",
        content: "The CFO leaned forward. 'And we can trust these numbers?' 'They're from a Lasso model with 5-fold cross-validation,' Maya replied. 'R² of 0.76, validated on unseen data. And the coefficients are standardized, so this comparison is apples to apples.'"
      },
      {
        type: "lesson",
        content: "The meeting ended with a clear action plan: revise pricing strategy on 200 products, projected to increase revenue by $1.2 million. All because Maya learned to speak the same 'currency' for all features.",
        highlight: "Always standardize before regularization. It ensures fair penalty distribution AND makes coefficients interpretable."
      }
    ],
    keyTakeaways: [
      "Raw coefficients are in different units—you can't compare them directly",
      "StandardScaler converts all features to mean=0, std=1 (same 'currency')",
      "After standardization, coefficient magnitude directly reflects importance",
      "Always fit scaler on training data, then transform test data with the same parameters",
      "Standardization is required for fair regularization (penalty applies equally to all features)"
    ]
  },
  {
    slug: "the-complete-recipe",
    title: "The Complete Recipe",
    subtitle: "TechRetail's Journey from Chaos to Confidence",
    readingTime: 10,
    coverEmoji: "🎯",
    synopsis: "One year later, Maya presents the final system. A story that ties together everything—from linear regression to production-ready pipelines.",
    sections: [
      {
        type: "narrative",
        content: "It had been exactly one year since Maya's first panicked meeting with the CEO. Today, she stood before the entire company at the annual all-hands meeting, ready to present TechRetail's new Sales Intelligence System."
      },
      {
        type: "narrative",
        content: "The journey flashed through her mind. The initial confusion about machine learning. The embarrassing 95% 'accuracy' that turned out to be cheating. The months of learning, failing, and improving. And now, a system that had saved the company $4.7 million in its first year."
      },
      {
        type: "dialogue",
        character: "Maya",
        content: "A year ago, our CEO asked me to predict the future. I told him that was impossible. But I've learned something better: we can learn from the past to make smarter decisions about the future."
      },
      {
        type: "narrative",
        content: "She clicked to the first slide: a simple scatter plot of price versus sales, with a line through it."
      },
      {
        type: "lesson",
        content: "'This is where it all started. Linear regression—finding the best line through data. The formula is simple: y = β₀ + β₁x. But the idea is profound: we can quantify relationships that used to be just intuition.'",
        highlight: "Lesson 1: Machine learning finds patterns in data. Linear regression is the foundation—a line that minimizes prediction errors."
      },
      {
        type: "narrative",
        content: "She showed the infamous 95% accuracy slide, now with a big red 'WRONG' stamp over it."
      },
      {
        type: "dialogue",
        character: "Maya",
        content: "This was my biggest mistake. I tested the model on the same data I trained it on. It memorized the answers instead of learning the patterns. Like studying the answer key and then taking a test with the same questions."
      },
      {
        type: "lesson",
        content: "The next slide showed a proper train-test split. 'Now we always hold out 30% of data for honest evaluation. The model never sees test data during training. Our reported accuracy is what you'll actually get in the real world.'",
        highlight: "Lesson 2: Always split your data. Train on 70%, test on 30%. The test score is the only honest measure."
      },
      {
        type: "narrative",
        content: "She showed a diagram of 5-fold cross-validation—data split into five chunks, each taking turns as the test set."
      },
      {
        type: "dialogue",
        character: "Maya",
        content: "But one test isn't enough. What if we got a lucky split? We now use five-fold cross-validation. Five different judges evaluate our model. We report the average score with a confidence interval."
      },
      {
        type: "lesson",
        content: "'Our current model: R² = 0.76 ± 0.03.' That ±0.03 is crucial. It tells you the uncertainty. You can plan around it.'",
        highlight: "Lesson 3: Cross-validation gives reliable estimates. Report mean ± std to quantify uncertainty."
      },
      {
        type: "narrative",
        content: "The next section showed the evolution of their feature count: 5 → 25 → 50 → 22."
      },
      {
        type: "dialogue",
        character: "Maya",
        content: "We thought more features would be better. We added everything we could find. Competitor prices. Weather. Social media mentions. Even lunar phases, just in case."
      },
      {
        type: "narrative",
        content: "Laughter rippled through the audience."
      },
      {
        type: "lesson",
        content: "'The model loved it all. But it was finding patterns in noise. Our accuracy dropped. The solution? Regularization. We gave the model a budget—it had to justify every feature it kept.'",
        highlight: "Lesson 4: Regularization prevents overfitting. Lasso can eliminate useless features automatically."
      },
      {
        type: "narrative",
        content: "She showed a bar chart of surviving features after Lasso regularization. Price, reviews, category, shipping time—the ones that made intuitive sense."
      },
      {
        type: "dialogue",
        character: "Maya",
        content: "Lasso eliminated 28 features, including lunar phases. Shockingly, the moon's position doesn't affect TV sales."
      },
      {
        type: "narrative",
        content: "More laughter. Even the CEO was smiling."
      },
      {
        type: "narrative",
        content: "The final technical slide showed the standardized coefficients, with price leading at -0.82."
      },
      {
        type: "lesson",
        content: "'The last piece: standardization. All features on the same scale, so we can compare importance fairly. Price matters most—almost three times more than reviews. This isn't intuition. It's math.'",
        highlight: "Lesson 5: Standardize before regularization. It ensures fair comparison and makes coefficients interpretable."
      },
      {
        type: "narrative",
        content: "Maya clicked to her final slide: the complete ML pipeline."
      },
      {
        type: "dialogue",
        character: "Maya",
        content: "This is our production system. Every prediction goes through the same pipeline: polynomial features, standardization, Lasso regression. No shortcuts. No data leakage. No cheating."
      },
      {
        type: "narrative",
        content: "She paused, looking at the audience."
      },
      {
        type: "dialogue",
        character: "Maya",
        content: "Last year, we lost $2.3 million on inventory mistakes. This year, using this system, we saved $4.7 million. Not because we can predict the future perfectly—we can't. But because we can be consistently, measurably less wrong than before."
      },
      {
        type: "revelation",
        content: "The audience applauded. But for Maya, the real victory wasn't the numbers. It was understanding why the numbers were reliable. Every step had a reason. Every technique solved a specific problem. From linear regression to regularization, it all connected.",
        highlight: "The complete recipe: Split → Cross-validate → Pipeline → Regularize → Standardize → Interpret. Each step solves a specific problem."
      },
      {
        type: "narrative",
        content: "After the presentation, a junior analyst approached her. 'That was amazing. But... it seems like so much to learn. Where do I even start?'"
      },
      {
        type: "dialogue",
        character: "Maya",
        content: "Start with a simple question and a simple model. Add complexity only when you need it. And remember: the goal isn't a perfect model. It's a model that's honest about its limitations and consistently helps you make better decisions than guessing."
      },
      {
        type: "narrative",
        content: "She smiled, remembering her grandmother's pineapple cakes. 'It's like baking. Start with a basic recipe. Understand why each ingredient matters. Then, and only then, start experimenting.'"
      },
      {
        type: "narrative",
        content: "The junior analyst nodded, eyes bright with determination. Maya saw herself a year ago. The journey was just beginning for them—and it was going to be a great one."
      }
    ],
    keyTakeaways: [
      "Linear regression is the foundation—finding patterns in data with y = β₀ + β₁x",
      "Train-test splits prevent cheating; cross-validation provides reliable scores",
      "Pipelines chain preprocessing + model, preventing data leakage",
      "Regularization (Lasso/Ridge) controls complexity and can select features",
      "Standardization enables fair comparison and coefficient interpretation",
      "The goal isn't perfection—it's being consistently better than guessing"
    ]
  }
];

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find(s => s.slug === slug);
}

export function getAllStories(): Story[] {
  return stories;
}

export function getStoryByModule(moduleSlug: string): Story | undefined {
  return stories.find(s => s.module === moduleSlug);
}
