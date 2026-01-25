const productModel = require('../models/productModel');

// Obtener productos con imágenes, búsqueda y filtro
const getProducts = async (req, res) => {
  // ...
  const { category, search, admin } = req.query;
  try {
    // Si viene ?admin=1, mostrar todos los productos (para admin)
    const soloDisponibles = !(admin === '1' || admin === 'true');
    let products = await productModel.getProductsWithImages({ soloDisponibles });
    // Filtro por categoría y búsqueda
    if (category) {
      products = products.filter(p => p.modalidad === category);
    }
    if (search) {
      const s = search.toLowerCase();
      products = products.filter(p =>
        p.nombre.toLowerCase().includes(s) ||
        (p.descripcion && p.descripcion.toLowerCase().includes(s))
      );
    }
    res.json(products);
  } catch (err) {
    console.error('Error en getProductsWithImages:', err);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// Obtener producto por id con imágenes
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await productModel.getProductsWithImages();
    const product = products.find(p => p.id == id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
};

// Crear producto (solo admin)
// Actualizar producto (solo admin)
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    nombre, descripcion, precio, marca, incluye, garantia, stock, oferta, servicio, no_fisico, destacado, duracion, modalidad, imagenes, ficha_pdf, disponible
  } = req.body;
  try {
    // Actualizar datos principales
    await productModel.updateProduct({ id, nombre, descripcion, precio, marca, incluye, garantia, stock, oferta, servicio, no_fisico, destacado, duracion, modalidad, ficha_pdf, disponible });
    // Actualizar imágenes (opcional: aquí se puede mejorar para no duplicar)
    if (Array.isArray(imagenes)) {
      await productModel.replaceImagesOfProduct(id, imagenes);
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Error al actualizar producto:', err);
    res.status(400).json({ error: 'Error al actualizar producto', detalle: err.message });
  }
};
const createProduct = async (req, res) => {
  const { nombre, descripcion, precio, marca, incluye, garantia, stock, oferta, servicio, no_fisico, destacado, duracion, modalidad, imagenes, ficha_pdf, disponible } = req.body;
  console.log('Body recibido en createProduct:', req.body);
  try {
    const product = await productModel.createProduct({ nombre, descripcion, precio, marca, incluye, garantia, stock, oferta, servicio, no_fisico, destacado, duracion, modalidad, ficha_pdf, disponible });
    if (imagenes && Array.isArray(imagenes) && imagenes.length > 0) {
      await productModel.addImagesToProduct(product.id, imagenes);
    }
    res.status(201).json({ id: product.id });
  } catch (err) {
    console.error('Error al crear producto:', err);
    res.status(400).json({ error: 'Error al crear producto', detalle: err.message });
  }
};

// Eliminar producto (solo admin)
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.deleteProduct(id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Error al eliminar producto' });
  }
};

module.exports = { getProducts, getProductById, createProduct, deleteProduct, updateProduct };