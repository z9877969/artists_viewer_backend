const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { createError } = require("../helpers");
const { User } = require("../models/");

const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      throw createError(409, "Provided email already exists");
    }

    const apiKey = uuidv4();

    const hashedPassowd = await bcrypt.hash(password, 10);

    const data = await User.create({ email, password: hashedPassowd, apiKey });

    res.json({ apiKey: data.apiKey });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw createError(400, "Email or password is wrong");
    }

    const isPaswordCompare = await bcrypt.compare(password, user.password);

    if (!isPaswordCompare) {
      throw createError(400, "Email or password is wrong");
    }

    res.json({ apiKey: user.apiKey });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
