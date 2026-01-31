import React, { useState } from "react";
import BASE_URL from '../../../config/baseUrl';
import "./RecuperarPasswordModal.css";

export default function RecuperarPasswordModal({ onClose, onShowLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirm) {
      setError("Completa todos los campos");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        setError("No se pudo actualizar la contraseña");
        return;
      }
      setOk(true);
    } catch {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="recuperar-modal-bg">
      <div className="recuperar-modal" onClick={e => e.stopPropagation()}>
        {!ok ? (
          <>
            <h2>Recuperar Contraseña</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoFocus
              />
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Repetir nueva contraseña"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
              />
              {error && <div className="recuperar-error">{error}</div>}
              <button type="submit">Actualizar</button>
            </form>
            <button className="recuperar-close" onClick={onClose}>&times;</button>
          </>
        ) : (
          <>
            <h2>¡Contraseña actualizada!</h2>
            <button onClick={() => { onClose(); onShowLogin(); }}>Continuar</button>
          </>
        )}
      </div>
    </div>
  );
}
