import React, { useState, useContext } from "react";
import IndexLayout from "../../Layouts/index";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useWindowResize } from "../../util/windowResize";
import { addToCart } from "../../store/Actions";
import { getData } from "../../util/fetchData";

import Styles from "../../styles/Product.module.css";
import { DataContext } from "../../store/GlobalState";

const index = ({ products }) => {
  const [state, dispatch] = useContext(DataContext);
  const { cart } = state;
  //   const { cart, setCart } = useState(cart);
  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "USD",
    }).format(value);

  return (
    <IndexLayout>
      <div className="px-5" style={{ paddingTop: "100px" }}>
        <h1>Products</h1>
        <div className={` col-md-12 ${Styles.productContainer}`}>
          {products.map((product, index) => {
            return (
              <div
                key={index}
                style={{
                  border: "1px solid #707070",
                  //   minHeight: "400px",
                }}
                className={` col-md-4 ${Styles.product} pb-2`}
              >
                <div className="d-flex flex-column align-content-start ">
                  <img
                    src={product.images[0].url}
                    alt="brownhoodie"
                    key={index}
                    style={{ height: "240px" }}
                  />

                  <div className="px-4 pt-2 text-start">
                    <Link href={`/product/${product._id}`}>
                      <a className="mb-0 ">{product.title}</a>
                    </Link>
                    <p>
                      <Link href={`/product/${product._id}`}>
                        {numberFormat(product.price)}
                      </Link>
                    </p>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <p>
                          <FontAwesomeIcon
                            icon={["fas", "compress-arrows-alt"]}
                            style={{
                              width: "14px",
                              marginLeft: "0px",
                              marginRight: "3px",
                            }}
                          />{" "}
                          {product.category[0].sex}
                        </p>
                      </div>
                      <div className="d-flex align-items-center">
                        <p>
                          <FontAwesomeIcon
                            icon={["fas", "map-marker-alt"]}
                            style={{
                              width: "14px",
                              marginLeft: "0px",
                              marginRight: "3px",
                            }}
                          />{" "}
                          {product.category[0].location}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between pt-4">
                      <Link href={`/product/${product._id}`}>Details</Link>
                      <button
                        style={{
                          padding: "10px",
                          background: "black",
                          color: "#FFF",
                          border: "1px solid grey",
                        }}
                        onClick={() => dispatch(addToCart(product, cart))}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </IndexLayout>
  );
};

export async function getServerSideProps() {
  const res = await getData("product");
  //   const data = await res.json();
  console.log(res);
  // res = JSON.stringify(res.winners);
  return {
    props: {
      products: JSON.parse(JSON.stringify(res.products)),
      result: res.result,
    }, // will be passed to the page component as props
  };
}

export default index;
