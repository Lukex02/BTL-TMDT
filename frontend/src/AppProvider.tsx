import { useState, type PropsWithChildren } from "react";
import { AppContext } from "./AppContext";
import type { CartItem } from "./pages/Checkout";

export function AppProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const value = {
    cart,
    setCart,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}