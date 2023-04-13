const jwt = require("jsonwebtoken");

exports.setCookie = async (res, user, message) => {
  const token = jwt.sign(
    { userId: user.id, name: user.name },
    "987546585454566985abavchafjagjaaj1",
    {
      expiresIn: "11h",
    }
  );

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
  };
  res.status(200).cookie("token", token, cookieOptions).json({
    success: true,
    message,
    user,
  });
};
