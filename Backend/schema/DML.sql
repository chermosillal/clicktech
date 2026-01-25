-- Usuarios
-- Contraseña: 123 (bcrypt hash: $2b$10$N9qo8uLOickgx2ZMRZoMyeIjZGHFQWv4u/9g6r0j6A6q7a3b8Qq4e)
INSERT INTO users (email, password, role, direccion) VALUES
('cliente@demo.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZGHFQWv4u/9g6r0j6A6q7a3b8Qq4e', 'cliente', 'Av. Siempre Viva 123, Santiago'),
('admin@demo.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZGHFQWv4u/9g6r0j6A6q7a3b8Qq4e', 'admin', 'Oficina Central, Santiago');
-- NOTA: Reemplaza las contraseñas por hashes reales de bcrypt para 'Prueba_123' y 'Admin_123'

-- Productos
INSERT INTO products (id, nombre, descripcion, precio, marca, incluye, garantia, stock, oferta, servicio, no_fisico, destacado, duracion, modalidad, disponible) VALUES
(1, 'Notebook Lenovo IdeaPad 3', 'Notebook 15.6'' FHD, Intel Core i5, 8GB RAM, 512GB SSD.', 399990, 'Lenovo', 'Notebook, cargador, manual', '1 año', 3, TRUE, FALSE, FALSE, TRUE, NULL, NULL, TRUE),
(2, 'Mouse Logitech M280 Wireless', 'Mouse inalámbrico ergonómico, sensor óptico, 1000 DPI.', 12990, 'Logitech', 'Mouse, pila AA, receptor USB', '6 meses', 0, TRUE, FALSE, FALSE, FALSE, NULL, NULL, TRUE),
(3, 'Teclado Mecánico Redragon Kumara', 'Teclado mecánico compacto, retroiluminado, switches Outemu Blue.', 29990, 'Redragon', 'Teclado, extractor de teclas, manual', '1 año', 7, FALSE, FALSE, FALSE, FALSE, NULL, NULL, TRUE),
(4, 'Monitor Samsung 24'' FHD', 'Monitor LED 24 pulgadas, Full HD, HDMI, VGA.', 109990, 'Samsung', 'Monitor, cable HDMI, base', '2 años', 0, FALSE, FALSE, FALSE, TRUE, NULL, NULL, TRUE),
(5, 'Impresora HP DeskJet 2720', 'Multifuncional inalámbrica, impresión, escaneo y copiado.', 54990, 'HP', 'Impresora, cartuchos, cable USB', '1 año', 5, FALSE, FALSE, FALSE, FALSE, NULL, NULL, TRUE),
(6, 'Disco Duro Externo WD 1TB', 'Almacenamiento portátil USB 3.0, compatible con Windows y Mac.', 49990, 'Western Digital', 'Disco duro, cable USB', '2 años', 2, FALSE, FALSE, FALSE, FALSE, NULL, NULL, TRUE),
(7, 'Tablet Samsung Galaxy Tab A7', 'Tablet 10.4" WiFi, 32GB, 3GB RAM, Android.', 179990, 'Samsung', 'Tablet, cargador, cable USB', '1 año', 4, FALSE, FALSE, FALSE, FALSE, NULL, NULL, TRUE),
(8, 'Auriculares JBL Tune 500', 'Auriculares on-ear, micrófono, cable desmontable.', 19990, 'JBL', 'Auriculares, cable', '6 meses', 6, FALSE, FALSE, FALSE, FALSE, NULL, NULL, TRUE),
(9, 'Mantención de PC', 'Limpieza, optimización y revisión de equipos computacionales.', 19990, NULL, 'Limpieza interna, optimización de software, revisión de hardware', '1 mes de soporte', NULL, TRUE, TRUE, TRUE, FALSE, NULL, NULL, TRUE),
(10, 'Desarrollo Web', 'Sitio web institucional, responsive, optimizado para SEO.', 299990, NULL, 'Sitio web, hosting 1 año, soporte', '1 año', NULL, FALSE, TRUE, TRUE, FALSE, NULL, NULL, TRUE),
(11, 'Digitalización de Documentos', 'Escaneo y digitalización de documentos físicos a PDF.', 9990, NULL, 'PDF, entrega digital', NULL, NULL, FALSE, TRUE, TRUE, FALSE, NULL, NULL, TRUE),
(12, 'Marketing Digital', 'Campaña de marketing digital en Google y redes sociales.', 49990, NULL, 'Campaña, reportes, asesoría', NULL, NULL, FALSE, TRUE, TRUE, FALSE, NULL, NULL, TRUE),
(13, 'Instalación de Windows 10', 'Formateo e instalación de Windows 10 original.', 29990, NULL, 'Instalación, drivers, activación', NULL, NULL, FALSE, TRUE, TRUE, FALSE, NULL, NULL, TRUE),
(14, 'Instalación de Office 365', 'Instalación y activación de Office 365.', 19990, NULL, 'Instalación, activación', NULL, NULL, FALSE, TRUE, TRUE, FALSE, NULL, NULL, TRUE),
(15, 'Curso de Excel Básico', 'Curso online de Excel básico, acceso 1 año.', 14990, NULL, 'Acceso online, material descargable', NULL, NULL, FALSE, FALSE, TRUE, FALSE, NULL, NULL, TRUE),
(16, 'Manual de Redes', 'Manual digital de redes informáticas, PDF descargable.', 9990, NULL, 'PDF, ejemplos prácticos', NULL, NULL, FALSE, FALSE, TRUE, FALSE, NULL, NULL, TRUE),
(17, 'Ebook de Programación', 'Ebook digital de introducción a la programación.', 7990, NULL, 'PDF, ejercicios', NULL, NULL, FALSE, FALSE, TRUE, FALSE, NULL, NULL, TRUE),
(18, 'Plantillas de Documentos', 'Pack de plantillas Word y Excel para oficina.', 4990, NULL, 'Pack digital', NULL, NULL, FALSE, FALSE, TRUE, FALSE, NULL, NULL, TRUE);

-- Imágenes
INSERT INTO images (url) VALUES
('https://i.postimg.cc/bZr4HtdX/notebook1-1.jpg'),('https://i.postimg.cc/cvCPMn6Y/notebook1-2.jpg'),('https://i.postimg.cc/Bjzkhn1D/notebook1-3.jpg'),
('https://i.postimg.cc/4mBr954X/mouse2-1.jpg'),('https://i.postimg.cc/18XbcqXb/mouse2-2.jpg'),('https://i.postimg.cc/87cxB6c2/mouse2-3.jpg'),
('https://i.postimg.cc/HrNRSk7X/teclado3-1.jpg'),('https://i.postimg.cc/xXZhs1bv/teclado3-2.jpg'),('https://i.postimg.cc/jD1m8SJy/teclado3-3.jpg'),
('https://i.postimg.cc/qzj93LBT/monitor4-1.jpg'),('https://i.postimg.cc/SJDwMrQk/monitor4-2.jpg'),('https://i.postimg.cc/QH0RTbNs/monitor4-3.jpg'),
('https://i.postimg.cc/6yYDv0Wg/impresora5-1.jpg'),('https://i.postimg.cc/ppqgFZW3/impresora5-2.jpg'),('https://i.postimg.cc/hfpHdrDH/impresora5-3.jpg'),
('https://i.postimg.cc/nC06DkFR/disco6-1.jpg'),('https://i.postimg.cc/4mBr95fF/disco6-2.jpg'),('https://i.postimg.cc/HVBfy2Yv/disco6-3.jpg'),
('https://i.postimg.cc/jD1m8SJJ/tablet7-1.jpg'),('https://i.postimg.cc/18d2W3Nq/tablet7-2.jpg'),('https://i.postimg.cc/RWYyPZnt/tablet7-3.jpg'),
('https://i.postimg.cc/bs3KtTyH/auriculares8-1.jpg'),('https://i.postimg.cc/3dnPvB8B/auriculares8-2.jpg'),('https://i.postimg.cc/2V2PZwkT/auriculares8-3.jpg'),
('https://i.postimg.cc/CzmWqNMT/mantencion9.jpg'),('https://i.postimg.cc/w1rZWjs5/web10.jpg'),('https://i.postimg.cc/gnNfZDzM/digitalizacion11.jpg'),('https://i.postimg.cc/tY2Lx5RH/marketing12.jpg'),('https://i.postimg.cc/gx7QM26K/windows13.jpg'),('https://i.postimg.cc/hXvNbdhK/office14.jpg'),('https://i.postimg.cc/WhXQknN8/curso15.jpg'),('https://i.postimg.cc/VdD3CRsP/manual16.jpg'),('https://i.postimg.cc/YhbJW3rV/ebook17.jpg'),('https://i.postimg.cc/68qFLvTt/plantillas18.jpg');

-- Asociar imágenes a productos
INSERT INTO product_images (product_id, image_id, orden) VALUES
(1, 1, 1),( 1, 2, 2),( 1, 3, 3),            
(2, 4, 1),( 2, 5, 2),( 2, 6, 3),            
(3, 7, 1),( 3, 8, 2),( 3, 9, 3),            
(4, 10, 1),( 4, 11, 2),( 4, 12, 3),         
(5, 13, 1),( 5, 14, 2),( 5, 15, 3),         
(6, 16, 1),( 6, 17, 2),( 6, 18, 3),         
(7, 19, 1),( 7, 20, 2),( 7, 21, 3),         
(8, 22, 1),( 8, 23, 2),( 8, 24, 3),         
(9, 25, 1),                                
(10, 26, 1),                               
(11, 27, 1),                               
(12, 28, 1),                               
(13, 29, 1),                               
(14, 30, 1),                               
(15, 31, 1),                               
(16, 32, 1),                               
(17, 33, 1),                               
(18, 34, 1);            
-- Órdenes y detalles de órdenes (ejemplo)
INSERT INTO orders (user_id, total, status) VALUES
(1, 429980, 'pagado');
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 1, 399990),
(1, 2, 1, 12990);
-- NOTA: Los totales y precios son ejemplos y pueden ajustarse según los productos añadidos a la orden.
        