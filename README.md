
## 🚀 Ruta de Deploy Productivo

**Sitio en producción:**
https://clicktech-wine.vercel.app/

> **Nota:** El fronteend está alojado en Vercel, pero el backend y la base de datos están alojados en Render. Debido a las limitaciones del plan gratuito, los servicios pueden entrar en modo reposo cuando no hay actividad. Por ello, al acceder por primera vez o tras un periodo de inactividad, es posible que debas esperar unos segundos para que los endpoints respondan y se muestren los productos.


# ClickTech

ClickTeach es una plataforma de e-commerce y servicios digitales desarrollada con Node.js, PostgreSQL y React. Permite la gestión de productos físicos y digitales, compras, administración de usuarios y un panel de administración para el equipo.

## Consideraciones del desarrollo

Este desarrollo surge de la inquietud de crear un e-commerce propio, sin depender de plantillas ni estándares predefinidos, trabajando todo el código desde cero. El objetivo principal fue poner en práctica lo aprendido y, al mismo tiempo, lograr la mayor personalización posible en cada aspecto de la plataforma.

- No se utilizó ninguna librería de estilos como Bootstrap o Tailwind; todo el diseño se realizó con CSS puro (flex, grid, @media).
- El diseño es completamente responsivo, siguiendo la filosofía mobile first.
- No se implementaron rutas (routes), ya que toda la navegación se gestiona mediante modales. La idea es que la página principal permanezca siempre visible. En una segunda etapa, se agregarán rutas para crear secciones como seguimiento de compras, espacios públicos (quiénes somos, cómo funcionamos, ubicaciones, etc.).
- La administración de productos está integrada en el mismo frontend; sin embargo, la idea para una próxima fase es migrar la administración a un frontend separado, permitiendo así ambientes diferenciados para clientes y administradores, y facilitando la gestión de compras, seguimiento de pedidos, distribución, stock y proveedores.

## Usuarios de prueba
- Cliente: `cliente@demo.com` / `123`
- Admin: `admin@demo.com` / `123`

## Características principales
- Catálogo de productos físicos y digitales
- Carrito de compras y flujo de pago (en desarrollo)
- Gestión de stock y disponibilidad
- Ficha técnica en PDF para productos
- Panel de administración (productos, stock, visibilidad)
- Autenticación de usuarios (cliente y admin)
- Backend en Node.js + Express + PostgreSQL
- Frontend en React (Vite)

## Estructura del proyecto
```
Backend/
  src/
    controllers/
    models/
    routes/
    config/
  schema/
    DDL.sql
    DML.sql
Frontend/
  src/
    components/
    context/
    utils/
  public/
```

## Dependencias principales

### Backend
- express
- pg
- cors
- dotenv
- jsonwebtoken
- bcrypt

#### Dependencias de desarrollo backend
- nodemon
- jest (tests unitarios y de integración)
- supertest (tests de endpoints HTTP)

Instala todas con:
```bash
npm install
```

### Frontend
- react
- react-dom
- vite

#### Dependencias de desarrollo frontend
- @vitejs/plugin-react
- eslint
- @eslint/js
- eslint-plugin-react-hooks
- eslint-plugin-react-refresh
- @types/react
- @types/react-dom
- globals

Instala todas con:
```bash
npm install
```

## Instalación y ejecución
### Backend
1. Instala dependencias:
   ```bash
   cd Backend
   npm install
   ```
2. Configura tu base de datos PostgreSQL y variables en `.env`.
3. Ejecuta migraciones y carga datos:
   ```bash
   psql -U tu_usuario -d clickteach -f schema/DDL.sql
   psql -U tu_usuario -d clickteach -f schema/DML.sql
   ```
4. Inicia el servidor:
   ```bash
   npm run dev
   ```

### Frontend
1. Instala dependencias:
   ```bash
   cd Frontend
   npm install
   ```
2. Inicia la app:
   ```bash
   npm run dev
   ```



## Pendiente / Roadmap
- Integración de pasarela de pago
- Gestión de despachos y seguimiento
- Subida de archivos (imágenes y PDFs) al backend
- Subsitio de administración avanzado (ClickTeach-ADM)

## Tipos de acceso y diferencias de menú

ClickTeach implementa tres tipos de acceso, cada uno con su propio menú y funcionalidades:

### 1. Acceso Público
- **Quiénes acceden:** Visitantes no autenticados.
- **Menú:**
  - Catálogo de productos (solo productos disponibles)
  - Búsqueda y filtrado
  - Carrito de compras
  - Registro e inicio de sesión
- **Restricciones:** No pueden comprar ni ver información privada, ni acceder a la administración.

### 2. Acceso Privado (Usuario Cliente)
- **Quiénes acceden:** Usuarios registrados (rol cliente).
- **Menú:**
  - Todo lo del acceso público
  - Realizar compras
  - Ver historial de pedidos *(pendiente)*
  - Acceso a perfil y edición de datos
- **Restricciones:** No pueden administrar productos ni ver opciones de gestión.

### 3. Acceso Privado-Admin
- **Quiénes acceden:** Usuarios con rol admin.
- **Menú:**
  - Todo lo del acceso privado
  - Gestión de productos (agregar, editar, ocultar, eliminar)
  - Gestión de stock y visibilidad
  - Acceso a panel de administración
  - Visualización de productos no disponibles (con capa gris)
  - Acceso a reportes y futuras funciones de despacho/pagos *(pendiente)*
- **Restricciones:**
  - Acceso total a la administración: pueden agregar, editar, ocultar y eliminar productos, gestionar stock y visibilidad, y acceder a reportes y paneles de gestión.
  - No pueden realizar compras: el sistema impide que los administradores agreguen productos al carrito o finalicen compras, tanto en la vista de catálogo como en el detalle de producto. Esta restricción es visible en la interfaz (no aparece el botón de compra para admins) y puede ser reforzada en el backend para máxima seguridad.
  - Visualización extendida: pueden ver todos los productos, incluyendo los no disponibles (aparecen con una capa gris), a diferencia de los clientes y visitantes.
  - Menú adaptado: el menú muestra opciones exclusivas de administración y oculta las de compra.

Cada tipo de acceso muestra un menú adaptado a sus permisos, asegurando una experiencia personalizada y segura para cada usuario.

## Cumplimiento de requerimientos HITO 3 backend

1. **Proyecto npm y dependencias:**
   - El backend se inicializó con `npm init` y todas las dependencias necesarias están listadas en `package.json`.

2. **Conexión PostgreSQL con pg:**
   - El archivo `src/config/db.js` utiliza el paquete `pg` para gestionar la conexión a la base de datos PostgreSQL.

3. **Autenticación y autorización con JWT:**
   - El middleware `src/middlewares/authMiddleware.js` implementa la validación de tokens JWT y la autorización de roles (admin/cliente).
   - Las rutas protegidas usan este middleware para restringir el acceso según el rol.

4. **CORS:**
   - En `src/app.js` se utiliza `app.use(cors())` para permitir solicitudes de orígenes cruzados.

5. **Middlewares de validación:**
   - Las rutas protegidas (usuarios, productos, pedidos) usan `authenticateToken` y/o `isAdmin` para validar credenciales y permisos.

6. **Tests de API (al menos 4 rutas):**
   - Ejemplo de 4 rutas que puedes probar manualmente con Postman:
     1. **POST /api/auth/register**
        - Registra un nuevo usuario enviando un JSON con `username` y `password`.
     2. **POST /api/auth/login**
        - Inicia sesión y recibe un token JWT enviando `username` y `password`.
     3. **GET /api/products**
        - Obtiene el listado de productos disponibles (no requiere autenticación).
     4. **GET /api/users/me**
        - Devuelve el perfil del usuario autenticado (requiere enviar el token JWT en el header `Authorization`).
    
   - El archivo `tests/api.test.js` contiene pruebas automáticas usando `jest` y `supertest` para simular peticiones HTTP y verificar el comportamiento de la API. Las pruebas incluidas son:
     - **Registro de usuario nuevo:**
       - Envía un POST a `/api/auth/register` con datos de usuario.
       - Verifica que la respuesta sea 201 (creado) y que el usuario se registre correctamente.
     - **Registro duplicado (error):**
       - Intenta registrar dos veces el mismo usuario.
       - Verifica que la segunda vez la API responda con un error 400 (usuario ya existe).
     - **Login y obtención de token:**
       - Registra un usuario y luego hace login con sus credenciales.
       - Verifica que la respuesta sea 200 y que se reciba un token JWT.
     - **Listado de productos:**
       - Hace un GET a `/api/products`.
       - Verifica que la respuesta sea 200 y que el resultado sea un array (aunque esté vacío).

   - En cada prueba se comprueba el código de estado HTTP y que la respuesta tenga la estructura esperada, asegurando que la API responde correctamente en escenarios normales y de error.
   - Para ejecutar los tests, usa:
     ```bash
     npm test
     ```
   - Para los tests, se utiliza una conexión de base de datos de pruebas definida en `src/config/test-db-connection.js`, lo que permite aislar los datos de testeo del entorno de producción.

7. **Arquitectura MVC (Modelo-Vista-Controlador):**
   - El backend está estructurado siguiendo el patrón MVC:
     - **Modelos:** En `src/models/` se definen los modelos de datos y la lógica de acceso a la base de datos (por ejemplo, `userModel.js`, `productModel.js`).
     - **Controladores:** En `src/controllers/` se implementa la lógica de negocio y el manejo de las peticiones HTTP (por ejemplo, `userController.js`, `productController.js`).
     - **Rutas:** En `src/routes/` se definen los endpoints de la API y se conectan con los controladores (por ejemplo, `userRoutes.js`, `productRoutes.js`).
   - Puedes comprobar la implementación MVC revisando la estructura de carpetas y observando cómo cada ruta importa su controlador y cada controlador utiliza los modelos para acceder a los datos.

8. **Consideraciones sobre roles, perfil y restricciones**
   Tras editar el perfil, la información del usuario se actualiza automáticamente en la UI y en el almacenamiento local, asegurando que siempre se muestre la versión más reciente.
   El usuario admin no puede comprar ni abrir el carrito; estas restricciones están implementadas tanto en la interfaz como en la lógica de los componentes.
   La UI y las opciones disponibles se adaptan dinámicamente según el rol del usuario (cliente o admin), garantizando una experiencia coherente y segura.


---
Desarrollado por [Cesar Hermosilla Legent] - 2026
