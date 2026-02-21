"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import type { ProductVariant } from '../api/products';

export interface CartItem {
  variantId: number;
  name: string;
  sizeLabel: string;
  colorName: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (variant: ProductVariant, productName: string, quantity?: number) => void;
  removeItem: (variantId: number) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
  clear: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = 'fashion-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CartItem[];
        setItems(parsed);
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value: CartContextValue = useMemo(() => {
    const addItem = (variant: ProductVariant, productName: string, quantity = 1) => {
      setItems((current: CartItem[]) => {
        const existing = current.find((item: CartItem) => item.variantId === variant.variantId);
        if (existing) {
          return current.map((item: CartItem) =>
            item.variantId === variant.variantId
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
        }

        const next: CartItem = {
          variantId: variant.variantId,
          name: productName,
          sizeLabel: variant.size.label,
          colorName: variant.color.name,
          price: variant.price,
          quantity,
        };
        return [...current, next];
      });
    };

    const removeItem = (variantId: number) => {
      setItems((current: CartItem[]) => current.filter((item: CartItem) => item.variantId !== variantId));
    };

    const updateQuantity = (variantId: number, quantity: number) => {
      setItems((current: CartItem[]) =>
        current.map((item: CartItem) =>
          item.variantId === variantId ? { ...item, quantity } : item,
        ),
      );
    };

    const clear = () => setItems([]);

    const totalItems = items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
    const subtotal = items.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0,
    );

    return { items, addItem, removeItem, updateQuantity, clear, totalItems, subtotal };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext<CartContextValue | undefined>(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}
