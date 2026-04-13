import { createContext } from "react";

type AppContextType = {
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);