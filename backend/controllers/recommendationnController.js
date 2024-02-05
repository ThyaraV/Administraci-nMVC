import asyncHandler from '../middleware/asyncHandler';
import RecommendationContext from '../strategies/recommendationContext';
import { OrderHistoryRecommendationStrategy, RatingBasedRecommendationStrategy } from '../strategies/recommendationStrategies';

export const getRecommendationns = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Asumiendo que el ID del usuario se obtiene de la sesión o token
  const user = { _id: userId }; // Simulando un objeto de usuario

  // Seleccionar la estrategia basada en algún criterio, por ejemplo, un parámetro de consulta
  let strategy;
  if (req.query.type === 'ratings') {
    strategy = new RatingBasedRecommendationStrategy();
  } else {
    // Por defecto, usar el historial de pedidos
    strategy = new OrderHistoryRecommendationStrategy();
  }

  const context = new RecommendationContext(strategy);
  const recommendationns = await context.generate(user);

  res.json({ recommendationns });
});
