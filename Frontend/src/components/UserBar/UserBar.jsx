import React from "react";
import "./UserBar.css";

export default function UserBar({ isLoggedIn, userName, userRole, onLoginClick, onLogoutClick, onShowProfile, onAddProd }) {
  return (
    <div className="user-bar">
      {!isLoggedIn ? (
        <a className="userbar-login-link" href="#" onClick={e => { e.preventDefault(); onLoginClick(); }}>Ingresar</a>
      ) : (
        <div className="userbar-info">
          <span className="userbar-nombre">{userName}</span>
          {userRole === 'admin' && (
            <>
              <a className="userbar-admin-link" href="#" onClick={e => { e.preventDefault(); onAddProd && onAddProd(); }}>Add prod</a>
            </>
          )}
          <span className="userbar-bottom-links">
            <a className="userbar-profile-link" href="#" onClick={e => { e.preventDefault(); onShowProfile(); }}>Mis datos</a>
            <a className="userbar-logout-link" href="#" onClick={e => { e.preventDefault(); onLogoutClick(); }}>Salir</a>
          </span>
        </div>
      )}
    </div>
  );
}
