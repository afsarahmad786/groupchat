const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
const sequelize = require("./util/database");
const User = require("./models/user");
const Chat = require("./models/chat");
const UserRoutes = require("./routes/user");
const ChatRoutes = require("./routes/chat");
var cors = require("cors");
const path = require("path");
const Group = require("./models/group");
const Participant = require("./models/participants");
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());

app.use(UserRoutes);
app.use(ChatRoutes);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "js")));

User.hasMany(Chat);
User.hasOne(Participant);

Chat.belongsTo(User);
Group.hasMany(Chat);
Group.belongsTo(User);

Participant.belongsTo(Group);
Participant.belongsTo(User);
// Participant.belongsTo(User, { foreignKey: "UserId", as: "UserData" });

const port = 3000;
User.hasMany;
sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    app.listen(process.env.PORT || port, () => {
      console.log(`Server running at http://${port} \n`);
    });
  })

  // console.log(user);
  .catch((err) => {
    console.log(err);
  });
