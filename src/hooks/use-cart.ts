
"use client";

import React, { useState, useEffect, useCallback, createContext, useContext } from "react";
import { useToast } from "@/hooks/use-toast";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    clearCart: () => void;
    subtotal: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

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
    toast({
        title: "Added to cart!",
        description: `${item.name} has been added to your cart.`,
    });
    setIsCartOpen(true);
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

  const value = {
    cart: isMounted ? cart : [],
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    isCartOpen,
    setIsCartOpen
  };
  
  return (
    <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
  );
};
