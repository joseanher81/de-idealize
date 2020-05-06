import io from "socket.io-client";
export const socket = io(process.env.REACT_APP_SERVER);

// Send a private message
export const sendMessage = (rivalId, message) => {
  socket.emit(
    "privateMessage",
    {
      user: rivalId,
      message: message,
    },
    function (resp) {
      console.log("Server response: ", resp);
    }
  );
};

// Send a answer to quiz
export const sendAnswer = (rivalId, answer) => {
  socket.emit(
    "quizAnswer",
    {
      user: rivalId,
      answer: answer,
    },
    function (resp) {
      console.log("Server response: ", resp);
    }
  );
};

// Obtain socket id of client
export const getSocketId = () => {
  return socket.id;
};

export const storeClientInfo = (user) => {
  socket.emit("storeClientInfo", { user: user });
};

// Send timeout to rival
export const sendTimeOut = (rivalId) => {
  console.log("Sending time out from client service to " + rivalId);
  socket.emit("timeout", { user: rivalId });
};

// Checking players readiness for playing
export const sendAreYouThere = (rivalId) => {
  console.log("SendAreYouThere " + rivalId);
  socket.emit("areyouthere", { user: rivalId });
};

export const sendIAmHere = (rivalId) => {
  socket.emit("iamhere", { user: rivalId });
};

// Share a question for the Quiz
export const shareQuiz = (quiz, user) => {
  socket.emit("shareQuiz", { quiz: quiz, user: user });
};

// Notify unmatch
export const unmatch = (rivalId) => {
  socket.emit("unmatch", { user: rivalId });
};