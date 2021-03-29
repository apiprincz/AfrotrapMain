import { useState, useEffect, useRef, useContext } from "react";
import Head from "next/head";
import ProductLayout from "../../Layouts/index";
import Link from "next/link";
import { getData } from "../../util/fetchData";
import Styles from "../../styles/Product.module.css";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";
import { resetNotif } from "../../store/Actions";
import { notify } from "../../store/Actions";

const DetailProduct = ({ product }) => {
  const [tab, setTab] = useState(0);
  const [option, setOption] = useState(null);
  const [price, setPrice] = useState(null);

  const [state, dispatch] = useContext(DataContext);
  const { cart } = state;

  const [size, setSize] = useState();

  const imgRef = useRef();
  const myRef = useRef();
  useEffect(() => {
    const images = imgRef.current.children;
    console.log(images);

    // return images;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace(
        "active",
        "img-thumbnail"
      );
    }
    images[tab].className = `${Styles.active} img-thumbnail`;
  }, [tab]);

  const handleSelect = (e) => {
    setOption(e.target.value);
  };
  const handleSubmit = (product, cart) => {
    dispatch(addToCart(product, cart));
    dispatch(notify(product, cart));
    setTimeout(function () {
      dispatch(resetNotif(notify));
    }, 3000);
  };

  useEffect(() => {
    const options = myRef.current.children;
    console.log(options);
    for (let i = 0; i < options.length; i++) {
      if (options[i].innerText)
        switch (option) {
          case "S":
            setPrice(product.price);
            break;
          case "M":
            setPrice(product.price + 1.55);
            break;
          case "X":
            setPrice(product.price + 3.25);
            break;
          case "XL":
            setPrice(product.price + 4.08);
            break;

          default:
            setPrice(product.price);
            break;
        }
    }
  }, [option]);

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "USD",
    }).format(value);

  return (
    <ProductLayout>
      <Head>
        <title>Product Details</title>
      </Head>
      <div style={{ paddingTop: "100px", background: "rgba(0, 0, 0, 0.05)" }}>
        <div
          className={` d-flex justify-content-between ${Styles.productWrapper}`}
        >
          <div
            className={`d-flex  align-items-start ${Styles.productDetail}`}
            ref={imgRef}
          >
            {product.images.map((item, index) => {
              return (
                <img
                  key={index}
                  className="img-thumbnail"
                  src={item.public_id}
                  alt={index}
                  onClick={() => setTab(index)}
                  className={Styles.productSmall}
                ></img>
              );
            })}
          </div>
          <img
            src={product.images[tab].url}
            alt={product.images[tab].url}
            className={Styles.productLarge}
            style={{ border: "2px solid orange" }}
          ></img>
          <div className={`px-3 ${Styles.story}`}>
            <h1 className="fs-3">{product.title}</h1>
            <span>
              <Link href={`/${product.category[0].sex}`}>
                <a
                  href={`/${product.category[0].sex}`}
                  style={{ color: `${product.colors[0]}` }}
                >
                  {" "}
                  in {product.category[0].sex + "'s"} hoodies Collection
                </a>
              </Link>
            </span>
            <hr></hr>
            <span>Size:</span>
            <select
              className="px-2 mx-2"
              ref={myRef}
              onChange={(e) => handleSelect(e)}
            >
              {product.category[0].size.map((size, index) => {
                return <option key={index}>{size}</option>;
              })}
            </select>

            <ul className="py-4 ">
              {product.details.map((detail, index) => {
                return (
                  <li
                    style={{
                      listStyleType: "disc",
                      listStylePosition: "inside",
                    }}
                    key={index}
                  >
                    {detail}
                  </li>
                );
              })}
            </ul>
          </div>
          <div
            className="p-5 col-md-12 col-lg-3"
            style={{ background: "#FFFFFF", borderRadius: "10px" }}
          >
            <div style={{ width: "100%" }}>
              <p
                className="fs-2"
                style={{ color: "orange", lineHeight: "14px" }}
              >
                {numberFormat(price)}
              </p>

              <span className="">+free shipping within US only</span>
              <p className="">Arrival within 2 working days</p>
            </div>
            <button
              style={{
                width: "100%",
                color: "red",
                background: "yellow",
                borderRadius: "10px",
                padding: "10px 0px",
                border: "none",
              }}
              className="my-4"
              onClick={() => handleSubmit(product, cart)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      ;
    </ProductLayout>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`product/${id}`);
  // const data = await res.json();
  //   console.log(res);
  // res = JSON.stringify(res.winners);
  return {
    props: {
      product: res.product,
      // result: res.result,
    }, // will be passed to the page component as props
  };
}

export default DetailProduct;
