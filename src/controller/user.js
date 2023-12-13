const mongoose = require("mongoose");
const User = require("../model/user");
const { encrypt, compare } = require("../Helpers/handleBcrypt");

exports.createUser = async (req, res) => {
  const { name, password, imagen, email } = req.body;

  if (email) {
    try {
      const userExist = await User.findOne({ email });

      if (!userExist) {
        const hashedPassword = password ? await encrypt(password) : null;

        const newUser = new User({
          name,
          password: hashedPassword,
          imagen,
          email,
        });

        await newUser.save();
        res.status(200).json({ message: "User created!" });
      } else {
        res
          .status(409)
          .json({ error: "There is already a user with this email." });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(400).json({ error: "Missing required fields" });
  }
};

exports.checkUser = async (req, res) => {
  const { password, email } = req.body;

  if (password && email) {
    try {
      const existingUser = await User.findOne({ email });
      console.log(existingUser);
      if (existingUser) {
        const passwordMatch = await compare(password, existingUser.password);

        if (passwordMatch) {
          res.status(200).json({ user: existingUser });
        } else {
          res.status(401).json({ error: "Invalid email or password" });
        }
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(400).json({ error: "Missing required fields" });
  }
};

exports.getUserByEmail = async (req, res) => {
  const { email } = req.body;

  if (email) {
    try {
      const userExist = await User.findOne({ email });

      if (userExist) {
        res.status(200).json({ message: "User exist!", exist: true });
      } else {
        res.status(200).json({
          error: "There is not a user with that email.",
          exist: false,
        });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(400).json({ error: "Missing required fields" });
  }
};
