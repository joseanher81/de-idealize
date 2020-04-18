import React, { createContext, useState } from "react";

export const GameContext = createContext();

const GameContextProvider = (props) => {
  const [messages, setMessages] = useState([]);
  const [playerTurn, setPlayerTurn] = useState("");
  const [gameStatus, setGameStatus] = useState("PLAYING");

  return (
    <GameContext.Provider
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
    </GameContext.Provider>
  );
};

export default GameContextProvider;
