import dbConnect from "./util/dbConnect";
import dotenv from "dotenv";

import Products from "../../../Models/productModel";
import Cors from "cors";

// dotenv.config({ path: "ENV_FILENAME" });

dbConnect();
const cors = Cors({
  methods: ["GET", "HEAD"],
});

export const getProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    res.json({
      status: "success",
      result: products.length,
      products,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
