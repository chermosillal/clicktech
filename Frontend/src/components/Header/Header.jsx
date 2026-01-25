
import React from "react";
import "./Header.css";

export default function Header({ onCartClick, cartCount }) {
  return (
    <header className="header-bar-outer">
      <div className="header-bar">
        <div className="header-logo">
          <img src="/img/logo.png" alt="Logo" className="logo-img" />
        </div>
        <div className="header-cart" style={{ position: 'relative' }}>
          <span
            className="cart-icon"
            onClick={onCartClick}
            style={{ position: 'relative', cursor: 'pointer' }}
            tabIndex={0}
            role="button"
            aria-label="Ver carrito"
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onCartClick && onCartClick(); }}
          >
            🛒
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </span>
        </div>
      </div>
    </header>
  );
}
