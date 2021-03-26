import mongoose from "mongoose";

const dbConnect = () => {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return (
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    (err) => {
      if (err) throw err;
      console.log("connected to mongodb");
    }
  );
};

export default dbConnect;
