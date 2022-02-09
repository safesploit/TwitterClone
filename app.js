/**
 * @constant io is being used in /public/js/clientSocket.js
 * Socket.IO on the client connected back via @constant port = XXXX;
 */
const express = require('express');
const app = express();
const port = 3003;
const middleware = require('./middleware')
const path = require('path')
const bodyParser = require("body-parser")
const mongoose = require("./database");
const session = require('express-session');
//const io = require("socket.io"); //CAN BE DELETED

const server = app.listen(port, () => console.log("Server listening on port " + port));
const io = require("socket.io")(server, { pingTimeout: 60000 });

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.urlencoded({ extended: false })); //app.use(bodyParser.urlencoded({ extended: false })); //bodyParser deprecated in Express v4.16+ // amended for ./routes/{loginRoutes, logout}.js
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
	secret: "beef cake",
	resave: true,
	saveUninitialized: false
}))

// Routes
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');
const logoutRoute = require('./routes/logout');
const postRoute = require('./routes/postRoutes');
const profileRoute = require('./routes/profileRoutes');
const uploadRoute = require('./routes/uploadRoutes');
const searchRoute = require('./routes/searchRoutes');
const messagesRoute = require('./routes/messagesRoutes');
const notificationsRoute = require('./routes/notificationsRoutes');

// API Routes
const postsApiRoute = require('./routes/api/postsAPI');
const usersApiRoute = require('./routes/api/usersAPI');
const chatsApiRoute = require('./routes/api/chatsAPI');
const messagesApiRoute = require('./routes/api/messagesAPI');
const notificationsApiRoute = require('./routes/api/notificationsAPI');


//Use Routes
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);
app.use("/posts", middleware.requireLogin, postRoute);
app.use("/profile", middleware.requireLogin, profileRoute);
app.use("/uploads", uploadRoute);
app.use("/search", middleware.requireLogin, searchRoute);
app.use("/messages", middleware.requireLogin, messagesRoute);
app.use("/notifications", middleware.requireLogin, notificationsRoute);

//Use API Routes
app.use("/api/posts", postsApiRoute);
app.use("/api/users", usersApiRoute);
app.use("/api/chats", chatsApiRoute);
app.use("/api/messages", messagesApiRoute);
app.use("/api/notifications", notificationsApiRoute);


app.get("/", middleware.requireLogin, (req, res, next) => {

    var payload = {
        pageTitle: "Home",
		userLoggedIn: req.session.user,
		//userLoggedInJs: '{' + '"_id":' + JSON.stringify(req.session.user._id) + '}', //Modified for security purposes
		userLoggedInJs: JSON.stringify(req.session.user),
    }

    res.status(200).render("home", payload);
})

io.on("connection", socket => {
	
    socket.on("setup", userData => {
        socket.join(userData._id);
        socket.emit("connected");
    })

	socket.on("join room", room => socket.join(room));
	socket.on("typing", room => socket.in(room).emit("typing"));
	socket.on("stop typing", room => socket.in(room).emit("stop typing"));
	socket.on("notification received", room => socket.in(room).emit("notification received"));

    socket.on("new message", newMessage => {
        var chat = newMessage.chat;

        if(!chat.users) return console.log("Chat.users not defined");

        chat.users.forEach(user => {
            
            if(user._id == newMessage.sender._id) return;
            socket.in(user._id).emit("message received", newMessage);
        })
    });
	
}) 
