import React, { useState, useEffect } from 'react';
import CartContext from './CartContextDef';

// Proveedor de contexto para el carrito. Permite que los componentes hijos accedan y modifiquen el carrito.
export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Agrega un producto al carrito. Si ya existe, suma la cantidad.
  const addToCart = (product) => {
    setCart((prev) => {
      // Si el producto ya está en el carrito, suma cantidad
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...product, cantidad: 1 }];
    });
  };

  // Elimina un producto del carrito por su id. Si hay más de uno, resta la cantidad.
  const removeFromCart = (id) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === id);
      if (found && found.cantidad > 1) {
        return prev.map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        );
      }
      // Si la cantidad es 1, eliminar el producto
      return prev.filter((item) => item.id !== id);
    });
  };

  // Elimina completamente un producto del carrito (sin importar cantidad)
  const deleteFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Vacía el carrito completamente.
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, deleteFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
