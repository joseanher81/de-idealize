const { io } = require("./../bin/www");

let clients = [];

io.on("connection", function (client) {
  console.log("a user connected!!");

  // Store client info
  client.on("storeClientInfo", function (data) {
    let clientInfo = {
      user: data.user,
      socketId: client.id,
    };
    clients.push(clientInfo);
    console.log("CLIENTS ARRAY " + JSON.stringify(clients));
  });

  // Diconnect
  client.on("disconnect", () => {
    console.log("User disconnected");
    clients = clients.filter((c) => {
      return c.socketId !== client.id;
    });
    console.log("CLIENTS ARRAY " + clients);
  });

  // Listen to client
  // client.on("enviarMensaje", (data, callback) => {
  //   const { to, message } = data;
  //   console.log("DATA " + to + " " + message);
  //   callback({
  //     resp: "TODO SALIO BIEN!",
  //   });
  // });

  // Private messages
  client.on("mensajePrivado", (data) => {
    const { user, message } = data;
    console.log(`Mensaje privado - user: ${user} message: ${message}`);
    let toClient = clients.find((c) => c.user === user);
    console.log(
      "Mensaje privado - client:" + JSON.stringify(toClient.socketId)
    );
    client.broadcast
      .to(toClient.socketId)
      .emit("mensajePrivado", { text: message, own: false });
  });

  // Answer to quiz
  client.on("quizAnswer", (data) => {
    const { user, answer } = data;
    console.log(`Answer to quiz - user: ${user} answer: ${answer}`);
    let toClient = clients.find((c) => c.user === user);
    console.log("Answer to quiz - client:" + JSON.stringify(toClient.socketId));
    client.broadcast
      .to(toClient.socketId)
      .emit("quizAnswer", { answer: answer });
  });

  // Timeout management
  client.on("timeout", (data) => {
    const { user } = data;
    let toClient = clients.find((c) => c.user === user);

    client.broadcast.to(toClient.socketId).emit("timeout");
  });
});
