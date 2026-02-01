
import React from "react";
import "./Header.css";

export default function Header({ onCartClick, cartCount, userRole }) {
  const isAdmin = userRole === 'admin';
  return (
    <header className="header-bar-outer">
      <div className="header-bar">
        <div className="header-logo">
          <img src="/img/logo.png" alt="Logo" className="logo-img" />
        </div>
        <div className="header-cart" style={{ position: 'relative' }}>
          <span
            className={`cart-icon${isAdmin ? ' cart-icon-disabled' : ''}`}
            onClick={isAdmin ? undefined : onCartClick}
            style={{ position: 'relative', cursor: isAdmin ? 'not-allowed' : 'pointer', opacity: isAdmin ? 0.5 : 1 }}
            tabIndex={isAdmin ? -1 : 0}
            role="button"
            aria-label="Ver carrito"
            onKeyDown={e => { if (!isAdmin && (e.key === 'Enter' || e.key === ' ')) onCartClick && onCartClick(); }}
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
