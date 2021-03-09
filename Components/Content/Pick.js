import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "../../styles/Latest.module.css";
import Fade from "react-reveal/Fade";

const Pick = () => {
  const images = [
    {
      large: "pick1.png",
      featured: "hoodiestyleredhmm.png",
      description: "Afrotrap red &amp; black ",
      slug: "define your true style",
      discountPrice: 100,
      price: 150,
    },
    {
      large: "pick2.png",
      featured: "hoodiestyleyellow.png",
      description: "Afrotrap yellow &amp; ",
      slug: "define your true color",
      discountPrice: 100,
      price: 150,
    },
    {
      large: "pick3.png",
      featured: "hoodiestyleredhmm.png",
      description: "Afrotrap red &amp",
      slug: "define your true style",
      discountPrice: 100,
      price: 150,
    },
    {
      large: "pick4.png",
      featured: "hoodiestyleyellow.png",
      description: "Afrotrap yellow &amp; ",
      slug: "define your true color",
      discountPrice: 100,
      price: 150,
    },
    {
      large: "pick5.png",
      featured: "hoodiestyleredhmm.png",
      description: "Afrotrap red &amp; ",
      slug: "define your true style",
      discountPrice: 100,
      price: 150,
    },
  ];

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "USD",
    }).format(value);

  return (
    <div className="mx-auto col-md-11 pt-5 px-5">
      <div
        className="text-white d-flex justify-content-between p-2 col-md-12"
        style={{ background: "#32629B", borderRadius: "20px" }}
      >
        <Fade left>
          <span href="/shop">Pick Of The Week</span>
        </Fade>

        <Link href="/shop">
          <a href="/shop" className="link_white">
            View All
            <FontAwesomeIcon icon={["fas", "caret-right"]} />
          </a>
        </Link>
      </div>
      <div className="d-flex col-md-12 col-12 pt-5 px-5 flex-wrap">
        {images.map((image, index) => {
          return (
            <div key={index} className="col-md-3 col-sm-6 col-12">
              <div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Image
                    src={`/pick/${image.large}`}
                    alt="brownhoodie"
                    width="250"
                    height="200"
                    key={index}
                  />
                </motion.div>

                <p>{image.description}</p>
                <p className="mb-0">{numberFormat(image.discountPrice)}</p>
                <p>
                  <s>{numberFormat(image.price)}</s>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pick;
