const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://nievas100:29075159@cluster0.ub7ny08.mongodb.net/?retryWrites=true&w=majority",
      {
        autoIndex: true,
      }
    );
    console.log("Successful connection to the database");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
