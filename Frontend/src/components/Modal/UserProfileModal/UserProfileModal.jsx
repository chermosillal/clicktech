import React, { useState } from "react";
import BASE_URL from '../../../config/baseUrl';
import "./UserProfileModal.css";


export default function UserProfileModal({ user, onSave, onClose }) {
  const [form, setForm] = useState({
    nombre: user.nombre || "",
    rut: user.rut || "",
    email: user.email || "",
    direccion: user.direccion || "",
    password: "",
    confirmPassword: ""
  });
  // Refrescar datos al abrir el modal
  React.useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${BASE_URL}/users/me`, {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setForm(f => ({ ...f, ...data, password: '', confirmPassword: '' }));
        }
      } catch {}
    }
    fetchProfile();
  }, [user.token]);
  const [msg, setMsg] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password || form.confirmPassword) {
      if (form.password !== form.confirmPassword) {
        setMsg('Las contraseñas no coinciden');
        return;
      }
    }
    try {
      const res = await fetch(`${BASE_URL}/users/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ nombre: form.nombre, rut: form.rut, email: form.email, direccion: form.direccion, password: form.password })
      });
      if (!res.ok) throw new Error('Error al actualizar perfil');
      setMsg('Datos actualizados correctamente');
      setTimeout(() => {
        onSave({ ...user, ...form });
        onClose();
      }, 1200);
      return;
    } catch {
      setMsg('Error al actualizar perfil');
      return;
    }
  };

  return (
    <div className="userprofile-modal-bg">
      <div className="userprofile-modal" onClick={e => e.stopPropagation()}>
        <h2>Mis datos</h2>
        <div style={{textAlign:'center', color:'#888', fontSize:'0.98em', marginBottom: '10px'}}>
          Nota: estos serán los datos de envío y facturación
        </div>
        <form onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          <label>RUT:</label>
          <input
            type="text"
            name="rut"
            value={form.rut}
            onChange={handleChange}
            required
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            readOnly
            disabled
            required
          />
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            required
          />
          <label>Contraseña nueva:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />

          <label>Repetir contraseña:</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
          />
          <button type="submit">Guardar cambios</button>
        </form>
        {msg && <div className="userprofile-msg">{msg}</div>}
        <button className="userprofile-close" onClick={onClose} title="Cerrar">&times;</button>
      </div>
    </div>
  );
}
