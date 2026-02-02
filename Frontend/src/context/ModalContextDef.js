import React, { createContext } from 'react';


// Tipos de modales posibles (solo comentario, no tipo TS):
// null | 'cart' | 'checkout' | 'success' | 'login' | 'register' | 'profile' | 'recuperar' | 'addProd'


const ModalContext = createContext({
  modal: null,
  openModal: () => {},
  closeModal: () => {},
  extra: null,
});


export default ModalContext;