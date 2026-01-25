// Actualizar producto
async function updateProduct(product) {
  const {
    id, nombre, descripcion, precio, marca, incluye, garantia, stock, oferta, servicio, no_fisico, destacado, duracion, modalidad, ficha_pdf, disponible
  } = product;
  await pool.query(
    `UPDATE products SET nombre=$1, descripcion=$2, precio=$3, marca=$4, incluye=$5, garantia=$6, stock=$7, oferta=$8, servicio=$9, no_fisico=$10, destacado=$11, duracion=$12, modalidad=$13, ficha_pdf=$14, disponible=$15 WHERE id=$16`,
    [nombre, descripcion, precio, marca, incluye, garantia, stock, oferta, servicio, no_fisico, destacado, duracion, modalidad, ficha_pdf, disponible, id]
  );
}

// Reemplazar imágenes de un producto
async function replaceImagesOfProduct(productId, imagenes) {
  // Eliminar asociaciones actuales
  await pool.query('DELETE FROM product_images WHERE product_id = $1', [productId]);
  // Insertar nuevas imágenes y asociar
  for (const url of imagenes) {
    if (!url || !url.trim()) continue;
    // Insertar imagen si no existe
    let imgRes = await pool.query('SELECT id FROM images WHERE url = $1', [url]);
    let imageId;
    if (imgRes.rows.length > 0) {
      imageId = imgRes.rows[0].id;
    } else {
      imgRes = await pool.query('INSERT INTO images (url) VALUES ($1) RETURNING id', [url]);
      imageId = imgRes.rows[0].id;
    }
    await pool.query('INSERT INTO product_images (product_id, image_id) VALUES ($1, $2)', [productId, imageId]);
  }
}
const pool = require('../config/db');

// Obtener todos los productos
async function getAllProducts() {
  const result = await pool.query('SELECT * FROM products');
  return result.rows;
}

// Obtener producto por ID
async function getProductById(id) {
  const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  return result.rows[0];
}

// Crear producto
async function createProduct(product) {
  const {
    nombre, descripcion, precio, marca, incluye, garantia, stock, oferta, servicio, no_fisico, destacado, duracion, modalidad, ficha_pdf, disponible
  } = product;
  const result = await pool.query(
    `INSERT INTO products (nombre, descripcion, precio, marca, incluye, garantia, stock, oferta, servicio, no_fisico, destacado, duracion, modalidad, ficha_pdf, disponible)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *`,
    [nombre, descripcion, precio, marca, incluye, garantia, stock, oferta, servicio, no_fisico, destacado, duracion, modalidad, ficha_pdf, disponible]
  );
  return result.rows[0];
}

// Eliminar producto
async function deleteProduct(id) {
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
}

// Obtener productos con imágenes
async function getProductsWithImages({ soloDisponibles = false } = {}) {
  try {
    const where = soloDisponibles ? 'WHERE p.disponible = true' : '';
    const result = await pool.query(`
      SELECT p.*, COALESCE(json_agg(i.url) FILTER (WHERE i.url IS NOT NULL), '[]') AS images
      FROM products p
      LEFT JOIN product_images pi ON p.id = pi.product_id
      LEFT JOIN images i ON pi.image_id = i.id
      ${where}
      GROUP BY p.id
      ORDER BY p.id
    `);
    return result.rows;
  } catch (err) {
    console.error('Error en getProductsWithImages:', err);
    throw err;
  }
}

// Asociar imágenes a producto
async function addImagesToProduct(productId, imagenes) {
  for (const url of imagenes) {
    // Insertar imagen y obtener id
    const imgRes = await pool.query('INSERT INTO images (url) VALUES ($1) RETURNING id', [url]);
    const imageId = imgRes.rows[0].id;
    // Asociar imagen al producto
    await pool.query('INSERT INTO product_images (product_id, image_id) VALUES ($1, $2)', [productId, imageId]);
  }
}

module.exports = { getAllProducts, getProductById, createProduct, deleteProduct, getProductsWithImages, addImagesToProduct, updateProduct, replaceImagesOfProduct };
