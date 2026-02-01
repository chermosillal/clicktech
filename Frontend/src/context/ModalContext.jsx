import React, { createContext, useState, useCallback } from 'react';


// Tipos de modales posibles (solo comentario, no tipo TS):
// null | 'cart' | 'checkout' | 'success' | 'login' | 'register' | 'profile' | 'recuperar' | 'addProd'


export const ModalContext = createContext({
  modal: null,
  openModal: () => {},
  closeModal: () => {},
  extra: null,
});

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null); // ModalType
  const [extra, setExtra] = useState(null); // Para pasar datos adicionales

  const openModal = useCallback((type, extraData = null) => {
    setModal(type);
    setExtra(extraData);
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
    setExtra(null);
  }, []);

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal, extra }}>
      {children}
    </ModalContext.Provider>
  );
}


