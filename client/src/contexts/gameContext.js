import React, { createContext, useState } from "react";

export const GameContext = createContext();

const GameContextProvider = (props) => {
  const [messages, setMessages] = useState([]);
  const [playerTurn, setPlayerTurn] = useState("");
  const [gameStatus, setGameStatus] = useState("PLAYING");
  const [match, setMatch] = useState(100);
  const [stage, setStage] = useState(0);
  const [picShown, setPicShown] = useState(0);
  const [game, setGame] = useState();
  const [rival, setRival] = useState();
  const [currentQuiz, setCurrentQuiz] = useState({});
  const [ownAnwser, setOwnAnswer] = useState(undefined);
  const [rivalAnswer, setRivalAnswer] = useState(undefined);

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
        game,
        setGame,
        rival,
        setRival,
        currentQuiz,
        setCurrentQuiz,
        ownAnwser,
        setOwnAnswer,
        rivalAnswer,
        setRivalAnswer,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
