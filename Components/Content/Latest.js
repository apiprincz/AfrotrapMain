import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Styles from "../../styles/Latest.module.css";
// import Fade from "react-reveal/Fade";

library.add(far, fas);

const Latest = () => {
  const images = [
    {
      large: "pick1.png",
      featured: "pick2.png",
      description: "B Hoodie",
      slug: "new",
      discountPrice: 100,
      price: 150,
    },
    {
      large: "pick2.png",
      featured: "pick3.png",
      description: "C Hoodie",
      slug: "new",
      discountPrice: 100,
      price: 150,
    },
    {
      large: "pick4.png",
      featured: "pick3.png",
      description: "Trap Hoodie",
      slug: "new",
      discountPrice: 100,
      price: 150,
    },
    {
      large: "pick4.png",
      featured: "pick1.png",
      description: "Tract Hoodie",
      slug: "new",
      discountPrice: 100,
      price: 150,
    },
  ];

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "USD",
    }).format(value);

  const handleFav = (e) => {
    e.target.classList.toggle("black");
  };
  return (
    <div className={`mx-auto col-md-11 ${Styles.Container} `}>
      <div
        className=" d-flex justify-content-around p-2 col-md-12"
        style={{ background: "#20181842", borderRadius: "20px" }}
      >
        <span href="/shop">Latest Arrivals</span>
      </div>
      <div
        className={`d-flex col-md-12 col-12 flex-wrap ${Styles.LatestContainer} `}
      >
        {images.map((image, index) => {
          return (
            <div key={index} className="col-md-6 col-12 col-lg-3 col-12">
              <div style={{ position: "relative" }}>
                <motion.div
                  className={Styles.fade}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <motion.div
                    whileHover={{ opacity: 0 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <img
                      src={`/pick/${image.large}`}
                      alt="brownhoodie"
                      key={index}
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ opacity: 0 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <img
                      src={`/pick/${image.featured}`}
                      alt="brownhoodie"
                      key={index}
                    />
                  </motion.div>
                </motion.div>

                <p>{image.description}</p>

                <p>{numberFormat(image.price)}</p>
                <p
                  style={{
                    fontSize: "20px",
                    position: "absolute",
                    top: "20px",
                    right: "30px",
                    background: "red",
                    textTransform: "capitalize",
                    padding: "5px",
                    borderRadius: "50%",
                    color: "#FFF",
                  }}
                >
                  {image.slug}
                </p>
                <div style={{ zIndex: 200 }}>
                  <FontAwesomeIcon
                    icon={["far", "heart"]}
                    style={{
                      width: "16px",
                      marginLeft: "0px",
                      marginRight: "10px",
                      position: "absolute",
                      top: "25px",
                      left: "25px",
                      // zIndex: -1,
                      color: "black",
                      zIndex: 100,
                      pointerEvents: "all",
                      background: "white",
                    }}
                    onClick={(e) => handleFav(e)}
                  />
                  <FontAwesomeIcon
                    icon={["fas", "heart"]}
                    style={{
                      width: "16px",
                      marginLeft: "0px",
                      marginRight: "10px",
                      position: "absolute",
                      top: "25px",

                      left: "25px",
                      zIndex: 10,
                      pointerEvents: "all",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Latest;
