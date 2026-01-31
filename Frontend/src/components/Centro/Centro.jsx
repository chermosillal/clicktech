

import React, { useState } from "react";
import BASE_URL from '../../config/baseUrl';
import "./Centro.css";
import ProductCard from "../Productos/ProductCard/ProductCard";
import DetalleProd from "../Modal/DetalleProd/DetalleProd";
import UserBar from "../UserBar/UserBar";

import ModProductModal from "../Modal/ModProductModal/ModProductModal";
export default function Centro({ productos = [], mensajeError = "", onAddToCart, isLoggedIn, userName, userRole, userToken, onLoginClick, onLogoutClick, onShowProfile, onAddProd, recargarProductos }) {
  const [detalle, setDetalle] = useState(null);
  const [modProd, setModProd] = useState(null);

  // Si es admin, mostrar todos los productos (incluyendo no disponibles)
  // Si no, solo los disponibles
  const productosParaMostrar = userRole === 'admin'
    ? productos
    : productos.filter(p => p.disponible !== false);

  return (
    <div className="centro-content">
      <UserBar
        isLoggedIn={isLoggedIn}
        userName={userName}
        userRole={userRole}
        onLoginClick={onLoginClick}
        onLogoutClick={onLogoutClick}
        onShowProfile={onShowProfile}
        onAddProd={onAddProd}
      />
      {detalle ? (
        <DetalleProd producto={detalle} onClose={() => setDetalle(null)} onAddToCart={onAddToCart} isAdmin={userRole === 'admin'} />
      ) : (
        <div className="productos-grid">
          {mensajeError ? (
            <p style={{ color: 'red', textAlign: 'center', width: '100%', fontWeight: 'bold', fontSize: '1.1rem', margin: '2rem auto' }}>{mensajeError}</p>
          ) : productosParaMostrar.length === 0 ? (
            <p style={{ color: 'blue', textAlign: 'center', width: '100%', fontWeight: 'bold', fontSize: '1.1rem', margin: '2rem auto' }}>No se encontraron productos.</p>
          ) : (
            productosParaMostrar.map((producto) => (
              <ProductCard
                key={producto.id}
                id={producto.id}
                nombre={producto.nombre}
                descripcion={producto.descripcion}
                precio={producto.precio}
                onVerMas={() => setDetalle(producto)}
                images={producto.images}
                onAddToCart={() => onAddToCart(producto)}
                isAdmin={userRole === 'admin'}
                disponible={producto.disponible}
                onModProd={() => setModProd(producto)}
              />
            ))
          )}
        </div>
      )}
      {modProd && (
        <ModProductModal
          producto={modProd}
          onClose={() => setModProd(null)}
          onSave={async (form) => {
            // Lógica para actualizar producto en backend
            try {
              await fetch(`${BASE_URL}/products/${modProd.id}`,
                {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    ...(userToken ? { 'Authorization': `Bearer ${userToken}` } : {})
                  },
                  body: JSON.stringify({
                    ...form,
                    imagenes: (form.imagenes || []).filter(url => url && url.trim() !== "")
                  })
                }
              );
              // Recargar productos tras editar
              if (typeof recargarProductos === 'function') {
                await recargarProductos();
              }
              setModProd(null);
            } catch {
              alert('Error al actualizar producto');
            }
          }}
        />
      )}
    </div>
  );
}
