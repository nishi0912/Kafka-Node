import {} from "dotenv/config";

import mongoose from "mongoose";

// Connect to mongodb database.
const mongo_url = process.env.MONGO_LOCAL_URI;

const connection = mongoose
  .connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // console.log(
    //   "------------------------------------------------------------------------"
    // );
    // console.log("Mongo Connected Successfully");
  })
  .catch((error) => console.log({ error }));

export default connection;
