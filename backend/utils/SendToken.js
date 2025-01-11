const sendToken = (user, statusCode, res) => {
  const token = user.getjwtoken();
  const option = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie("token", token, option)
    .json({ success: true, id: user._id, token });
};

export default sendToken;
