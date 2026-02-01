import React from "react";
import "./CartModal.css";
// import { getNextNumeroCompra } from "../../../utils/NumeroCompra";

// Modal del carrito de compras.
export default function CartModal({ cart, onClose, onAdd, onRemove, onDelete, onBuy, isLoggedIn, onLoginClick, userRole }) {
	const total = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
	const isAdmin = userRole === 'admin';

	// Manejar compra: mostrar número de orden y vaciar carrito
	// Inicia el proceso de compra desde el carrito.
	const handleBuy = () => {
		if (typeof onBuy === 'function') {
			onBuy();
		}
	};

	return (
		<div className="cart-modal-bg">
			<div className="cart-modal" onClick={e => e.stopPropagation()}>
				<h2>Carrito de compras</h2>
				{cart.length === 0 ? (
					<div className="cart-empty">El carrito está vacío.</div>
				) : (
					<>
						<ul className="cart-list">
							{cart.map(item => (
								<li key={item.id} className="cart-item cart-item-large">
									<span className="cart-nombre">{item.nombre}</span>
									<span className="cart-precio">${item.precio.toLocaleString('es-CL')}</span>
									<div className="cart-cantidad">
										<button onClick={() => onRemove(item.id)} disabled={isAdmin}>-</button>
										<span>{item.cantidad}</span>
										<button onClick={() => onAdd(item.id)} disabled={isAdmin}>+</button>
									</div>
									<button className="cart-delete" title="Eliminar artículo" onClick={() => onDelete(item.id)} disabled={isAdmin}>&#10006;</button>
								</li>
							))}
						</ul>
						<div className="cart-total">
							<b>Total:</b> ${total.toLocaleString('es-CL')}
						</div>
						{isAdmin && (
							<div className="cart-admin-msg">
								Los administradores no pueden realizar compras.
							</div>
						)}
						{!isLoggedIn && !isAdmin && (
							<div className="cart-login-msg">
								Debes iniciar sesión para comprar.
								<button
									className="cart-login-btn"
									onClick={() => {
										onClose();
										setTimeout(() => { onLoginClick(); }, 200);
									}}
								>Iniciar sesión</button>
							</div>
						)}
						<button
							className={`cart-buy${(!isLoggedIn || isAdmin) ? ' cart-buy-disabled' : ''}`}
							onClick={handleBuy}
							disabled={!isLoggedIn || isAdmin}
						>
							Comprar
						</button>
					</>
				)}
				<button className="cart-close" onClick={onClose}>&times;</button>
			</div>
		</div>
	);
}