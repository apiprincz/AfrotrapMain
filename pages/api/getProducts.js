import dbConnect from "../../util/dbConnect";
import dotenv from "dotenv";

import Products from "../../Models/productModel.js";
import Cors from "cors";
// import mongoose from "mongoose";
import { MongoClient } from "mongodb";
// const env = require("../../../env-config.js");

dotenv.config({ path: "ENV_FILENAME" });

export const getProducts = async () => {
  const client = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URL, {
    auth: {
      user: process.env.MONGODB_USER,
      password: process.env.MONGODB_PASS,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  if (!client.isConnected()) await client.connect();

  const database = client.db("Afrotrap");
  const products = await database.collection("products").find({}).toArray();

  console.log(products);
};
// const cors = Cors({
//   methods: ["GET", "HEAD"],
// });

// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }

//       return resolve(result);
//     });
//   });
// }
// export default async (req, res) => {
//   switch (req.method) {
//     case "GET":
//       await runMiddleware(req, res, cors);

//       await getProducts(req, res);

//       break;
//   }
// };

// export const getProducts = async (req, res) => {
//   try {
//     const products = await Products.find({});
//     res.json({
//       status: "success",
//       result: products.length,
//       products,
//     });
//   } catch (err) {
//     return res.status(500).json({ err: err.message });
//   }
// };
