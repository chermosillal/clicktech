

import React, { useState, useEffect } from 'react';
import BASE_URL from './config/baseUrl';
// import productosData from './utils/productos';
// import { usuarios } from './utils/usuario';
import Header from './components/Header/Header';
import { CartProvider } from './context/CartContext';
import CartContext from './context/CartContextDef';
import CartModal from './components/Modal/CartModal/CartModal';
import CheckoutModal from './components/Modal/CheckoutModal/CheckoutModal';
import SuccessModal from './components/Modal/SuccessModal/SuccessModal';
import BuscadorNavbar from './components/BuscadorNavbar/BuscadorNavbar';
import Centro from './components/Centro/Centro';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import RecuperarPasswordModal from './components/Modal/RecuperarPasswordModal/RecuperarPasswordModal';
import Register from './components/Register/Register';
import './App.css';
import UserProfileModal from './components/Modal/UserProfileModal/UserProfileModal';
import AddProductModal from './components/Modal/AddProductModal/AddProductModal';


function App() {
  const [busqueda, setBusqueda] = useState("");
  const [filtros, setFiltros] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [mensajeError, setMensajeError] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [usuario, setUsuario] = useState(() => {
    try {
      const stored = localStorage.getItem('usuario');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [showRegister, setShowRegister] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [numeroOrden, setNumeroOrden] = useState(null);
  const [showRecuperar, setShowRecuperar] = useState(false);
  const [showAddProd, setShowAddProd] = useState(false);
  // Track if login was initiated from cart
  const [loginSource, setLoginSource] = useState(null); // null | 'cart' | 'other'
  // Track if user tried to buy while not logged in
  const [pendingBuy, setPendingBuy] = useState(false);

  const handleBuscar = () => {
    const algunaCategoria = filtros.oferta || filtros.servicio || filtros.producto || filtros.online || filtros.todos;
    if (algunaCategoria && !busqueda.trim()) {
      setMensajeError("Debes ingresar una palabra para buscar.");
      setProductosFiltrados([]);
      return;
    }
    setMensajeError("");
    let resultado = productos;
    if (filtros.todos) {
      // no filtrar
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
    if (busqueda.trim()) {
      const palabra = busqueda.trim().toLowerCase();
      resultado = resultado.filter(p =>
        p.nombre.toLowerCase().includes(palabra) ||
        p.descripcion.toLowerCase().includes(palabra)
      );
    }
    if (!algunaCategoria && !busqueda.trim()) {
      resultado = productos.filter(p => p.destacado);
    }
    setProductosFiltrados(resultado);
  };

  // Cargar productos desde la API al montar
  // Guardar usuario en localStorage al cambiar
  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuario');
    }
  }, [usuario]);

  useEffect(() => {
    const isAdmin = usuario && usuario.role === 'admin';
    const url = isAdmin ? `${BASE_URL}/products?admin=1` : `${BASE_URL}/products`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setProductosFiltrados(data.filter(p => p.destacado));
      })
      .catch(() => setMensajeError('Error al cargar productos desde el servidor.'));
  }, [usuario]);

  return (
    <CartProvider>
      <CartContext.Consumer>
        {({ cart, addToCart, removeFromCart, clearCart }) => (
          <div className="app-container">
            <Header onCartClick={() => setShowCart(true)} cartCount={cart.reduce((sum, item) => sum + item.cantidad, 0)} />
            <BuscadorNavbar
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              filtros={filtros}
              setFiltros={setFiltros}
              onBuscar={handleBuscar}
            />
            <Centro
              productos={productosFiltrados}
              mensajeError={mensajeError}
              onAddToCart={addToCart}
              isLoggedIn={!!usuario}
              userName={usuario ? (usuario.nombre || usuario.username || usuario.email) : ""}
              userRole={usuario ? usuario.role : ""}
              userToken={usuario ? usuario.token : null}
              onLoginClick={() => setShowLogin(true)}
              onLogoutClick={() => setUsuario(null)}
              onShowProfile={async () => {
                if (usuario && usuario.token) {
                  try {
                    const res = await fetch(`${BASE_URL}/users/me`, {
                      headers: { 'Authorization': `Bearer ${usuario.token}` }
                    });
                    if (res.ok) {
                      const data = await res.json();
                      setUsuario({ ...usuario, ...data });
                    }
                  } catch {
                    // Error al obtener datos de usuario
                  }
                }
                setShowProfile(true);
              }}
              onAddProd={() => { if (usuario?.role === 'admin') setShowAddProd(true); }}
              recargarProductos={async () => {
                const isAdmin = usuario && usuario.role === 'admin';
                const url = isAdmin ? `${BASE_URL}/products?admin=1` : `${BASE_URL}/products`;
                const res = await fetch(url);
                const data = await res.json();
                setProductos(data);
                // Reaplicar filtro/búsqueda actual
                let resultado = data;
                if (filtros.todos) {
                  // no filtrar
                } else {
                  if (filtros.oferta) resultado = resultado.filter(p => p.oferta);
                  if (filtros.servicio) resultado = resultado.filter(p => p.servicio);
                  if (filtros.producto) resultado = resultado.filter(p => !p.no_fisico);
                  if (filtros.online) resultado = resultado.filter(p => p.no_fisico);
                }
                if (busqueda && busqueda.trim()) {
                  const palabra = busqueda.trim().toLowerCase();
                  resultado = resultado.filter(p =>
                    p.nombre.toLowerCase().includes(palabra) ||
                    p.descripcion.toLowerCase().includes(palabra)
                  );
                }
                if (!filtros.todos && !filtros.oferta && !filtros.servicio && !filtros.producto && !filtros.online && !busqueda.trim()) {
                  resultado = data.filter(p => p.destacado);
                }
                setProductosFiltrados(resultado);
              }}
            />
            {showProfile && usuario && (
              <UserProfileModal
                user={usuario}
                onSave={nuevo => { setUsuario(nuevo); setShowProfile(false); }}
                onClose={() => setShowProfile(false)}
              />
            )}
            {showAddProd && usuario?.role === 'admin' && (
              <AddProductModal
                token={usuario.token}
                onClose={() => setShowAddProd(false)}
                onAdd={() => {
                  // Recargar productos tras agregar
                  fetch(`${BASE_URL}/products`)
                    .then(res => res.json())
                    .then(data => {
                      setProductos(data);
                      setProductosFiltrados(data.filter(p => p.destacado));
                    });
                }}
              />
            )}
            <Footer />
            {showCart && (
              <CartModal
                cart={cart}
                onClose={() => setShowCart(false)}
                onAdd={id => addToCart(cart.find(item => item.id === id))}
                onRemove={id => removeFromCart(id)}
                onDelete={id => removeFromCart(id)}
                isLoggedIn={!!usuario}
                onLoginClick={() => {
                  setLoginSource('cart');
                  setShowCart(false);
                  setTimeout(() => setShowLogin(true), 200);
                }}
                onBuy={() => {
                  if (!usuario) {
                    setPendingBuy(true);
                    setLoginSource('cart');
                    setShowCart(false);
                    setTimeout(() => setShowLogin(true), 200);
                  } else {
                    setShowCart(false);
                    setTimeout(() => setShowCheckout(true), 200);
                  }
                }}
              />
            )}
            {showCheckout && (
              <CheckoutModal
                direccion={usuario?.direccion}
                onCancel={() => setShowCheckout(false)}
                onConfirm={async ({ pago, envio }) => {
                  setShowCheckout(false);
                  // Enviar orden al backend
                  try {
                    const token = usuario?.token;
                    const items = cart.map(item => ({ product_id: item.id, cantidad: item.cantidad }));
                    const res = await fetch(`${BASE_URL}/orders`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                      },
                      body: JSON.stringify({ items, pago, envio })
                    });
                    if (!res.ok) throw new Error('Error al procesar la orden');
                    const data = await res.json();
                    setNumeroOrden(data.numero_orden || data.id);
                    setShowSuccess(true);
                    clearCart();
                  } catch {
                    setNumeroOrden('ERROR');
                    setShowSuccess(true);
                  }
                }}
              />
            )}
            {showSuccess && (
              <SuccessModal
                numeroOrden={numeroOrden}
                onClose={() => setShowSuccess(false)}
              />
            )}
            {showLogin && (
              <Login
                onLogin={user => {
                  setUsuario(user);
                  setShowLogin(false);
                  // Si el login fue por presionar 'comprar', ir directo a checkout
                  if (pendingBuy) {
                    setPendingBuy(false);
                    setLoginSource(null);
                    setTimeout(() => setShowCheckout(true), 200);
                  } else if (loginSource === 'cart') {
                    setLoginSource(null);
                    setTimeout(() => setShowCart(true), 200);
                  } else {
                    setLoginSource(null);
                  }
                }}
                onClose={() => setShowLogin(false)}
                onShowRegister={() => { setShowLogin(false); setShowRegister(true); }}
                onShowRecuperar={() => { setShowLogin(false); setShowRecuperar(true); }}
              />
            )}
            {showRecuperar && (
              <RecuperarPasswordModal
                onClose={() => setShowRecuperar(false)}
                onShowLogin={() => setShowLogin(true)}
              />
            )}
            {showRegister && (
              <Register
                onRegister={() => {}}
                onClose={() => setShowRegister(false)}
                onShowLogin={() => setShowLogin(true)}
              />
            )}
          </div>
        )}
      </CartContext.Consumer>
    </CartProvider>
  );
}

export default App;
