import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, CartItem } from "../type";

const cart = createSlice({
  name: "cart",
  initialState: [] as CartItem[],
  reducers: {
    addToCart(state, action: PayloadAction<Book>) {
      const item = state.find((i) => i.book.id === action.payload.id);
      if (!item) state.push({ book: action.payload, quantity: 1 });
      else if (item.quantity < item.book.stock) item.quantity++;
    },
    removeFromCart(state, a: PayloadAction<string>) {
      return state.filter((i) => i.book.id !== a.payload);
    },
    clearCart() {
      return [];
    },
    setCart: (_, a: PayloadAction<CartItem[]>) => a.payload,
  },
});
const wishList = createSlice({
  name: "wishList",
  initialState: [] as Book[],
  reducers: {
    toggle(state, action: PayloadAction<Book>) {
      const i = state.findIndex((b) => b.id === action.payload.id);
      if (i >= 0) state.splice(i, 1);
      else state.push(action.payload);
    },
    setWishlist: (_, a: PayloadAction<Book[]>) => a.payload,
  },
});
export const { addToCart, removeFromCart, clearCart, setCart } = cart.actions;
export const { toggle, setWishlist } = wishList.actions;
export const store = configureStore({
  reducer: { cart: cart.reducer, wishlist: wishList.reducer },
});
export type RootState = ReturnType<typeof store.getState>;
