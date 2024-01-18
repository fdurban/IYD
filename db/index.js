const mongoose = require("mongoose");

const { MONGODB_URI, MONGODB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === "test" ? MONGODB_URI_TEST : MONGODB_URI

// const MONGO_URI =
//   process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/IYD";

mongoose
  .connect(connectionString)
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
