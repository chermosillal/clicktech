const pool = require('../config/db');

// Calcular el precio de un producto
async function getProductPrice(product_id) {
  const prod = await pool.query('SELECT precio FROM products WHERE id = $1', [product_id]);
  if (prod.rows.length === 0) return null;
  return parseInt(prod.rows[0].precio.replace(/[^0-9]/g, ''));
}

// Crear orden
async function createOrder(userId, items, pago, envio) {
  let total = 0;
  const productosComprados = [];
  for (const item of items) {
    // Obtener nombre y precio del producto
    const prodRes = await pool.query('SELECT nombre, precio FROM products WHERE id = $1', [item.product_id]);
    if (prodRes.rows.length === 0) throw new Error('Producto no existe');
    const nombre = prodRes.rows[0].nombre;
    const precio = parseInt(prodRes.rows[0].precio.replace(/[^0-9]/g, ''));
    total += precio * item.cantidad;
    productosComprados.push({ producto: nombre, precio, cantidad: item.cantidad });
  }
  // Generar número de orden
  const tempOrderRes = await pool.query('SELECT nextval(\'orders_id_seq\') as next_id');
  const nextOrderId = tempOrderRes.rows[0].next_id;
  const numero_orden = `${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${String(nextOrderId).padStart(5,'0')}`;
  // Insertar orden con los nuevos campos
  const orderRes = await pool.query(
    'INSERT INTO orders (id, user_id, total, status, numero_orden, productos, pago, envio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, created_at',
    [nextOrderId, userId, total, 'pagado', numero_orden, JSON.stringify(productosComprados), pago, envio]
  );
  const orderId = orderRes.rows[0].id;
  for (const item of items) {
    const price = await getProductPrice(item.product_id);
    await pool.query(
      'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
      [orderId, item.product_id, item.cantidad, price]
    );
  }
  return { orderId, total, created_at: orderRes.rows[0].created_at, numero_orden };
}

// Obtener historial de órdenes del usuario
async function getOrders(userId) {
  const ordersRes = await pool.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
  const orders = [];
  for (const order of ordersRes.rows) {
    const itemsRes = await pool.query(
      `SELECT oi.product_id, p.nombre as title, oi.quantity, oi.price
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = $1`,
      [order.id]
    );
    orders.push({
      id: order.id,
      total: order.total,
      status: order.status,
      created_at: order.created_at,
      items: itemsRes.rows
    });
  }
  return orders;
}

module.exports = { createOrder, getOrders };
