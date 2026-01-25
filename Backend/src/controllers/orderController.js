const orderModel = require('../models/orderModel');

// Crear una orden
const createOrder = async (req, res) => {
  const userId = req.user.id;
  const { items, pago, envio } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Items requeridos' });
  }
  try {
    const { orderId, total, created_at, numero_orden } = await orderModel.createOrder(userId, items, pago, envio);
    res.status(201).json({
      id: orderId,
      numero_orden,
      total,
      status: 'pagado',
      created_at,
      productos: items,
      pago,
      envio
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Error al crear orden' });
  }
};

// Obtener historial de órdenes del usuario
const getOrders = async (req, res) => {
  const userId = req.user.id;
  try {
    const orders = await orderModel.getOrders(userId);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener órdenes' });
  }
};

module.exports = { createOrder, getOrders };