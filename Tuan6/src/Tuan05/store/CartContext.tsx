import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from "react";

interface CartItem {
  bookId: string;
  quantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | {
      type: "ADD";
      payload: CartItem;
    }
  | {
      type: "REMOVE";
      payload: string;
    }
  | {
      type: "UPDATE";
      payload: {
        bookId: string;
        quantity: number;
      };
    }
  | {
      type: "CLEAR";
    };

interface CartContextType {
  items: CartItem[];

  addToCart: (
    bookId: string,
    price: number,
    quantity?: number
  ) => void;

  removeFromCart: (
    bookId: string
  ) => void;

  updateQuantity: (
    bookId: string,
    quantity: number
  ) => void;

  clearCart: () => void;

  totalQuantity: number;

  totalPrice: number;
}

const initialState: CartState = {
  items: [],
};

function cartReducer(
  state: CartState,
  action: CartAction
): CartState {
  switch (action.type) {
    case "ADD": {
      const existingItem = state.items.find(
        (item: CartItem) =>
          item.bookId === action.payload.bookId
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(
            (item: CartItem) =>
              item.bookId ===
              action.payload.bookId
                ? {
                    ...item,
                    quantity:
                      item.quantity +
                      action.payload.quantity,
                  }
                : item
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          action.payload,
        ],
      };
    }

    case "REMOVE":
      return {
        ...state,
        items: state.items.filter(
          (item: CartItem) =>
            item.bookId !== action.payload
        ),
      };

    case "UPDATE":
      return {
        ...state,
        items: state.items
          .map((item: CartItem) =>
            item.bookId ===
            action.payload.bookId
              ? {
                  ...item,
                  quantity:
                    action.payload.quantity,
                }
              : item
          )
          .filter(
            (item: CartItem) =>
              item.quantity > 0
          ),
      };

    case "CLEAR":
      return initialState;

    default:
      return state;
  }
}

const CartContext =
  createContext<CartContextType | undefined>(
    undefined
  );

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({
  children,
}: CartProviderProps) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState
  );

  const addToCart = (
    bookId: string,
    price: number,
    quantity: number = 1
  ): void => {
    dispatch({
      type: "ADD",
      payload: {
        bookId,
        price,
        quantity,
      },
    });
  };

  const removeFromCart = (
    bookId: string
  ): void => {
    dispatch({
      type: "REMOVE",
      payload: bookId,
    });
  };

  const updateQuantity = (
    bookId: string,
    quantity: number
  ): void => {
    dispatch({
      type: "UPDATE",
      payload: {
        bookId,
        quantity,
      },
    });
  };

  const clearCart = (): void => {
    dispatch({
      type: "CLEAR",
    });
  };

  const totalQuantity: number =
    state.items.reduce(
      (total: number, item: CartItem) =>
        total + item.quantity,
      0
    );

  const totalPrice: number =
    state.items.reduce(
      (total: number, item: CartItem) =>
        total + item.price * item.quantity,
      0
    );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error(
      "useCart phải được sử dụng bên trong CartProvider"
    );
  }

  return context;
}
