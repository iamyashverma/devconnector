const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API REQUEST SENT");
});

//Init body parser

app.use(express.json({ extended: false }));

// Define routes

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

app.listen(PORT, () => {
  console.log(`Server Started at Port ${PORT}`);
});
