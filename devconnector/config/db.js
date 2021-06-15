const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is connected...");
  } catch (err) {
    console.error("Error connecting DB...");
  }
};

module.exports = connectDB;
