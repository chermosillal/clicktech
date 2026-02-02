import { useContext } from 'react';
import ModalContext from '../context/ModalContextDef';
export default function useModal() {
  const {modal, openModal, closeModal, extra} = useContext(ModalContext);
  return {modal, openModal, closeModal, extra};
}
