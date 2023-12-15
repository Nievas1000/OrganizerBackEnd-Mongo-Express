const User = require("../model/user");
const { encrypt, compare } = require("../Helpers/handleBcrypt");
const jwt = require("jsonwebtoken");
const expireTime = 4 * 60 * 60;

exports.createUser = async (req, res) => {
  const { name, password, imagen, email } = req.body;

  if (email) {
    try {
      const userExist = await User.findOne({ email });

      if (!userExist) {
        const hashedPassword = password ? await encrypt(password) : null;
        const token = jwt.sign(
          { userId: existingUser._id, email: existingUser.email },
          "kira",
          { expiresIn: expireTime }
        );

        const newUser = new User({
          name,
          password: hashedPassword,
          imagen,
          email,
        });

        await newUser.save();
        res.status(200).json({
          message: "User created!",
          token,
          user: { name: existingUser.name, email: existingUser.email },
        });
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
      if (existingUser) {
        const passwordMatch = await compare(password, existingUser.password);
        const token = jwt.sign(
          { userId: existingUser._id, email: existingUser.email },
          "kira",
          { expiresIn: expireTime }
        );

        if (passwordMatch) {
          res.status(200).json({
            user: existingUser,
            token,
            user: { name: existingUser.name, email: existingUser.email },
          });
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
  const { email, isExternal } = req.body;

  if (email) {
    try {
      const userExist = await User.findOne({ email });

      if (userExist) {
        if (isExternal) {
          const token = jwt.sign(
            { userId: userExist._id, email: userExist.email },
            "kira",
            { expiresIn: expireTime }
          );
          res.status(200).json({
            message: "User exist!",
            exist: true,
            token: token,
            user: { name: userExist.name, email: userExist.email },
          });
        } else {
          res.status(200).json({
            message: "User exist!",
            exist: true,
            password: userExist.password ? true : false,
          });
        }
      } else {
        res.status(200).json({
          error: "There is not a user with that email.",
          exist: false,
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(400).json({ error: "Missing required fields" });
  }
};

exports.addPasswordToUser = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const userExist = await User.findOne({ email });

      if (userExist) {
        const hashedPassword = await encrypt(password);
        const token = jwt.sign(
          { userId: existingUser._id, email: existingUser.email },
          "kira",
          { expiresIn: expireTime }
        );

        userExist.password = hashedPassword;
        await userExist.save();

        res.status(200).json({
          error: "The password was updated.",
          exist: false,
          token,
          user: { name: userExist.name, email: userExist.email },
        });
      } else {
        res.status(409).json({
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

exports.checkLogin = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Token doesn`n exist." });
  }

  jwt.verify(token, "kira", (error, data) => {
    if (error) {
      return res.status(403).json({ error: "Invalid Token." });
    }
    res.status(200).json({
      authorized: true,
      data,
    });
  });
};
