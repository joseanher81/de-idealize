import React, { createContext, useState } from "react";

export const GameContext = createContext();

const GameContextProvider = (props) => {
  const [messages, setMessages] = useState([]);
  const [playerTurn, setPlayerTurn] = useState("");
  const [gameStatus, setGameStatus] = useState("PLAYING");
  const [match, setMatch] = useState(100);
  const [stage, setStage] = useState(0);
  const [picShown, setPicShown] = useState(0);

  return (
    <GameContext.Provider
      value={{
        messages,
        setMessages,
        playerTurn,
        setPlayerTurn,
        gameStatus,
        setGameStatus,
        match,
        setMatch,
        stage,
        setStage,
        picShown,
        setPicShown,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
