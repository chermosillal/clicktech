import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import BuscadorNavbar from './components/BuscadorNavbar/BuscadorNavbar';
import Centro from './components/Centro/Centro';
import Footer from './components/Footer/Footer';
import ModalManager from './components/ModalManager';
import { useContext } from 'react';
import CartContext from './context/CartContextDef';
//import ModalContext from './context/ModalContextDef';
import useProductos from './hooks/useProductos';
import useModal from './hooks/useModal';

export default function AppContent({ usuario, setUsuario }) {
  //const { openModal, closeModal} = useContext(ModalContext);
  const { openModal, closeModal } = useModal();
  function handleLogin(user) {
    setUsuario(user);
    closeModal(); // Cierra el modal de login correctamente
    if (window._loginFromCart) {
      openModal('cart', { isLoggedIn: true });
      window._loginFromCart = false;
    }
  }
  const {
    busqueda, setBusqueda, filtros, setFiltros,
    productosFiltrados, mensajeError, handleBuscar, recargarProductos
  } = useProductos();

  useEffect(() => {
    recargarProductos(usuario);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario]);
  const { cart, addToCart, clearCart } = useContext(CartContext);

  return (
    <div className="app-container">
      <Header 
        cartCount={cart.reduce((sum, item) => sum + item.cantidad, 0)}
        userRole={usuario ? usuario.role : ""}
        onCartClick={() => openModal('cart', {
          isLoggedIn: !!usuario,
          userRole: usuario ? usuario.role : "",
          onLoginClick: () => openModal('login'),
          onBuy: () => openModal('checkout', {
            onConfirm: () => {
              openModal('success', { mensaje: '¡Compra realizada con éxito!' });
              clearCart();
            }
          })
        })}
      />
      <BuscadorNavbar
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        filtros={filtros}
        setFiltros={setFiltros}
        onBuscar={handleBuscar}
        mensajeError={mensajeError}
      />
      <Centro
        productos={productosFiltrados}
        mensajeError={mensajeError}
        onAddToCart={addToCart}
        isLoggedIn={!!usuario}
        userName={usuario ? (usuario.nombre || usuario.email || "") : ""}
        userRole={usuario ? usuario.role : ""}
        userToken={usuario ? usuario.token : null}
        onLogoutClick={() => setUsuario(null)}
        onLoginClick={() => openModal('login')}
        onShowProfile={() => openModal('profile', { user: usuario })}
        onAddProd={() => openModal('addProd')}
        recargarProductos={() => recargarProductos(usuario)}
      />
      <Footer />
      <ModalManager onLogin={handleLogin} onProfileSave={setUsuario} />
    </div>
  );
}
