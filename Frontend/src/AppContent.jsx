import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import BuscadorNavbar from './components/BuscadorNavbar/BuscadorNavbar';
import Centro from './components/Centro/Centro';
import Footer from './components/Footer/Footer';
import ModalManager from './components/ModalManager';
import { useContext } from 'react';
import CartContext from './context/CartContextDef';
import BASE_URL from './config/baseUrl';
import useProductos from './hooks/useProductos';
import useModal from './hooks/useModal';

export default function AppContent({ usuario, setUsuario }) {
  //const { openModal, closeModal} = useContext(ModalContext);
  const { openModal, closeModal } = useModal();
  function handleLogin(user) {
    setUsuario(user);
    closeModal(); // Cierra el modal de login correctamente
    // El flujo de abrir el modal del carrito se maneja en el useEffect de abajo
  }
    // Si el login vino desde el carrito, abrir el modal del carrito solo cuando usuario esté actualizado
    useEffect(() => {
      if (window._loginFromCart && usuario) {
        openModal('cart', { isLoggedIn: true });
        window._loginFromCart = false;
        // No abrir el checkout automáticamente, el usuario debe hacer clic en Comprar
      }
    }, [usuario, openModal]);
  const {
    busqueda, setBusqueda, filtros, setFiltros,
    productosFiltrados, mensajeError, handleBuscar, recargarProductos
  } = useProductos();

  useEffect(() => {
    recargarProductos(usuario);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario]);
  const { cart, addToCart, removeFromCart, deleteFromCart, clearCart } = useContext(CartContext);

  // Handler para confirmar compra y mostrar número de orden
  async function handleConfirmCompra({ pago, envio }) {
    try {
      console.log('Usuario antes de comprar:', usuario);
      console.log('Token usado:', usuario?.token);
      const ordenPayload = {
        items: cart.map(({ id, cantidad }) => ({ product_id: id, cantidad })),
        pago,
        envio
      };
      console.log('Enviando orden al backend:', ordenPayload);
      const res = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(usuario?.token ? { 'Authorization': `Bearer ${usuario.token}` } : {})
        },
        body: JSON.stringify(ordenPayload)
      });
      console.log('Respuesta fetch (raw):', res);
      if (!res.ok) throw new Error('Error al crear la orden');
      const data = await res.json();
      console.log('Respuesta backend orden (json):', data); // <-- LOG PARA DEPURAR
      openModal('success', { numeroOrden: data.numero_orden });
      clearCart();
    } catch (e) {
      console.error('Error en handleConfirmCompra:', e);
      openModal('success', { mensaje: 'Error al procesar la compra' });
    }
  }

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
            onConfirm: handleConfirmCompra
          }),
          onRemove: removeFromCart,
          onDelete: deleteFromCart,
          onAdd: (id) => {
            const item = cart.find(i => i.id === id);
            if (item) addToCart(item);
          }
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
      <ModalManager onLogin={handleLogin} onProfileSave={setUsuario} handleConfirmCompra={handleConfirmCompra} />
    </div>
  );
}
