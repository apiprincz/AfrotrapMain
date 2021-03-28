import React, { useContext, useState, useRef, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import ProductLayout from "../Layouts/productLayout";
import { increase, decrease } from "../store/Actions";
import Link from "next/link";
import Styles from "../styles/Cart.module.css";

const cart = () => {
  const [state, dispatch] = useContext(DataContext);
  const { cart } = state;
  const [total, setTotal] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const btnRef = useRef();

  useEffect(() => {
    if (cart.length > 0) {
      const getTotal = () => {
        const res = cart.reduce((prev, item) => {
          return prev + item.price * item.quantity;
        }, 0);
        setTotal(res);
      };
      getTotal();
    }
  }, [cart]);
  useEffect(() => {
    if (cart.length > 0) {
      const getTotalQty = () => {
        const res = cart.reduce((prev, item) => {
          return prev + item.quantity;
        }, 0);
        setTotalQty(res);
      };
      getTotalQty();
    }
  }, [cart]);
  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "USD",
    }).format(value);

  return (
    <ProductLayout>
      <div className={` ${Styles.cartWrapper}`}>
        {cart.length > 0 ? (
          <Link href="/collections">
            <a
              className="mb-10"
              style={{
                background: "orange",
                color: "white",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              Back to Colections
            </a>
          </Link>
        ) : (
          ""
        )}
        <div
          className={` d-flex justify-content-between ${Styles.cartLayout}`}
          style={{ background: "white" }}
        >
          {cart.length > 0 ? (
            <div className="col-12 col-lg-9">
              <div className="d-flex justify-content-between">
                <h1>Shopping Cart</h1>
                {/* <p>Price</p> */}
              </div>
              <hr style={{ width: "100%" }}></hr>
              <ul>
                {cart.map((item, index) => {
                  return (
                    <>
                      {" "}
                      <li
                        className="d-flex justify-content-between align-items-center"
                        style={{ listStyleType: "none", padding: "10px 0px" }}
                        key={index}
                      >
                        <span
                          className="text-center"
                          style={{ fontSize: "50px" }}
                        >
                          x
                        </span>
                        <div
                          className="col-md-3 col-2"
                          style={{ width: "110px" }}
                        >
                          <img
                            style={{ width: "100%" }}
                            src={item.images[0].url}
                          ></img>
                        </div>
                        <div className={`${Styles.cartFlex}`}>
                          <div className="d-flex flex-column justify-content-between">
                            <h3>
                              <Link href={`/product/${item._id}`}>
                                <a className="product_title">{item.title} </a>
                              </Link>
                            </h3>
                            <div className={` ${Styles.cartCategory}`}>
                              <span>color:&nbsp;{item.colors[0]}</span>
                              <span>size:&nbsp;{item.category[0].size[0]}</span>
                            </div>
                          </div>
                          <div
                            className="d-flex align-items-center"
                            ref={btnRef}
                          >
                            <button
                              id="btn_dec"
                              style={{
                                fontSize: "23px",
                                padding: "0px 10px",
                                border: "none",
                              }}
                              onClick={() => dispatch(decrease(cart, item._id))}
                              disabled={item.quantity === 1 ? "true" : ""}
                            >
                              -
                            </button>
                            <span
                              style={{ width: "40px", textAlign: "center" }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              id="btn_inc"
                              style={{
                                fontSize: "23px",
                                padding: "0px 10px",
                                border: "none",
                              }}
                              onClick={() => dispatch(increase(cart, item._id))}
                              // disabled= {item.quantity===1 ? "true" : ""}
                            >
                              +
                            </button>
                          </div>
                          <p
                            style={{
                              fontSize: "30px",
                              fontWeight: "500",
                              textAlign: "right",
                            }}
                          >
                            {numberFormat(item.price)}
                          </p>
                        </div>
                      </li>
                      <hr style={{ width: "100%" }}></hr>
                    </>
                  );
                })}
              </ul>
              <p style={{}} className={Styles.cartTotal}>
                Sub Total ({totalQty} Items) : ${total}
              </p>
              <div className="col-md-12 " style={{ textAlign: "right" }}>
                {cart.length > 0 ? <button>Proceed To Checkout</button> : ""}
              </div>
            </div>
          ) : (
            <div className="col-md-10 " style={{ background: "white" }}>
              <span style={{ padding: "10px" }}>Cart Empty</span>
              <div>
                <Link href="/collections">
                  <a
                    style={{
                      background: "orange",
                      color: "white",
                      padding: "10px",
                      display: "block",
                      width: "200px",
                    }}
                  >
                    Go to Collections
                  </a>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      ;
    </ProductLayout>
  );
};

export default cart;
