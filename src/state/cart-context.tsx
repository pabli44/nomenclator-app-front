import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { type Product } from '@/src/data/products';

export type PurchaseVariant = 'digital' | 'personalizada' | 'impresion';

export interface Personalization {
  name: string;
  message: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  variant: PurchaseVariant;
  personalization?: Personalization;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (product: Product, variant: PurchaseVariant, personalization?: Personalization) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

/**
 * Builds a composite key for a cart line so the same product bought in
 * different modes (or with different personalization) stays as separate
 * items. The original product id is preserved in `productId`.
 */
function buildItemKey(
  productId: string,
  variant: PurchaseVariant,
  personalization?: Personalization,
): string {
  if (variant === 'personalizada' && personalization) {
    return `${productId}::${variant}::${personalization.name}::${personalization.message}`;
  }
  return `${productId}::${variant}`;
}

/**
 * Shared cart state. Lifted from local store state so the cart modal can
 * remove items without desyncing the store screen.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback(
    (product: Product, variant: PurchaseVariant, personalization?: Personalization) => {
      setItems((prev) => {
        const key = buildItemKey(product.id, variant, personalization);
        const existing = prev.find((item) => item.id === key);
        if (existing) {
          return prev.map((item) =>
            item.id === key ? { ...item, quantity: item.quantity + 1 } : item,
          );
        }
        return [
          ...prev,
          {
            id: key,
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            variant,
            personalization,
          },
        ];
      });
    },
    [],
  );

  const incrementItem = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    );
  }, []);

  const decrementItem = useCallback((id: string) => {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({ items, count, total, addItem, incrementItem, decrementItem, removeItem, clearCart }),
    [items, count, total, addItem, incrementItem, decrementItem, removeItem, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}