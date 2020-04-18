import React, { createContext, useState } from "react";

export const MessagesContext = createContext();

const MessagesContextProvider = (props) => {
  const [messages, setMessages] = useState([]);
  const [playerTurn, setPlayerTurn] = useState("");
  const [gameStatus, setGameStatus] = useState("PLAYING");

  return (
    <MessagesContext.Provider
      value={{
        messages,
        setMessages,
        playerTurn,
        setPlayerTurn,
        gameStatus,
        setGameStatus,
      }}
    >
      {props.children}
    </MessagesContext.Provider>
  );
};

export default MessagesContextProvider;
