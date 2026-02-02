// Este componente se encargará de mostrar y controlar todos los modales de la app.
// Recibe los estados y handlers como props desde App.jsx
import useModal from '../hooks/useModal';
import CartContext from '../context/CartContextDef';
import React, { useContext } from 'react';
import CartModal from './Modal/CartModal/CartModal';
import CheckoutModal from './Modal/CheckoutModal/CheckoutModal';
import SuccessModal from './Modal/SuccessModal/SuccessModal';
import Login from './Login/Login';
import RecuperarPasswordModal from './Modal/RecuperarPasswordModal/RecuperarPasswordModal';
import Register from './Register/Register';
import UserProfileModal from './Modal/UserProfileModal/UserProfileModal';
import AddProductModal from './Modal/AddProductModal/AddProductModal';

// Aquí deberías obtener los datos globales necesarios (usuario, cart, etc.) desde contextos o props globales
// Para este ejemplo, se asume que esos datos se obtienen de contextos o props superiores

export default function ModalManager(props) {
  const { modal, closeModal, extra, openModal } = useModal();
  const { cart, addToCart, removeFromCart, deleteFromCart, clearCart } = useContext(CartContext);
  // Puedes obtener usuario, cart, etc. desde contextos o props si es necesario
  // const { usuario, cart, ... } = useContext(UsuarioContext) etc.

  // Siempre usar el handler de compra principal si no viene en extra
  let checkoutOnConfirm = extra?.onConfirm;
  if (!checkoutOnConfirm && props.handleConfirmCompra) {
    checkoutOnConfirm = props.handleConfirmCompra;
  }

  switch (modal) {
    case 'cart':
      return (
        <CartModal
          cart={cart}
          onAdd={id => {
            const item = cart.find(i => i.id === id);
            if (item) addToCart(item);
          }}
          onRemove={removeFromCart}
          onDelete={deleteFromCart}
          onClose={closeModal}
          isLoggedIn={extra?.isLoggedIn}
          userRole={extra?.userRole}
          onLoginClick={() => {
            window._loginFromCart = true;
            if (typeof extra?.onLoginClick === 'function') {
              extra.onLoginClick();
            } else {
              // fallback: abre login
              openModal('login');
            }
          }}
          onBuy={() => {
            if (typeof extra?.onBuy === 'function') {
              extra.onBuy();
            } else {
              openModal('checkout', {
                onConfirm: () => {
                  openModal('success', { mensaje: '¡Compra realizada con éxito!' });
                  clearCart();
                }
              });
            }
          }}
        />
      );
    case 'checkout':
      return <CheckoutModal {...extra} onCancel={closeModal} onConfirm={checkoutOnConfirm} />;
    case 'success':
      return <SuccessModal {...extra} onClose={closeModal} />;
    case 'login':
      return <Login
        {...extra}
        onLogin={props.onLogin}
        onClose={closeModal}
        onShowRegister={() => {
          closeModal();
          setTimeout(() => {
            openModal('register');
          }, 200);
        }}
      />;
    case 'register':
      return <Register
        {...extra}
        onClose={closeModal}
        onShowLogin={(datos) => {
          closeModal();
          setTimeout(() => {
            openModal('login', datos ? { email: datos.email } : undefined);
          }, 200);
        }}
      />;
    case 'profile':
      return <UserProfileModal {...extra} onClose={closeModal} onSave={props.onProfileSave} />;
    case 'recuperar':
      return <RecuperarPasswordModal {...extra} onClose={closeModal} />;
    case 'addProd':
      return <AddProductModal {...extra} onClose={closeModal} />;
    default:
      return <></>; // No mostrar nada si no hay modal activo
  }
}
