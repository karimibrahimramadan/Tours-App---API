require("dotenv").config();

process.on("uncaughtException", (err) => {
  console.log("Uncaught exception error!");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require("./app");
const connectDB = require("./config/db");
const port = process.env.PORT || 3000;

const server = app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`.cyan.underline);
  await connectDB();
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection error!");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
