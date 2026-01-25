import React, { useState } from "react";
import "../CartModal/CartModal.css";

export default function CheckoutModal({ onConfirm, onCancel, direccion }) {
  const [pago, setPago] = useState("");
  const [envio, setEnvio] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pago || !envio) {
      setError("Debe seleccionar forma de pago y envío.");
      return;
    }
    setError("");
    onConfirm({ pago, envio });
  };

  return (
    <div className="cart-modal-bg">
      <div className="cart-modal checkout-modal" onClick={e => e.stopPropagation()}>
        <h2>Finalizar compra</h2>
        <form onSubmit={handleSubmit}>
          <div className="checkout-field">
            <label><b>Forma de pago:</b></label><br />
            <select
              className="checkout-input"
              value={pago}
              onChange={e => setPago(e.target.value)}
              required
              // estilos ahora en .checkout-input
            >
              <option value="">Seleccione...</option>
              <option value="tarjeta">Tarjeta</option>
              <option value="deposito">Depósito/Transferencia</option>
            </select>
          </div>
          <div className="checkout-field">
            <label><b>Forma de envío:</b></label><br />
            <select
              className="checkout-input"
              value={envio}
              onChange={e => setEnvio(e.target.value)}
              required
              // estilos ahora en .checkout-input
            >
              <option value="">Seleccione...</option>
              <option value="retiro">Retiro en tienda</option>
              <option value="domicilio">Envío a: {direccion || 'No disponible'}</option>
            </select>
          </div>
          {error && <div className="checkout-error">{error}</div>}
          <div className="checkout-btns">
            <button type="button" className="cart-close" onClick={onCancel} title="Cerrar">&times;</button>
            <button type="submit" className="cart-buy">Confirmar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
