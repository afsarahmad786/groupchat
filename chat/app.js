const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
const sequelize = require("./util/database");
const User = require("./models/user");
const Chat = require("./models/chat");
const Image = require("./models/image");
const UserRoutes = require("./routes/user");
const ChatRoutes = require("./routes/chat");
var cors = require("cors");
const path = require("path");
const Group = require("./models/group");
const Participant = require("./models/participants");
const fileUpload = require("express-fileupload");

const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  fileUpload({
    limits: {
      fileSize: 2000000, // Around 10MB
    },
    abortOnLimit: true,
  })
);

app.use(cors());

app.use(UserRoutes);
app.use(ChatRoutes);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "js")));
app.use(express.static("public/upload"));

User.hasMany(Chat);
User.hasOne(Participant);

Chat.belongsTo(User);
Group.hasMany(Chat);
Group.belongsTo(User);

Participant.belongsTo(Group);
Participant.belongsTo(User);

// Image.belongsTo(Chat);
// Participant.belongsTo(User, { foreignKey: "UserId", as: "UserData" });
Chat.belongsTo(Image, { foreignKey: "imageId", as: "ImageData" });

io.on("connection", (socket) => {
  socket.on("send-message", (message, file) => {
    socket.broadcast.emit("recieve-message", message, file);
  });
  socket.on("sender-message", (message, room) => {
    socket.emit("reciever-message", message, room);
  });
});

cron.schedule("59 23 * * *", function () {
  console.log("---------------------");
  console.log("Running Cron Job");
});
const port = 3000;
User.hasMany;
sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    server.listen(process.env.PORT || port, () => {
      console.log(`Server running at http://${port} \n`);
    });
  })

  // console.log(user);
  .catch((err) => {
    console.log(err);
  });
