"use client";

import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";

// Types
interface CartItem {
  productId: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Actions
type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

// Initial state
const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );

      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.items, action.payload];
      }

      console.log("Cart ADD_ITEM: Adding item", action.payload);
      console.log("Cart ADD_ITEM: Existing items", state.items);
      console.log("Cart ADD_ITEM: New items", newItems);

      return {
        ...state,
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }

    case "REMOVE_ITEM": {
      const filteredItems = state.items.filter(
        (item) => item.productId !== action.payload
      );
      return {
        ...state,
        items: filteredItems,
        total: filteredItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        itemCount: filteredItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }

    case "UPDATE_QUANTITY": {
      const newItems = state.items.map((item) =>
        item.productId === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter((item) => item.quantity > 0);

      return {
        ...state,
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }

    case "CLEAR_CART": {
      return {
        items: [],
        total: 0,
        itemCount: 0,
      };
    }

    case "LOAD_CART": {
      return {
        ...state,
        items: action.payload,
        total: action.payload.reduce((sum, item) => sum + item.price * item.quantity, 0),
        itemCount: action.payload.reduce((sum, item) => sum + item.quantity, 0),
      };
    }

    default:
      return state;
  }
}

// Context
const CartContext = createContext<{
  state: CartState;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
} | null>(null);

// Provider
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from API on mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Fetch cart from API
  const fetchCart = async () => {
    try {
      const response = await fetch("/api/cart");
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "LOAD_CART", payload: data.items || [] });
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  // Add item to cart
  const addItem = async (item: CartItem) => {
    try {
      console.log("Adding item to cart:", item);
      
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: item.productId,
          quantity: item.quantity,
        }),
      });

      console.log("API Response status:", response.status);
      console.log("API Response ok:", response.ok);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(`Failed to add item to cart: ${errorData.error || response.statusText}`);
      }
      
      const data = await response.json();
      console.log("API Response data:", data);
      
      await fetchCart(); // Refresh cart after adding
    } catch (error) {
      console.error("Failed to add item:", error);
      throw error;
    }
  };

  // Remove item from cart
  const removeItem = async (productId: string) => {
    try {
      const response = await fetch("/api/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        await fetchCart(); // Refresh cart after removing
      } else {
        throw new Error("Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  // Update item quantity
  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const response = await fetch("/api/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (response.ok) {
        await fetchCart(); // Refresh cart after updating
      } else {
        throw new Error("Failed to update item quantity");
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      const response = await fetch("/api/cart/clear", {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchCart(); // Refresh cart after clearing
      } else {
        throw new Error("Failed to clear cart");
      }
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
