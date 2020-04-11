const { io } = require("./../bin/www");

io.on("connection", function (client) {
  console.log("a user connected!!");

  // Diconnect
  client.on("disconnect", () => {
    console.log("User disconnected");
  });

  // Listen to client
  client.on("enviarMensaje", (data, callback) => {
    console.log(data);
    callback({
      resp: "TODO SALIO BIEN!",
    });
  });
});
