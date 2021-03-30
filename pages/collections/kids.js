import React, { useState, useContext, useEffect } from "react";
import IndexLayout from "../../Layouts/index";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useWindowResize } from "../../util/windowResize";
import { addToCart } from "../../store/Actions";
import { notify } from "../../store/Actions";
import { getData } from "../../util/fetchData.js";
// import Notify from "../../Components/Notify";
import Styles from "../../styles/Product.module.css";
import { DataContext } from "../../store/GlobalState";
import { resetNotif } from "../../store/Actions";

const index = ({ products }) => {
  const [state, dispatch] = useContext(DataContext);
  const { cart } = state;
  //   const { cart, setCart } = useState(cart);
  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "USD",
    }).format(value);

  const handleSubmit = (product, cart) => {
    dispatch(addToCart(product, cart));
    dispatch(notify(product, cart));
    setTimeout(function () {
      dispatch(resetNotif(notify));
    }, 3000);
  };

  let [filteredproducts, setFilteredProducts] = useState(products);
  useEffect(() => {
    let filterproducts = filteredproducts.filter(
      (product) => product.category[0].sex === "kids"
    );
    setFilteredProducts(filterproducts);
  }, [products]);

  return (
    <IndexLayout>
      <div
        className="px-5"
        style={{ paddingTop: "180px", background: "#800080eb" }}
      >
        <h1 style={{ color: "greenyellow" }}>
          <span className="text-white">Hoodies</span> / Kid's Collections
        </h1>
        {/* <Notify /> */}
        <div className={` col-md-12 ${Styles.productContainer}`}>
          {filteredproducts.length > 0 ? (
            filteredproducts.map((product, index) => {
              return (
                <div
                  key={index}
                  style={{
                    border: "2px solid #FFFFFF",
                    //   minHeight: "400px",
                  }}
                  className={` col-md-4 ${Styles.product} pb-2`}
                >
                  (
                  <div className="d-flex flex-column align-content-start ">
                    <img
                      src={product.images[0].url}
                      alt="brownhoodie"
                      key={index}
                      style={{ height: "240px" }}
                    />

                    <div className="px-4 pt-2 text-start text-white">
                      <Link href={`/collections/${product._id}`}>
                        <a
                          className="mb-0 link-product link-title"
                          style={{ whiteSpace: "break-spaces" }}
                        >
                          {product.title}
                        </a>
                      </Link>
                      <p>
                        <Link href={`/collections/${product._id}`}>
                          <a className="link-product">
                            {numberFormat(product.price)}
                          </a>
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
                        <Link href={`/collections/${product._id}`}>
                          <a className="link-product">Details</a>
                        </Link>
                        <button
                          style={{
                            padding: "10px",
                            background:
                              "radial-gradient(#ffffffb5, transparent)",
                            color: "lemonchiffon",
                            border: "1px solid",
                          }}
                          onClick={() => handleSubmit(product, cart)}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                  )
                </div>
              );
            })
          ) : (
            <div
              className="text-white d-flex align-items-center flex-column"
              style={{ height: "400px", textAlign: "center", width: "60%" }}
            >
              <p>No Products available in this category</p>
              <Link href="/collections">
                <a>Go to Collections</a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </IndexLayout>
  );
};

export async function getServerSideProps(context) {
  const res = await getData("product");
  //   const data = await res.json();
  console.log(res);
  // res = JSON.stringify(res.winners)

  return {
    props: {
      products: JSON.parse(JSON.stringify(res.products)),
      result: res.result,
    }, // will be passed to the page component as props
  };
}

export default index;
