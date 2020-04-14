import io from "socket.io-client";
const socket = io("localhost:5000");

export const sendMessage = (user, message) => {
  socket.emit(
    "enviarMensaje",
    {
      usuario: user,
      mensaje: message,
    },
    function (resp) {
      console.log("respuesta server: ", resp);
    }
  );
};

export const getSocketId = () => {
  return socket.id;
};
