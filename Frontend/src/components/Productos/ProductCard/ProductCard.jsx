

import React from "react";
// import imagenes from "../../../utils/imagenes";
import "./ProductCard.css";

export default function ProductCard({ id, nombre, descripcion, precio, images = [], onVerMas, onAddToCart, onModProd, isAdmin, disponible = true }) {
  // Usar la primera imagen del array images (de la API)
  let imgSrc = images && images.length > 0 ? images[0] : "https://i.postimg.cc/HVBfy2YB/default.png";
  return (
    <div style={{position:'relative'}}>
      <div className="producto-card">
        {imgSrc && (
          <img
            src={imgSrc}
            alt={nombre}
            className="producto-img"
            onError={e => {
              if (!e.target.src.endsWith('default.png')) {
                e.target.src = "https://i.postimg.cc/HVBfy2YB/default.png";
              }
            }}
          />
        )}
        <div className="producto-info">
          <h2 className="producto-titulo">{nombre}</h2>
          <p className="producto-desc">{descripcion}</p>
            <div className="producto-precio">${Number(precio).toLocaleString('es-CL', { maximumFractionDigits: 0 })}</div>
        </div>
        <div className="producto-botones">
          {/* Ocultar botón de agregar al carro si es admin */}
          {!isAdmin && (
            <button
              className="client-btn producto-btn agregar"
              onClick={() => onAddToCart({ id, nombre, descripcion, precio })}
            >
              Agregar al carro
            </button>
          )}
          <div className="producto-boton-vermas-wrapper">
            <button
              className="client-btn producto-btn ver-mas"
              onClick={onVerMas}
            >
              Ver más
            </button>
            {isAdmin && (
              <button
                className="client-btn producto-btn mod-prod"
                style={{marginLeft:4, background:'#f7c948', color:'#333', fontSize:'0.9em', padding:'2px 8px'}}
                onClick={onModProd}
              >
                Mod Prod
              </button>
            )}
          </div>
        </div>
        {/* Capa gris si no disponible y es admin */}
        {isAdmin && !disponible && (
          <div className="producto-overlay-no-disponible">
            <span style={{color:'#fff',fontWeight:'bold',fontSize:'1.1em'}}>NO DISPONIBLE</span>
          </div>
        )}
      </div>
    </div>
  );
}
