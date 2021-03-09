import dbConnect from "../../../util/dbConnect";
import home from "../../../Models/homeModel";
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
      await getHome(req, res);

      break;
    case "POST":
      await postHome(req, res);

      break;
  }
};

const getHome = async (req, res) => {
  try {
    const Homes = await home.find({});
    res.json({
      status: "success",
      result: Homes.length,
      Homes,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
