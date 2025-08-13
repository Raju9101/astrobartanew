
// This is a new file created by App Prototyper.
"use client";

import { useState, useEffect, useCallback } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
        console.error("Failed to parse cart from localStorage", error)
        setCart([]);
    }
  }, []);

  const saveCart = useCallback((updatedCart: CartItem[]) => {
    setCart(updatedCart);
    try {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
        console.error("Failed to save cart to localStorage", error);
    }
  }, []);

  const addToCart = (item: CartItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      saveCart(updatedCart);
    } else {
      saveCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    saveCart(updatedCart);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId);
    } else {
      const updatedCart = cart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      saveCart(updatedCart);
    }
  };
  
  const clearCart = () => {
    saveCart([]);
  };

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return {
    cart: isMounted ? cart : [],
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal
  };
};
