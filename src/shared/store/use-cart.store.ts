import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: string) => void;
}

const useCartStore = create<CartState>((set) => ({
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  addToCart: (product: Product, quantity: number) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);

      const updatedCart = existingItem
        ? state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...state.cart, { ...product, quantity }];

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),
  removeFromCart: (id: string) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),
}));

export default useCartStore;
