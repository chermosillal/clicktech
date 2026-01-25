import React from "react";
import "../CartModal/CartModal.css";
import "./SuccessModal.css";

export default function SuccessModal({ numeroOrden, onClose }) {
  return (
    <div className="cart-modal-bg">
      <div className="cart-modal success-modal" onClick={e => e.stopPropagation()}>
        <h2>¡Compra exitosa!</h2>
        <div className="success-modal-msg">
          Muchas Gracias por su compra,<br />el detalle fue enviado a su email.<br /><br />
          <b>Su número de orden es:</b><br />
          <span className="success-modal-numero">{numeroOrden}</span>
        </div>
        <button className="cart-buy" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
