import React, { createContext, useState } from "react";

export const MessagesContext = createContext();

const MessagesContextProvider = (props) => {
  const [messages, setMessages] = useState([]);
  const [playerTurn, setPlayerTurn] = useState("");

  return (
    <MessagesContext.Provider
      value={{ messages, setMessages, playerTurn, setPlayerTurn }}
    >
      {props.children}
    </MessagesContext.Provider>
  );
};

export default MessagesContextProvider;
