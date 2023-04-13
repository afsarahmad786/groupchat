const Chat = require("../models/chat");
const User = require("../models/user");
const Group = require("../models/group");
const Participent = require("../models/participants");
const jwt = require("jsonwebtoken");
const path = require("path");
const { Op } = require("sequelize");

exports.sendmessage = async (req, res, next) => {
  const { message, groupid } = req.body;
  Chat.create({
    message: message,
    is_read: 0,
    userId: req.user.id,
    groupId: groupid,
  })
    .then((result) => {
      res.json({
        message: "Message Send Successfully",
        success: true,
        data: result,
      });
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.chatpage = async (req, res, next) => {
  res.sendFile("home.html", {
    root: path.join(__dirname, "../public/views"),
  });
};

exports.getchat = async (req, res, next) => {
  Chat.findAll({
    where: {
      userId: req.user.id,
      // [Op.or]: [{ reciever_id: 2 }, { reciever_id: req.user.id }],
    },
    // where: {
    //   [Op.and]: [{ userId: 2 }, { reciever_id: req.user.id }],
    //   // [Op.and]: [{ userId: req.user.id }, { reciever_id: 2 }],
    // },
  })
    .then((result) => {
      console.log(result);
      res.json({
        message: "Message Fetched Successfully",
        success: true,
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.getnewchat = async (req, res, next) => {
  const lastid = req.query.id;
  Chat.findAll({
    where: {
      [Op.and]: [
        { userId: req.user.id },

        {
          id: {
            [Op.gt]: lastid,
          },
        },
      ],
    },

    include: [
      {
        attributes: ["id", "name", "email", "phone"],
        model: User,
      },
    ],
  })
    .then((result) => {
      console.log(result);
      res.json({
        message: "Message Fetched Successfully",
        success: true,
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.creategroup = async (req, res, next) => {
  const { name, ids } = req.body;
  const group = await Group.create({
    name: name,
    userId: req.user.id,
  })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
  for (const id of ids) {
    Participent.create({
      groupId: group["id"],
      userId: id,
      is_admin: false,
    })
      .then((result) => {
        //  return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  Participent.create({
    groupId: group["id"],
    userId: req.user.id,
    is_admin: true,
  })
    .then((result) => {
      //  return result;
    })
    .catch((err) => {
      console.log("participaent", err);
    });
  res.json({
    message: "Group Created Successfully",
    success: true,
    data: group,
  });
};

exports.getgroup = async (req, res, next) => {
  const participent = await Participent.findAll({
    where: {
      userId: req.user.id,
    },
    attributes: ["id", "groupId"],
    include: [
      {
        model: Group,
      },
    ],
  })
    .then((result) => {
      // return result
      res.json({
        message: "Group Fetched Successfully",
        success: true,
        data: result,
      });
    })
    .catch((err) => console.log(err));

  // Group.findAll({
  //   where: {
  //     userId: req.user.id,
  //   },
  //   attributes: ["id", "name"],
  // })
  //   .then((result) => {
  //     console.log('testttttttttttttttttttt', req.user.id);
  //     res.json({
  //       message: "Group Fetched Successfully",
  //       success: true,
  //       data: result,
  //     });
  //   })
  //   .catch((err) => console.log(err));
};

exports.grouppage = async (req, res, next) => {
  res.sendFile("group.html", {
    root: path.join(__dirname, "../public/views"),
  });
};

exports.getgroupchat = async (req, res, next) => {
  const id = req.query.id;
  const groupchate = await Group.findByPk(id)
    .then((result) => {
      return result;
    })
    .catch((err) => console.log(err));
  // const participants=await  Participent.findAll({
  //   where: {
  //     groupId:groupchate['id'],
  //   },
  // })
  // .then((result) => {
  //   return result
  // })
  // .catch((err) => console.log(err));
  Chat.findAll({
    where: {
      groupId: groupchate["id"],
    },
  })
    .then((result) => {
      res.json({
        message: "Group Fetched Successfully",
        success: true,
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.getparticipent = async (req, res, next) => {
  const filter = req.query.filter;
  const groupid = req.query.groupid;

  Participent.findAll({
    where: {
      [Op.and]: [{ groupId: groupid }],
    },
    include: [
      {
        attributes: ["id", "name", "email", "phone"],
        model: User,
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: filter + "%",
              },
            },
            {
              email: {
                [Op.like]: filter + "%",
              },
            },
            {
              phone: {
                [Op.like]: filter + "%",
              },
            },
          ],
        },
      },
    ],
  })
    .then((result) => {
      res.json({
        message: "Participent Fetched Successfully",
        success: true,
        data: result,
      });
    })
    .catch((err) => console.log(err));
};
exports.makeadmin = async (req, res, next) => {
  const id = req.query.id;
  const groupId = req.query.groupId;
  Participent.update(
    { is_admin: true },
    {
      where: {
        userId: id,
        groupId: groupId,
      },
    }
  )
    .then((result) => {
      res.redirect("back");
      res.json({
        message: "Participent added to admin Successfully",
        success: true,
      });
    })
    .catch((err) => console.log(err));
};
exports.removeuser = async (req, res, next) => {
  const id = req.query.id;
  const groupId = req.query.groupId;
  Participent.destroy({
    where: {
      userId: id,
      groupId: groupId,
    },
  })
    .then((result) => {
      // res.redirect('back');
    })
    .catch((err) => console.log(err));

  Chat.destroy({
    where: {
      userId: id,
      groupId: groupId,
    },
  })
    .then((result) => {
      res.redirect("back");
    })
    .catch((err) => console.log(err));
};
exports.adduser = async (req, res, next) => {
  const groupId = req.query.groupid;
  const allparticipent = await Participent.findAll({
    attributes: ["userId"],
    raw: true,

    where: {
      [Op.and]: [{ groupId: groupId }],
    },
  })
    .then((results) => results.map((result) => result.userId))
    .catch((err) => console.log(err));
  User.findAll({
    attributes: ["id", "name"],

    where: {
      id: { [Op.notIn]: allparticipent },
    },
  })
    .then((result) => {
      console.log("participent resit", result);
      res.json({
        message: "Participent Listing",
        success: true,
        data: result,
      });
    })
    .catch((err) => console.log(err));
};

exports.addparticipent = async (req, res, next) => {
  const { ids } = req.body;
  console.log("idssssssssssssssss", ids);
  const groupId = req.query.groupid;

  for (const id of ids) {
    Participent.create({
      groupId: groupId,
      userId: id,
      is_admin: false,
    })
      .then((result) => {
        res.json({
          message: "Participent added",
          success: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
