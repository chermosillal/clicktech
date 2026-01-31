# Guía de Deploy del Frontend en Vercel

## 1. Prepara tu proyecto

- Asegúrate de tener todos los cambios subidos a GitHub.
- Verifica que el archivo .env.example en Frontend incluya la variable VITE_API_BASE_URL.

---

## 2. Crea una cuenta en Vercel

1. Ingresa a https://vercel.com/ y regístrate (puedes usar tu cuenta de GitHub).
2. Conecta tu cuenta de GitHub con Vercel.

---

## 3. Importa el proyecto

1. Haz clic en "Add New..." > "Project".
2. Selecciona el repositorio de tu proyecto `clicktech`.
3. En "Root Directory", selecciona la carpeta `Frontend`.
4. Vercel detectará automáticamente que es un proyecto Vite/React.

---

## 4. Configura las variables de entorno

1. En la sección "Environment Variables", agrega:
   - Nombre: VITE_API_BASE_URL
   - Valor: [URL de tu backend en Render]/api
   - Environment: Production (y/o Preview si quieres pruebas)

---

## 5. Configura los comandos de build y start

- Build Command: npm run build
- Output Directory: dist
- (No necesitas Start Command, Vercel sirve estáticos automáticamente)

---

## 6. Despliega

1. Haz clic en "Deploy".
2. Espera a que termine el proceso. Vercel te dará una URL pública para tu frontend.

---

## 7. Notas
- Si cambias la URL del backend, recuerda actualizar la variable VITE_API_BASE_URL en Vercel.
- Puedes hacer deploys automáticos cada vez que hagas push a main.
- Si necesitas CORS, asegúrate de que el backend permita el dominio de Vercel.

---

¡Listo! Tu frontend estará disponible en Vercel y conectado al backend en Render.
