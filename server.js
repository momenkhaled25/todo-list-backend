const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

const userRouter = require("./routes/userRoute");
const tasksRouter = require("./routes/tasksRoute");

// Middlewares
app.use(express.json());
app.use(cors());

//api routes
app.use("/user", userRouter);
app.use("/task", tasksRouter);

// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// Connect to MongoDB
connectDB();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
