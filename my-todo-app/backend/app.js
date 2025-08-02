require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const directoryRoutes = require("./routes/directoryRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/directories", directoryRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

console.log("Mongo URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Connection error", err);
  });
