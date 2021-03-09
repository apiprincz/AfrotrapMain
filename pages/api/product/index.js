import dbConnect from "../../../util/dbConnect";
import Products from "../../../Models/productModel";
import Cors from "cors";

dbConnect();
const cors = Cors({
  methods: ["GET", "HEAD"],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
export default async (req, res) => {
  await runMiddleware(req, res, cors);

  switch (req.method) {
    case "GET":
      await getProducts(req, res);

      break;
  }
};

const getProducts = async (req, res) => {
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
