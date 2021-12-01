import React, { createContext, useReducer, useRef, useContext } from "react";

const initialAccounts = [
  {
    id: 0,
    username: "jakads",
    password: "changmin",
  },
  {
    id: 1,
    username: "witch-factory",
    password: "sunghyun",
  },
  {
    id: 2,
    username: "lee0594",
    password: "soyeon",
  },
  {
    id: 3,
    username: "nant0313",
    password: "dongju",
  },
  {
    id: 4,
    username: "juk1329",
    password: "junggyu",
  },
  {
    id: 5,
    username: "lectura7942",
    password: "jieun",
  },
  {
    id: 6,
    username: "hamuneulbo",
    password: "haneul",
  },
  {
    id: 7,
    username: "admin",
    password: "1234",
  },
];

function accountReducer(state, action) {
  switch (action.type) {
    case "REGISTER": // To be implemented
      return state.concat(action.account);
    default:
      throw new Error(`Undefined Action: ${action.type}`);
  }
}

const AccountStateContext = createContext();
const AccountDispatchContext = createContext();
const AccountNextIdContext = createContext();
const AccountCurrentContext = createContext();

export function AccountProvider({ children }) {
  const [state, dispatch] = useReducer(accountReducer, initialAccounts);
  const nextId = useRef(initialAccounts.length);
  const current = useRef();

  return (
    <AccountStateContext.Provider value={state}>
      <AccountDispatchContext.Provider value={dispatch}>
        <AccountNextIdContext.Provider value={nextId}>
          <AccountCurrentContext.Provider value={current}>
            {children}
          </AccountCurrentContext.Provider>
        </AccountNextIdContext.Provider>
      </AccountDispatchContext.Provider>
    </AccountStateContext.Provider>
  );
}

export function useAccountState() {
  return useContext(AccountStateContext);
}

export function useAccountDispatch() {
  return useContext(AccountDispatchContext);
}

export function useAccountNextId() {
  return useContext(AccountNextIdContext);
}

export function useAccountCurrent() {
  return useContext(AccountCurrentContext);
}
