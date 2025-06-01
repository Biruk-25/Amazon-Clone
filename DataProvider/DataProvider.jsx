import React, { createContext, useReducer, useEffect, useState } from "react";
import { initialState, reducer } from "../../Utility/reducer";
import { auth } from "../../Utility/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Type } from "../../Utility/action";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: Type.SET_USER, user: user || null });
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (authLoading) return null; // or a loading spinner component

  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  );
};

