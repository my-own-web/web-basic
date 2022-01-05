import React, { createContext, useRef, useContext } from "react";

const UserCurrentContext = createContext();

export function UserProvider({ children }) {
  const currentUsername = useRef();

  return (
    <UserCurrentContext.Provider value={currentUsername}>
      {children}
    </UserCurrentContext.Provider>
  );
}

export function useUserCurrent() {
  return useContext(UserCurrentContext);
}
