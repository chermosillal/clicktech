
import React, { useState } from "react";
import "./Login.css";
// import { loginUsuario, decodeToken } from "../../utils/usuario";

export default function Login({ onLogin, onClose, onShowRegister, onShowRecuperar }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Debes ingresar email y contraseña");
      return;
    }
    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        setError("Credenciales incorrectas");
        return;
      }
      const data = await res.json();
      onLogin({ ...data.user, token: data.token });
    } catch {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="login-modal-bg">
      <div className="login-modal" onClick={e => e.stopPropagation()}>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoFocus
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <div className="login-error">{error}</div>}
          <button type="submit">Ingresar</button>
        </form>
        <div className="login-register-row">
          <span className="login-register-text">
            ¿No tienes cuenta?{' '}
            <button type="button" className="login-register-link" onClick={onShowRegister}>
              Regístrate
            </button>
          </span>
        </div>
        <div className="login-recuperar-row" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <button type="button" className="login-recuperar-link" onClick={onShowRecuperar}>
            ¿Olvidaste tu contraseña?
          </button>
        </div>
        <button className="login-close" onClick={onClose}>&times;</button>
      </div>
    </div>
  );
}
