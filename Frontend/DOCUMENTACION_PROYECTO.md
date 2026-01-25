# Documento 1: Explicación paso a paso del sistema

## 1. Estructura General y Flujo de la Aplicación

### a) App.jsx (Componente Principal)
- Punto de entrada de la aplicación React.
- Gestiona el estado global de búsqueda, filtros, usuario autenticado, visibilidad de modales y productos filtrados.
- Renderiza los componentes principales: Header, BuscadorNavbar, Centro (listado de productos), Footer y todos los modales (carrito, login, registro, perfil, checkout, éxito).
- Usa el contexto de carrito (CartContext) para compartir el estado del carrito entre componentes.

### b) Contexto de Carrito (CartContext)
- Implementado en CartContext.jsx y CartContextDef.js.
- Provee funciones para agregar, quitar y limpiar productos del carrito.
- El estado del carrito es accesible desde cualquier componente hijo de CartProvider.

### c) Productos y sus Imágenes
- Los productos están definidos en utils/productos.js (array de objetos con datos de cada producto).
- Las imágenes de productos están en utils/imagenes.js, con relación 1 a muchos (un producto puede tener varias imágenes, cada imagen es una URL web).
- Los componentes ProductCard y DetalleProd usan imagenes.js para mostrar la imagen principal o una galería.

### d) Usuarios y Autenticación
- Los usuarios de prueba están en utils/usuario.js.
- Incluye funciones para login, registro y decodificación de un “token” simulado (no seguro, solo para frontend).
- El estado del usuario autenticado se maneja en App.jsx y se pasa a los componentes que lo requieren.

### e) Búsqueda y Filtros
- BuscadorNavbar permite buscar productos por nombre o descripción y aplicar filtros (oferta, servicio, producto físico, online, todos).
- El resultado de la búsqueda y filtros se muestra en el componente Centro.

### f) Modales
- CartModal: muestra el carrito y permite modificarlo.
- CheckoutModal: simula el proceso de compra.
- SuccessModal: muestra el número de orden tras una compra exitosa.
- Login y Register: permiten autenticación y registro de usuarios.
- UserProfileModal: permite ver y editar los datos del usuario.

### g) Componentes Visuales
- Header: barra superior con acceso al carrito y logo.
- Footer: pie de página.
- UserBar: muestra el usuario autenticado y opciones de perfil/logout.
- Centro: grilla de productos filtrados.
- ProductCard: tarjeta individual de producto.
- DetalleProd: modal con galería de imágenes y detalles del producto.

---

# Documento 2: Resumen técnico de arquitectura, dependencias y despliegue

## a) Arquitectura General
- Frontend SPA: Aplicación React moderna, estructurada como Single Page Application (SPA).
- Gestión de Estado: Uso de React Context para el carrito de compras y estado local para usuario, búsqueda y modales.
- Datos simulados: Productos, usuarios e imágenes están en archivos JS (utils/), simulando una futura base de datos.
- Imágenes: Todas las imágenes de productos se gestionan por URLs externas (Postimg), centralizadas en utils/imagenes.js.
- Componentización: Cada parte visual y funcional está separada en componentes reutilizables (productos, modales, barra de usuario, buscador, etc.).

## b) Dependencias y Herramientas
- React: ^19.2.0 (core y dom)
- Vite: ^7.2.4 (build tool y servidor de desarrollo ultrarrápido)
- ESLint: ^9.39.1 (linter para mantener calidad de código)
- @vitejs/plugin-react: Integración de React con Vite
- @types/react: Tipado para desarrollo (TypeScript, aunque el proyecto es JS puro)
- Otros plugins de ESLint: Para hooks y refresh

## c) Estructura de Carpetas
- src/components/: Componentes visuales y de UI (productos, modales, header, footer, etc.)
- src/utils/: Datos simulados (productos, usuarios, imágenes, utilidades)
- src/context/: Contexto global para el carrito
- public/: Archivos estáticos (actualmente sin imágenes, ya que se usan URLs externas)

## d) Flujo de Desarrollo y Despliegue
1. Desarrollo local:
   - Instala dependencias: `npm install`
   - Corre en modo desarrollo: `npm run dev`
   - Linting: `npm run lint`
   - Build para producción: `npm run build`
   - Vista previa del build: `npm run preview`
2. Despliegue:
   - El build genera una carpeta `dist/` lista para ser servida por cualquier servidor estático (Nginx, Apache, Vercel, Netlify, etc.).
   - No requiere backend para funcionar, pero está preparado para integrarse con uno (Express, Node.js, etc.) en el futuro.
3. Escalabilidad:
   - Cuando tengas backend, solo debes reemplazar los datos simulados por llamadas a API REST.
   - La estructura de imágenes (relación 1 a muchos) ya está lista para integrarse con una base de datos real.

## e) Recomendaciones
- Mantén las URLs de imágenes en un solo archivo (imagenes.js) para facilitar migración a backend.
- Cuando implementes backend, usa endpoints para productos e imágenes, y asocia por id.
- Considera migrar la autenticación a JWT real y almacenamiento seguro de usuarios.
- Usa variables de entorno para endpoints y configuraciones sensibles.

---
