import io from "socket.io-client";
export const socket = io("localhost:5000");

// Send a private message
export const sendMessage = (rivalId, message) => {
  socket.emit(
    "mensajePrivado",
    {
      to: rivalId,
      message: message,
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

// Listen to private message
/* socket.on("mensajePrivado", function (msg) {
  console.log("Mensaje Privado:", msg);
}); */
