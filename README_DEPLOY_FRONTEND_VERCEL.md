
# Deploy del Frontend en Vercel


## 1. Prepara tu proyecto
- Asegúrate de tener tu frontend listo en la carpeta `Frontend`.
- Verifica que el archivo `.env` de Frontend tenga la variable:
   ```
   VITE_API_BASE_URL=https://clicktech-gr34.onrender.com/api
   ```
   (Reemplaza la URL por la de tu backend en Render)

---


## 2. Sube tu código a GitHub
- Asegúrate de que la carpeta `Frontend` esté en tu repositorio.

## 3. Crea una cuenta en Vercel (si no tienes)
- Ve a https://vercel.com/ y regístrate con GitHub.

---


## 4. Importa tu proyecto
- Haz clic en "Add New Project" y selecciona tu repo.
- En "Root Directory" selecciona la carpeta `Frontend`.

---


## 5. Configura las Environment Variables
- En Vercel, ve a "Environment Variables" y agrega:
   - `VITE_API_BASE_URL` con la URL de tu backend en Render (ejemplo arriba).

---


## 6. Configura los comandos de build y start
- Build Command: `npm run build`
- Output Directory: `dist`
- (No necesitas Start Command, Vercel lo detecta automáticamente para Vite)

## 7. Despliega
- Haz clic en "Deploy".
- Espera a que termine el proceso. Vercel te dará una URL pública para tu frontend.

## 8. Prueba tu frontend
- Accede a la URL pública que te da Vercel y verifica que todo funcione y que el frontend consuma correctamente el backend en Render.

---

### Notas
- Si cambias la URL del backend, recuerda actualizar la variable en Vercel y redeployar.
- Puedes agregar más variables de entorno según necesites.
- Si tienes problemas de CORS, asegúrate de que tu backend permita el dominio de Vercel.

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
