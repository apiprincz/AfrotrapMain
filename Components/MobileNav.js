import React from "react";
import Link from "next/link";
import Image from "next/image";
import Styles from "../styles/Mobile.module.css";

import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas, faCartPlus } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

library.add(fab, faCartPlus);
library.add(fas);

const MobileNav = () => {
  const router = useRouter();

  const isActive = (r) => {
    if (r === router.pathname) {
      return "active";
    }
    ("");
  };

  const menuHandler = () => {
    const menu = document.querySelector(`.${Styles.navMenu}`);

    menu.classList.toggle(`${Styles.navMenu_show}`);
  };

  return (
    <div>
      <nav
        class={`navbar navbar-expand-lg d-flex justify-content-between align-items-center px-4 ${Styles.navContainer}`}
      >
        <div className={Styles.hamburger} onClick={menuHandler}></div>

        <Link href="/">
          <a class="navbar-brand" href="#" style={{ width: "80px" }}>
            <img src="/Logo/whitelg.png" alt="logo" style={{ width: "100%" }} />
          </a>
        </Link>

        <div class={Styles.navMenu}>
          <ul
            class="navbar-nav d-flex flex-direction-column align-items-left"
            style={{ width: "50%" }}
          >
            <li className={`nav-item ${isActive("/")}`}>
              <Link href="/">
                <a href="/">
                  <FontAwesomeIcon
                    icon={["fas", "home"]}
                    className="text-white"
                  />
                </a>
              </Link>
            </li>
            <li className={`nav-item ${isActive("/men")}`}>
              <Link href="/men">
                <a href="/men">Men</a>
              </Link>
            </li>
            <li className={`nav-item ${isActive("/women")}`}>
              <Link href="/women">
                <a href="/women">Women</a>
              </Link>
            </li>
            <li className={`nav-item ${isActive("/kids")}`}>
              <Link href="/kids">
                <a href="/kids">Kids</a>
              </Link>
            </li>
            <li className={`nav-item ${isActive("/about")}`}>
              <Link href="/about">
                <a href="/">About Us</a>
              </Link>
            </li>

            <li className={`nav-item ${isActive("/signin")}`}>
              <Link href="/signin">
                <a href="/">
                  Login
                  <FontAwesomeIcon icon={["fas", "sign-in-alt"]} />
                </a>
              </Link>
            </li>
          </ul>
        </div>

        <div
          className={`fs-2 text-white position-relative nav-item ${isActive(
            "/cart"
          )}`}
        >
          <Link href="/cart">
            <a href="#">
              Cart
              <FontAwesomeIcon icon={["fas", "cart-arrow-down"]} />
              <div className=" cart_count">1</div>
            </a>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default MobileNav;
