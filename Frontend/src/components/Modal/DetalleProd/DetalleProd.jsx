
import React, { useState } from "react";
// import imagenes from "../../../utils/imagenes";
import "./DetalleProd.css";

export default function DetalleProd({ producto, onClose, onAddToCart, isAdmin }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [zoomImg, setZoomImg] = useState(null);
  if (!producto) return null;
  // Usar imágenes del producto (de la API)
  const imagenesArr = producto.images && producto.images.length > 0 ? producto.images : ["https://i.postimg.cc/HVBfy2YB/default.png"];
  const handlePrev = (e) => { e.stopPropagation(); setImgIdx(idx => (idx === 0 ? imagenesArr.length - 1 : idx - 1)); };
  const handleNext = (e) => { e.stopPropagation(); setImgIdx(idx => (idx === imagenesArr.length - 1 ? 0 : idx + 1)); };
  return (
    <>
      <div className="detalleprod-backdrop">
        <div className="detalleprod-modal">
          <div className="detalleprod-img-row">
            <img
              src={imagenesArr[imgIdx]}
              alt={producto.nombre}
              className="detalleprod-img"
              style={{cursor:'zoom-in'}}
              onClick={() => setZoomImg(imagenesArr[imgIdx])}
              onError={e => {
                if (!e.target.src.endsWith('default.png')) {
                  e.target.src = "https://i.postimg.cc/HVBfy2YB/default.png";
                }
              }}
            />
          </div>
        {imagenesArr.length > 1 && (
          <div className="detalleprod-img-controls">
            <button onClick={handlePrev} className="detalleprod-img-btn prev" aria-label="Anterior">&#8592;</button>
            <button onClick={handleNext} className="detalleprod-img-btn next" aria-label="Siguiente">&#8594;</button>
          </div>
        )}
        <h2 className="detalleprod-title">{producto.nombre}</h2>
        <p className="detalleprod-desc">{producto.descripcion}</p>
        <ul className="detalleprod-list">
          {producto.duracion && producto.duracion.trim() !== "" && <li><b>Duración:</b> {producto.duracion}</li>}
          {producto.modalidad && producto.modalidad.trim() !== "" && <li><b>Modalidad:</b> {producto.modalidad}</li>}
          {producto.tipo && <li><b>Tipo:</b> {producto.tipo}</li>}
          {producto.marca && <li><b>Marca:</b> {producto.marca}</li>}
          {producto.incluye && <li><b>Incluye:</b> {producto.incluye}</li>}
          {producto.garantia && <li><b>Garantía:</b> {producto.garantia}</li>}
          {producto.tipo === 'Físico' && (
            <li>
              <b>Stock:</b> {typeof producto.stock === 'number' ? (
                producto.stock > 0 ? (
                  <span className="detalleprod-stock"> {producto.stock} disponibles</span>
                ) : (
                  <span className="detalleprod-agotado"> Agotado</span>
                )
              ) : ' -'}
            </li>
          )}
        </ul>
          <div className="detalleprod-precio">${Number(producto.precio).toLocaleString('es-CL', { maximumFractionDigits: 0 })}</div>
        <div className="detalleprod-categoria">IVA Incluido</div>
        <button className="detalleprod-close" onClick={onClose} aria-label="Cerrar">&times;</button>
        <div className="detalleprod-btns" style={{display:'flex',gap:12,justifyContent:'center',marginTop:12}}>
          {/* Ocultar botón de agregar al carro si es admin */}
          {!isAdmin && (
            <button
              className="client-btn detalleprod-btn agregar"
              style={{background:'#ff9800', fontWeight:'bold', fontSize:'1.1em', boxShadow:'0 2px 8px #0002'}}
              onClick={() => onAddToCart(producto)}
            >
              🛒 Agregar al carro
            </button>
          )}
          {producto.ficha_pdf && producto.ficha_pdf.trim() !== "" && (
            <button
              className="client-btn detalleprod-btn ficha"
              style={{background:'#4a90e2', color:'#fff', fontWeight:'normal', fontSize:'1em'}}
              onClick={() => window.open(producto.ficha_pdf, '_blank')}
            >
              Ver ficha técnica (PDF)
            </button>
          )}
        </div>
        </div>
      </div>
      {zoomImg && (
        <div
          className="detalleprod-zoom-backdrop"
          style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.85)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center'}}
          onClick={() => setZoomImg(null)}
        >
          <img
            src={zoomImg}
            alt="Zoom"
            style={{width:'480px',maxWidth:'98vw',maxHeight:'90vh',boxShadow:'0 0 32px #000',borderRadius:8,cursor:'zoom-out',background:'#fff'}}
            onClick={e => {e.stopPropagation(); setZoomImg(null);}}
          />
        </div>
      )}
    </>
  );
}
