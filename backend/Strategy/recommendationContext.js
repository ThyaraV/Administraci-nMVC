// recommendationContext.js

import { OrderHistoryRecommendationStrategy, RatingBasedRecommendationStrategy} from './recommendationStrategies.js';

class RecommendationContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  async generate(user) {
    return this.strategy.generateRecommendations(user);
  }
}

export default RecommendationContext;
