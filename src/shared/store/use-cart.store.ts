import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
}

interface CartState {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
}

const useCartStore = create<CartState>((set) => ({
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  addToCart: (product: Product) =>
    set((state) => {
      const updatedCart = [...state.cart, product];
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
