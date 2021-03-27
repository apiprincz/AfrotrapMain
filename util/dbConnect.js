import mongoose from "mongoose";
// require("dotenv").config({ path: "ENV_FILENAME" });

dotenv.config({ path: "ENV_FILENAME" });

const dbConnect = () => {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return (
    mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL, {
      auth: {
        user: process.env.NEXT_PUBLIC_MONGODB_USER,
        password: process.env.NEXT_PUBLIC_MONGODB_PASS,
      },
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    (err) => {
      if (err) throw err;
      console.log("connected to mongodb");
    }
  );
};

export default dbConnect;
