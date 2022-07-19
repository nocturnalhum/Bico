import { createContext } from 'react';

const BikeContext = createContext();

export function BikeProvider({ children }) {
  return (
    <BikeContext.Provider value={{ item: 'value' }}>
      {children}
    </BikeContext.Provider>
  );
}

export default BikeContext;
