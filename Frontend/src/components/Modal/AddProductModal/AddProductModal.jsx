import React, { useState } from "react";
import BASE_URL from '../../../config/baseUrl';
import "./AddProductModal.css";

export default function AddProductModal({ onClose, onAdd, token }) {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    marca: "",
    incluye: "",
    garantia: "",
    stock: "",
    oferta: false,
    servicio: false,
    no_fisico: false,
    destacado: false,
    duracion: "",
    modalidad: "",
    imagenes: ["", "", "", ""],
    ficha_pdf: ""
  });
  const [msg, setMsg] = useState("");

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("imagen")) {
      const idx = parseInt(name.replace("imagen", ""), 10);
      setForm(f => {
        const imgs = [...f.imagenes];
        imgs[idx] = value;
        return { ...f, imagenes: imgs };
      });
    } else if (type === "checkbox") {
      setForm(f => ({ ...f, [name]: checked }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.nombre || !form.descripcion || !form.precio) {
      setMsg("Completa todos los campos obligatorios");
      return;
    }
    const imagenesFiltradas = form.imagenes.filter(url => url.trim() !== "");
    try {
      const res = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre: form.nombre,
          descripcion: form.descripcion,
          precio: parseFloat(form.precio),
          marca: form.marca,
          incluye: form.incluye,
          garantia: form.garantia,
          stock: form.stock === "" ? null : parseInt(form.stock, 10),
          oferta: form.oferta,
          servicio: form.servicio,
          no_fisico: form.no_fisico,
          destacado: form.destacado,
          duracion: form.duracion,
          modalidad: form.modalidad,
          imagenes: imagenesFiltradas,
          ficha_pdf: form.ficha_pdf
        })
      });
      if (!res.ok) throw new Error("Error al agregar producto");
      setMsg("Producto agregado correctamente");
      if (onAdd) onAdd();
      setTimeout(onClose, 1200);
    } catch {
      setMsg("Error al conectar con el servidor");
    }
  };

  return (
    <div className="addprod-modal-bg">
      <div className="addprod-modal" onClick={e => e.stopPropagation()}>
        <h2>Agregar Producto</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} autoFocus />
          <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} rows={3} />
          <input type="text" name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} />
          <input type="text" name="marca" placeholder="Marca" value={form.marca} onChange={handleChange} />
          <input type="text" name="incluye" placeholder="Incluye" value={form.incluye} onChange={handleChange} />
          <input type="text" name="garantia" placeholder="Garantía" value={form.garantia} onChange={handleChange} />
          <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} min={0} />
          <div style={{display:'flex', gap:'10px', flexWrap:'wrap', margin:'8px 0'}}>
            <label><input type="checkbox" name="oferta" checked={form.oferta} onChange={handleChange} /> Oferta</label>
            <label><input type="checkbox" name="servicio" checked={form.servicio} onChange={handleChange} /> Servicio</label>
            <label><input type="checkbox" name="no_fisico" checked={form.no_fisico} onChange={handleChange} /> No físico</label>
            <label><input type="checkbox" name="destacado" checked={form.destacado} onChange={handleChange} /> Destacado</label>
          </div>
          <input type="text" name="duracion" placeholder="Duración" value={form.duracion} onChange={handleChange} />
          <input type="text" name="modalidad" placeholder="Modalidad" value={form.modalidad} onChange={handleChange} />
          <div style={{marginTop: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <label style={{fontWeight:'bold', marginBottom:'4px'}}>Imágenes (máx. 4):</label>
            {form.imagenes.map((img, idx) => (
              <input
                key={idx}
                type="text"
                name={`imagen${idx}`}
                placeholder={`URL de imagen ${idx+1}`}
                value={img}
                onChange={handleChange}
                style={{marginTop:'4px', width:'90%', textAlign:'center'}}
              />
            ))}
          </div>
          <div style={{marginTop: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <label style={{fontWeight:'bold', marginBottom:'4px'}}>Ficha técnica (PDF, URL):</label>
            <input
              type="text"
              name="ficha_pdf"
              placeholder="URL del PDF de ficha técnica"
              value={form.ficha_pdf}
              onChange={handleChange}
              style={{marginTop:'4px', width:'90%', textAlign:'center'}}
            />
          </div>
          {msg && <div className="addprod-msg">{msg}</div>}
          <button type="submit">Agregar</button>
        </form>
        <button className="addprod-close" onClick={onClose}>&times;</button>
      </div>
    </div>
  );
}
