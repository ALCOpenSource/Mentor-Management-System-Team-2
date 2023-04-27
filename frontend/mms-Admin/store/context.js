import { useContext, useReducer } from 'react';
import mainReducer from './providers/mainReducer';
import initialState from './providers/initialState';

export const StateContext = React.createContext();

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const values = { state, dispatch };
  return (
    <StateContext.Provider value={values}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);

export default ContextProvider;
