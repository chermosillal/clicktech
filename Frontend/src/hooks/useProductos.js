import { useRef, useState } from 'react';
import BASE_URL from '../config/baseUrl';
console.log('useProductos.js cargado');
export default function useProductos() {
  // Siempre iniciar vacíos para que al recargar se muestren destacados
  const filtrosIniciales = { oferta: false, servicio: false, producto: false, online: false, todos: false };
  const primeraCarga = useRef(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtros, setFiltros] = useState(filtrosIniciales);
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [mensajeError, setMensajeError] = useState("");

  const handleBuscar = () => {
    const algunaCategoria = filtros.oferta || filtros.servicio || filtros.producto || filtros.online || filtros.todos;
    const hayTexto = !!busqueda.trim();

    // Caso 1: Buscar sin texto ni categoría
    if (!hayTexto && !algunaCategoria) {
      setMensajeError("Debe ingresar un texto y seleccionar una categoría");
      setProductosFiltrados([]);
      return;
    }
    // Caso 2: Buscar con texto pero sin categoría
    if (hayTexto && !algunaCategoria) {
      setMensajeError("Debes seleccionar categoría");
      setProductosFiltrados([]);
      return;
    }
    // Caso 3: Buscar con categoría pero sin texto
    if (!hayTexto && algunaCategoria) {
      setMensajeError("Debe ingresar un texto y seleccionar una categoría");
      setProductosFiltrados([]);
      return;
    }
    // Caso 4: Buscar con texto y categoría
    setMensajeError("");
    let resultado = productos;
    if (filtros.todos) {
      // Buscar en todos
    } else {
      const checks = [];
      if (filtros.oferta) checks.push(p => p.oferta);
      if (filtros.servicio) checks.push(p => p.servicio);
      if (filtros.producto) checks.push(p => !p.no_fisico);
      if (filtros.online) checks.push(p => p.no_fisico);
      if (checks.length > 0) {
        resultado = resultado.filter(p => checks.some(fn => fn(p)));
      }
    }
    if (hayTexto) {
      const palabra = busqueda.trim().toLowerCase();
      resultado = resultado.filter(p =>
        p.nombre.toLowerCase().includes(palabra) ||
        p.descripcion.toLowerCase().includes(palabra)
      );
    }
    setProductosFiltrados(resultado);
  };

  const recargarProductos = async (usuario) => {
    try {
      const isAdmin = usuario && usuario.role === 'admin';
      const url = isAdmin ? `${BASE_URL}/products?admin=1` : `${BASE_URL}/products`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Error al obtener productos: ' + res.status);
      }
      const data = await res.json();
      setProductos(data);
      if (primeraCarga.current) {
        setBusqueda("");
        setFiltros(() => ({ ...filtrosIniciales }));
        primeraCarga.current = false;
      }
      setProductosFiltrados(data.filter(p => p.destacado));
    } catch (error) {
      setMensajeError('No se pudieron cargar los productos. ' + error.message);
      setProductosFiltrados([]);
      console.error('Error en recargarProductos:', error);
    }
  };

  return {
    busqueda, setBusqueda, filtros, setFiltros,
    productosFiltrados, setProductos, setProductosFiltrados,
    mensajeError, handleBuscar, recargarProductos
  };
}
