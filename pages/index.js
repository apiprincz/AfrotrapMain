import Head from "next/head";
import IndexLayout from "../Layouts";
import Banner from "../Components/Banner";
import Content from "../Components/Content";
import { getData } from "../util/fetchData";
import { useState } from "react";
// import { server, baseUrl } from "../config";
// import Products from "../Models/productModel";
import mongoose from "mongoose";
import { MongoClient } from "mongodb";

import dotenv from "dotenv";

const Home = ({ products }) => {
  return (
    <div>
      <Head>
        <title>Afrotrap Web App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <IndexLayout>
          <Banner />
          <Content products={products} />
        </IndexLayout>
      </main>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  dotenv.config({ path: "ENV_FILENAME" });

  const client = new MongoClient(
    "mongodb+srv://Adeniyi:IMI6WmuFoyZabLTr@cluster0.vkj85.mongodb.net/Afrotrap?retryWrites=true&w=majority",
    {
      auth: {
        user: process.env.MONGODB_USER,
        password: process.env.MONGODB_PASS,
      },
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  if (!client.isConnected()) await client.connect();

  /* WinnersSchema will correspond to a collection in your MongoDB database. */
  // const product = new mongoose.Schema({
  //   id: {
  //     type: Number,
  //   },
  //   title: {
  //     type: String,
  //     trim: true,
  //   },
  //   price: {
  //     type: Number,
  //   },
  //   description: {
  //     type: String,
  //   },
  //   content: {
  //     type: String,
  //     trim: true,
  //   },
  //   images: {
  //     type: Array,
  //   },
  //   category: {
  //     type: Array,
  //   },
  //   details: {
  //     type: Array,
  //   },
  //   checked: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   colors: {
  //     type: Array,
  //   },
  //   inStock: {
  //     type: Number,
  //     default: 0,
  //   },
  //   sold: {
  //     type: Number,
  //     default: 0,
  //   },
  //   discount: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   location: {
  //     type: String,
  //     default: "Dallas Texas",
  //   },
  // });

  // const dbConnect = () => {
  //   if (mongoose.connection.readyState >= 1) {
  //     return;
  //   }

  //   return (
  //     mongoose.connect(
  //       "mongodb+srv://Adeniyi:IMI6WmuFoyZabLTr@cluster0.vkj85.mongodb.net/Afrotrap?retryWrites=true&w=majority",
  //       {
  //         useNewUrlParser: true,
  //         useUnifiedTopology: true,
  //         useFindAndModify: false,
  //         useCreateIndex: true,
  //       }
  //     ),
  //     (err) => {
  //       if (err) throw err;
  //       console.log("connected to mongodb");
  //     }
  //   );
  // };
  // dbConnect();

  // async (req, res) => {
  //   try {
  //     const products = await product.find({});
  //     res.json({
  //       status: "success",
  //       result: products.length,
  //       products,
  //     });
  //   } catch (err) {
  //     return res.status(500).json({ err: err.message });
  //   }
  // };
  const database = client.db("Afrotrap");
  const products = await database.collection("products").find({}).toArray();

  console.log(products);

  if (!products) {
    return {
      notFound: true,
    };
  }

  return {
    props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
  };
}
