const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const PORT = process.env.PORT || 5500;
const app = express();
const server = http.createServer(app);
const io = socketIo(server,{cors:{origin:"https://capable-crisp-a7ee65.netlify.app"}});
const cors = require("cors");

app.use(express.json())
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST',"PUT","DELETE"]
  }));
io.on("connection", async (socket) => {
    try {

        socket.on("connecting room", (route) => {
            socket.join(route);
            console.log("User joined room:", route);
        });

        socket.on("message", async (message, route, user) => {
            io.to(route).emit("show", message, user)})
    } catch (error) {
        console.error("Socket.io error:", error);
    }
});

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
