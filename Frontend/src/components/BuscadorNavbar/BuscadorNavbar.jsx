
import "./BuscadorNavbar.css";
export default function BuscadorNavbar(props) {
  const {
    busqueda,
    setBusqueda,
    filtros,
    setFiltros,
    onBuscar
  } = props;
  // Valor por defecto para filtros
  const filtrosSafe = filtros || {};
  const handleInput = (e) => setBusqueda(e.target.value);
  const handleBuscar = (e) => {
    e.preventDefault();
    onBuscar && onBuscar();
  };

  // Manejo de filtros
  const handleFiltroChange = (e) => {
    const { name, checked } = e.target;
    if (name === "todos") {
      if (checked) {
        setFiltros && setFiltros({ oferta: false, servicio: false, producto: false, online: false, todos: true });
      } else {
        setFiltros && setFiltros({ ...filtrosSafe, todos: false });
      }
    } else {
      setFiltros && setFiltros({ ...filtrosSafe, [name]: checked, todos: false });
    }
  };

  return (
    <div className="buscador-navbar">
      <div className="buscador-row">
        <input
          className="search"
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={handleInput}
        />
        <button className="search-btn" onClick={handleBuscar}>Buscar</button>
      </div>
      <div className="buscador-filtros">
        <label>
          <input
            type="checkbox"
            name="oferta"
            checked={!!filtrosSafe.oferta}
            onChange={handleFiltroChange}
          />
          Ofertas
        </label>
        <label>
          <input
            type="checkbox"
            name="servicio"
            checked={!!filtrosSafe.servicio}
            onChange={handleFiltroChange}
          />
          Servicios
        </label>
        <label>
          <input
            type="checkbox"
            name="producto"
            checked={!!filtrosSafe.producto}
            onChange={handleFiltroChange}
          />
          Productos
        </label>
        <label>
          <input
            type="checkbox"
            name="online"
            checked={!!filtrosSafe.online}
            onChange={handleFiltroChange}
          />
          Online
        </label>
        <label>
          <input
            type="checkbox"
            name="todos"
            checked={!!filtrosSafe.todos}
            onChange={handleFiltroChange}
          />
          Todos
        </label>
      </div>
    </div>
  );
}
