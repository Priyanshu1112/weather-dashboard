import { createContext, useState } from "react";


export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [current, setCurrent] = useState(null);
  return (
    <AppContext.Provider value={{ current, setCurrent }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
