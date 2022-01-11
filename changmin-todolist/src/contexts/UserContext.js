import { createContext, useState } from "react";

const UserContext = createContext({
  state: { username: undefined },
  actions: { setUsername: () => {} },
});

const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(undefined);

  const value = {
    state: { username },
    actions: { setUsername },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const { Consumer: UserConsumer } = UserContext;

export { UserProvider, UserConsumer };

export default UserContext;
