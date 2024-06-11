import { createContext, useState } from "react";

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("hourly");
  const [history, setHistory] = useState(null);
  const [future, setFuture] = useState(null);
  const [last, setLast] = useState(null);
  return (
    <AppContext.Provider
      value={{
        history,
        setHistory,
        future,
        setFuture,
        last,
        setLast,
        selectedTimeFrame,
        setSelectedTimeFrame,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
