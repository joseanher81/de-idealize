const { io } = require("./../bin/www");

io.on("connection", function (client) {
  console.log("a user connected!!");

  // Diconnect
  client.on("disconnect", () => {
    console.log("User disconnected");
  });

  // Listen to client
  client.on("enviarMensaje", (data, callback) => {
    const { to, message } = data;
    console.log("DATA " + to + " " + message);
    callback({
      resp: "TODO SALIO BIEN!",
    });
  });

  // Pivate messages
  client.on("mensajePrivado", (data) => {
    const { to, message } = data;
    //let persona = usuarios.getPersona(client.id);
    client.broadcast.to(to).emit("mensajePrivado", message);
  });
});
