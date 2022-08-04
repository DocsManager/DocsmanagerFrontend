import React, { createContext, useState } from "react";

export const UserContext = createContext({
  user: {},
  setUserHandler: (user) => {},
});

const UserContextProvide = ({ children }) => {
  const [user, setUser] = useState({});

  const setUserHandler = (user) => setUser(user);

  return (
    <UserContext.Provider value={{ user, setUserHandler }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvide;
