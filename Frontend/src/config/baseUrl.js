// Configuración de la URL base para el backend
// Usa import.meta.env.VITE_API_BASE_URL para permitir configuración por variable de entorno en Vite

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api";

export default BASE_URL;
