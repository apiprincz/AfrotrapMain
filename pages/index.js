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
  if (typeof window !== "undefined") {
    dotenv.config({ path: "ENV_FILENAME" });
  }
  dotenv.config({ path: "ENV_FILENAME" });

  const client = new MongoClient(process.env.MONGODB_URL, {
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

  if (!products) {
    return {
      notFound: true,
    };
  }

  return {
    props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to the page component as props
  };
}
