import React, { useState } from "react";
import "../AddProductModal/AddProductModal.css";

export default function ModProductModal({ producto, onClose, onSave }) {
  // Usar producto.imagenes si existe, si no producto.images (de la API), si no array vacío
  let initialImgs = ["", "", "", ""];
  if (producto.imagenes && Array.isArray(producto.imagenes) && producto.imagenes.length > 0) {
    initialImgs = [...producto.imagenes, "", "", "", ""].slice(0,4);
  } else if (producto.images && Array.isArray(producto.images) && producto.images.length > 0) {
    initialImgs = [...producto.images, "", "", "", ""].slice(0,4);
  }
  const [form, setForm] = useState({ ...producto, imagenes: initialImgs, ficha_pdf: producto.ficha_pdf || "", disponible: producto.disponible !== undefined ? producto.disponible : true });
  const [msg, setMsg] = useState("");

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("imagen")) {
      const idx = parseInt(name.replace("imagen", ""), 10);
      setForm(f => {
        const imgs = [...(f.imagenes || ["", "", "", "", "", ""] )];
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
    setMsg("");
    try {
      if (onSave) {
        await onSave(form);
        setMsg("Producto modificado correctamente");
        setTimeout(onClose, 1200);
      }
    } catch {
      setMsg("Error al modificar producto");
    }
  };

  return (
    <div className="addprod-modal-bg">
      <div className="addprod-modal" onClick={e => e.stopPropagation()}>
        <h2>Modificar Producto</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="nombre" placeholder="Nombre" value={form.nombre || ""} onChange={handleChange} autoFocus />
          <textarea name="descripcion" placeholder="Descripción" value={form.descripcion || ""} onChange={handleChange} rows={3} />
          <input type="text" name="precio" placeholder="Precio" value={form.precio || ""} onChange={handleChange} />
          <input type="text" name="marca" placeholder="Marca" value={form.marca || ""} onChange={handleChange} />
          <input type="text" name="incluye" placeholder="Incluye" value={form.incluye || ""} onChange={handleChange} />
          <input type="text" name="garantia" placeholder="Garantía" value={form.garantia || ""} onChange={handleChange} />
          <input type="number" name="stock" placeholder="Stock" value={form.stock || ""} onChange={handleChange} min={0} />
          <div style={{display:'flex', gap:'10px', flexWrap:'wrap', margin:'8px 0'}}>
            <label><input type="checkbox" name="oferta" checked={!!form.oferta} onChange={handleChange} /> Oferta</label>
            <label><input type="checkbox" name="servicio" checked={!!form.servicio} onChange={handleChange} /> Servicio</label>
            <label><input type="checkbox" name="no_fisico" checked={!!form.no_fisico} onChange={handleChange} /> No físico</label>
            <label><input type="checkbox" name="destacado" checked={!!form.destacado} onChange={handleChange} /> Destacado</label>
            <label><input type="checkbox" name="disponible" checked={!!form.disponible} onChange={handleChange} /> Disponible</label>
          </div>
          <input type="text" name="duracion" placeholder="Duración" value={form.duracion || ""} onChange={handleChange} />
          <input type="text" name="modalidad" placeholder="Modalidad" value={form.modalidad || ""} onChange={handleChange} />
          <div style={{marginTop: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <label style={{fontWeight:'bold', marginBottom:'4px'}}>Imágenes (máx. 4):</label>
            {(form.imagenes || ["", "", "", ""]).map((img, idx) => (
              <div key={idx} style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'2px', width:'100%'}}>
                <input
                  type="text"
                  name={`imagen${idx}`}
                  placeholder={`URL de imagen ${idx+1}`}
                  value={img || ""}
                  onChange={handleChange}
                  style={{marginTop:'4px', width:'90%', textAlign:'center'}}
                />
                {img && img.trim() !== "" && (
                  <img src={img} alt={`img${idx+1}`} style={{width:40,height:40,objectFit:'cover',borderRadius:4,border:'1px solid #ccc'}} />
                )}
              </div>
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
          <button type="submit">Guardar cambios</button>
        </form>
        <button className="addprod-close" onClick={onClose}>&times;</button>
      </div>
    </div>
  );
}
