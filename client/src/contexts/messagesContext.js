import React, { createContext, useState } from "react";

export const MessagesContext = createContext();

const MessagesContextProvider = (props) => {
  const [messages, setMessages] = useState([]);

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {props.children}
    </MessagesContext.Provider>
  );
};

export default MessagesContextProvider;
