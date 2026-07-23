/**
 * BOOKCASE App - Shopping Cart Context
 * Manages shopping cart state, item quantities, total calculation & AsyncStorage persistence.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const saved = await AsyncStorage.getItem('bookcase_mobile_cart');
        if (saved) {
          setCart(JSON.parse(saved));
        }
      } catch (e) {
        console.error('Failed to load cart', e);
      }
    };
    loadCart();
  }, []);

  const saveCart = async (newCart) => {
    setCart(newCart);
    try {
      await AsyncStorage.setItem('bookcase_mobile_cart', JSON.stringify(newCart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  };

  const addToCart = (book, quantityToAdd = 1) => {
    if (book.stockStatus === 'Out of Stock') return false;

    const existingIndex = cart.findIndex((item) => item.id === book.id);
    let updated = [...cart];

    if (existingIndex > -1) {
      updated[existingIndex].quantity += quantityToAdd;
    } else {
      const discountedPrice = book.discountPercent > 0
        ? Math.round(book.priceLKR * (1 - book.discountPercent / 100))
        : book.priceLKR;

      updated.push({
        ...book,
        finalPriceLKR: discountedPrice,
        quantity: quantityToAdd,
      });
    }

    saveCart(updated);
    return true;
  };

  const updateQuantity = (bookId, delta) => {
    const updated = cart.map((item) => {
      if (item.id === bookId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean);

    saveCart(updated);
  };

  const removeFromCart = (bookId) => {
    const updated = cart.filter((item) => item.id !== bookId);
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotalLKR = cart.reduce(
    (sum, item) => sum + (item.finalPriceLKR || item.priceLKR) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotalLKR,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
