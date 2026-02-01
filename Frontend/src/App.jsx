import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { ModalProvider } from './context/ModalContext';
import AppContent from './AppContent';
import './App.css';

// Componente principal de la aplicación. Maneja el estado global, muestra productos y controla los modales.

function App() {
  const [usuario, setUsuario] = useState(() => {
    try {
      const stored = localStorage.getItem('usuario');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuario');
    }
  }, [usuario]);
  return (
    <ModalProvider>
      <CartProvider>
        <AppContent usuario={usuario} setUsuario={setUsuario} />
      </CartProvider>
    </ModalProvider>
  );
}
export default App;