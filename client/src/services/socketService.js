import io from "socket.io-client";
export const socket = io("localhost:5000");

// Send a private message
export const sendMessage = (rivalId, message) => {
  socket.emit(
    "mensajePrivado",
    {
      user: rivalId,
      message: message,
    },
    function (resp) {
      console.log("respuesta server: ", resp);
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
      console.log("respuesta server: ", resp);
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
  socket.emit("timeout", { user: rivalId });
};

// Listen to private message
/* socket.on("mensajePrivado", function (msg) {
  console.log("Mensaje Privado:", msg);
}); */
