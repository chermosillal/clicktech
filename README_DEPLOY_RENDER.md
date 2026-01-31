---

## Notas sobre ramas y archivos .env

### ¿Cómo saber en qué rama estás?
Para saber en qué rama de git estás trabajando, ejecuta en la terminal:
```
git branch
```
La rama activa aparecerá con un asterisco (*). Por ejemplo:
```
* main
   otra-rama
```
Esto indica que estás en la rama main. Si ves * master, estás en master.

### Alternar entre .env local y remoto
Puedes tener dos archivos de configuración:
- `.env.local` para desarrollo local
- `.env` para producción (por ejemplo, Render)

Para alternar entre entornos, simplemente renombra el archivo que quieres usar como `.env` y el otro como `.env.local` o `.env.remoto`. Así tu backend siempre usará la configuración del archivo llamado `.env`.
---

## Conexión a la base de datos de Render con pgAdmin4

Puedes conectarte a tu base de datos de Render usando pgAdmin4 (o cualquier cliente PostgreSQL gráfico). Solo necesitas los siguientes datos que te entrega Render:

- **Host:** (por ejemplo, dpg-xxxxxx.virginia-postgres.render.com)
- **Puerto:** 5432
- **Usuario:** tu usuario de la base
- **Contraseña:** la contraseña de la base
- **Base de datos:** el nombre de la base

En pgAdmin4:
1. Abre pgAdmin4 y haz clic derecho en "Servers" > "Create" > "Server..."
2. En la pestaña "General", ponle un nombre (ej: RenderDB)
3. En la pestaña "Connection":
   - Host name/address: (el host de Render)
   - Port: 5432
   - Username: (usuario de Render)
   - Password: (contraseña de Render)
   - Database: (nombre de la base)
4. Haz clic en "Save". Ahora podrás ver y administrar tus tablas y datos desde la interfaz gráfica.
---

## Verificar la carga de datos en la base de datos

Después de ejecutar los scripts DDL.sql y DML.sql, puedes comprobar que la carga fue exitosa conectándote a la base de datos (por psql o cliente gráfico) y ejecutando:

```
SELECT * FROM users;
SELECT * FROM products;
SELECT * FROM orders;
```

Si ves filas con datos en el resultado, ¡la carga fue exitosa!

También puedes listar las tablas existentes con:
```
\dt
```

Esto te mostrará todas las tablas creadas en la base de datos.

## Gestión de credenciales de la base de datos en Render

En la sección **Credentials** de tu base de datos en Render puedes ver y administrar los usuarios que tienen acceso a la base de datos PostgreSQL. Ahí encontrarás:

- **Username**: El nombre de usuario de la base de datos (por ejemplo, `clicktech_user`).
- **Password**: La contraseña asociada a ese usuario (puedes mostrarla o copiarla desde Render).
- **Created**: Fecha/hora de creación del usuario.
- **Open Connections**: Número de conexiones activas de ese usuario.

Puedes crear nuevas credenciales (usuario/contraseña) o eliminar las antiguas. Si cambias las credenciales, **debes actualizar tu archivo `.env` en el backend** con el nuevo usuario y contraseña:

```env
DB_USER=clicktech_user
DB_PASSWORD=la_contraseña_que_copiaste
```

> **Importante:** Si usas el campo `External Database URL` que te da Render, ya incluye usuario y contraseña, pero si configuras manualmente las variables, asegúrate de que coincidan con las credenciales activas.

---

### Ejemplo de configuración .env para el backend con datos de Render

```

DB_HOST=dpg-d5umpnqli9vc739nlcn0-a.virginia-postgres.render.com
DB_USER=clicktech_user
DB_DATABASE=clicktech_db
DB_PASSWORD=zk5ZaJ6lP3tFZCjke74JIbjqx9oCpQ9v
DB_PORT=5432
DB_SSL=true
```

Usa estos valores en tu archivo Backend/.env y en las variables de entorno de Render para el backend.
> **Recomendación:**
> - **Storage:** Deja 1 GB (suficiente para proyectos pequeños; puedes aumentarlo después si lo necesitas).
> - **Storage Autoscaling:** Déjalo deshabilitado para proyectos personales o de desarrollo.
> - **High Availability:** Déjalo deshabilitado (solo disponible en planes de pago y no es necesario para desarrollo o pruebas).
> **Recomendación:** Selecciona el plan Free al crear tu base de datos o servicio en Render si es para desarrollo, pruebas o proyectos personales. Así no tendrás costos asociados.
> **Nota:** Los campos Datadog API Key y Datadog Region son opcionales y solo necesarios si quieres monitorear tu base de datos con Datadog. Para la mayoría de los proyectos personales o educativos, puedes dejarlos vacíos.
> **Recomendación:** Selecciona la misma versión de PostgreSQL en Render que tienes en tu computador local (por ejemplo, 17.x). Así evitas incompatibilidades y aseguras que todo funcione igual en ambos entornos.
# Guía de Deploy en Render: Base de Datos y Backend

## 1. Crear y Configurar la Base de Datos PostgreSQL en Render

1. Ingresa a https://dashboard.render.com/
2. Haz clic en "New +" y selecciona "PostgreSQL".
3. Asigna un nombre a tu base de datos:
      - **User (opcional):** Puedes dejarlo vacío y Render generará un usuario automáticamente, o puedes poner un nombre personalizado (por ejemplo, clicktech_user). Ese usuario lo usarás en tu variable DB_USER.
      - **Region:** Elige la región más cercana a tus usuarios o donde esté tu backend. Virginia (US East) es una buena opción si tu backend también estará ahí.
      - **PostgreSQL Version:** Selecciona la versión más reciente y estable disponible (por ejemplo, 15, 16 o 18). Si tienes una versión específica en tu entorno local, puedes verificarla y elegir la misma para evitar incompatibilidades.
   ### ¿Cómo saber la versión de PostgreSQL en tu computador?

   Abre una terminal y ejecuta:

      psql --version

   o, si tienes el cliente instalado:

      postgres --version

   Esto te mostrará la versión instalada localmente.
   - **Name:** instancia_chl (nombre único para identificar tu instancia en Render)
   - **Database (dbname):** clicktech_db (nombre real de la base de datos, lo usas en DB_DATABASE)
   - El "Name" es solo para identificar tu instancia en el panel de Render.
   - El nombre real de la base de datos (Database/dbname) lo verás en las credenciales que Render te entrega y es el que debes usar en tu variable de entorno DB_DATABASE.
   - Ambos pueden ser iguales o distintos, no hay problema.
   - **IMPORTANTE:** El nombre de la base de datos no puede tener guiones (-), solo guiones bajos (_).
   - **IMPORTANTE:** En el plan gratuito de Render solo puedes crear una instancia de base de datos PostgreSQL por cuenta.
4. Espera a que Render cree la base y copia las credenciales (host, user, password, database, port).
5. En la sección de tu base, ve a "Databases" > "Connect" y copia la URL de conexión.
6. (Opcional) Usa un cliente como DBeaver o TablePlus para conectarte y cargar tu DDL.sql y DML.sql (en Backend/schema/) para crear las tablas y datos iniciales.

    También puedes hacerlo desde la terminal usando psql:
    - Conéctate a la base de datos con el comando:
       ```
       psql postgresql://USUARIO:CONTRASEÑA@HOST/DATABASE
       ```
    - Una vez dentro de psql, ejecuta:
       ```
       \i 'ruta/completa/al/DDL.sql'
       \i 'ruta/completa/al/DML.sql'
       ```
       Por ejemplo:
       ```
       \i 'D:/ESTUDIOS/DESAFIO-LATAM/FULL_STACK/M7) PROYECTO/Proyecto_final/clicktech/Backend/schema/DDL.sql'
       \i 'D:/ESTUDIOS/DESAFIO-LATAM/FULL_STACK/M7) PROYECTO/Proyecto_final/clicktech/Backend/schema/DML.sql'
       ```
    - Alternativamente, puedes copiar y pegar todo el contenido de los scripts directamente en el prompt de psql, pero si los archivos son largos, la opción \i es más práctica y segura.

---

## 2. Deploy del Backend en Render

1. En Render, haz clic en "New +" y selecciona "Web Service".
2. Conecta tu repositorio de GitHub y selecciona el proyecto `clicktech`.
3. Elige la carpeta Backend como root del servicio. En el campo **Root Directory** de Render, escribe:
   ```
   ./Backend
   ```
   Esto asegura que Render use la carpeta Backend como raíz del servicio y ejecute correctamente las dependencias y el backend.
4. Configura el build command:  
   npm install
5. Configura el start command:
   Puedes usar cualquiera de estas dos opciones:
   - Recomendado: 
     ```
     npm start
     ```
     (usa el script "start" definido en tu package.json)
   - Alternativa:
     ```
     node index.js
     ```
     (ejecuta directamente el archivo principal)

   Usar `npm start` es preferido porque es más estándar y permite cambiar el archivo de entrada fácilmente desde package.json. Ambas opciones funcionan si están bien configuradas.
6. En "Environment Variables", agrega las variables:
   - DB_HOST
   - DB_USER
   - DB_DATABASE
   - DB_PASSWORD
   - DB_PORT
   - JWT_SECRET
   (Usa los valores de la base de datos creada en el paso anterior)
7. Haz clic en "Create Web Service" y espera a que Render haga el deploy.
8. Cuando esté listo, copia la URL pública del backend (por ejemplo, https://clicktech-backend.onrender.com).

---

## 3. (Opcional) Deploy del Frontend

1. Repite el proceso para crear un nuevo Web Service, pero selecciona la carpeta Frontend.
2. Build command:  
   npm install && npm run build
3. Start command:  
   npm run preview
4. En "Environment Variables", agrega:
   - VITE_API_BASE_URL = [URL de tu backend en Render]/api
5. Haz clic en "Create Web Service".

---

## Notas
- Asegúrate de que el backend permita CORS desde el dominio del frontend.
- Si tienes dudas sobre la carga de datos, puedes ejecutar los scripts DDL.sql y DML.sql desde un cliente conectado a la base de datos de Render.
- No subas tus archivos .env reales a GitHub, solo los .env.example.

---

¡Listo! Así tendrás tu base y backend funcionando en Render.
