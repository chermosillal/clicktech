
import React, { useState } from "react";
import BASE_URL from '../../config/baseUrl';
import "./Register.css";
// import { addUsuario, loginUsuario, decodeToken } from "../../utils/usuario";

export default function Register({ onRegister, onClose, onShowLogin }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [nombre, setNombre] = useState("");
  const [rut, setRut] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [error, setError] = useState("");
  const [registroOk, setRegistroOk] = useState(false);

  // Validación de email
  function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  // Validación simple de RUT chileno (formato y dígito verificador)
  function validarRut(rut) {
    rut = rut.replace(/\./g, '').replace(/-/g, '');
    if (!/^\d{7,8}[0-9kK]$/.test(rut)) return false;
    let cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1).toUpperCase();
    let suma = 0, multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo[i]) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    let dvEsperado = 11 - (suma % 11);
    dvEsperado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
    return dv === dvEsperado;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !rut || !email || !direccion || !password || !confirm) {
      setError("Completa todos los campos");
      return;
    }
    if (!validarEmail(email)) {
      setError("El correo no es válido");
      return;
    }
    if (!validarRut(rut)) {
      setError("El RUT no es válido");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      // Registro en backend
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, rut, email, password, direccion })
      });
      if (!res.ok) {
        setError("El correo ya está registrado");
        return;
      }
      setRegistroOk(true);
    } catch {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="register-modal-bg">
      <div className="register-modal" onClick={e => e.stopPropagation()}>
        {!registroOk ? (
          <>
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nombre completo"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                autoFocus
              />
              <input
                type="text"
                placeholder="RUT"
                value={rut}
                onChange={e => setRut(e.target.value)}
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Repetir contraseña"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
              />
              <input
                type="text"
                placeholder="Dirección"
                value={direccion}
                onChange={e => setDireccion(e.target.value)}
              />
              {error && <div className="register-error">{error}</div>}
              <button type="submit">Registrarse</button>
            </form>
            <button className="register-close" onClick={onClose}>&times;</button>
          </>
        ) : (
          <>
            <h2>¡Registro exitoso!</h2>
            <p>Tu cuenta ha sido creada correctamente.</p>
            <button onClick={() => { setRegistroOk(false); onClose(); onShowLogin(); }}>Continuar</button>
          </>
        )}
      </div>
    </div>
  );
}
