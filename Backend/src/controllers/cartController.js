// Carrito simulado en memoria (por sesión, no persistente)
const addToCart = (req, res) => {
  // En una app real, el frontend maneja el carrito hasta el checkout
  // Aquí solo devolvemos el producto agregado para simular
  const { product_id, cantidad } = req.body;
  if (!product_id || !cantidad) {
    return res.status(400).json({ error: 'product_id y cantidad requeridos' });
  }
  res.status(200).json({ product_id, cantidad });
};

module.exports = { addToCart };