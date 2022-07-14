import React, { useContext, useEffect, useState } from "react";
import styles from "../utils/style.module.css";

import { FaPaw } from "react-icons/fa";
import Head from "next/head";
import { Badge, Button, Link, Menu, MenuItem } from "@material-ui/core";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Store } from "../utils/Store";
import useStyles from "../utils/styles";
import { HiShoppingCart } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import NextLink from "next/link";

export default function Navbar({ title, description }) {
  const classes = useStyles();
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  const logoutMenuCloseHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
    router.push("/");
  };

  const [navbar, setNavbar] = useState(false);

  const showNavbar = () => {
    if (window.scrollY > 0) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", showNavbar);
  }, [setNavbar]);

  return (
    <header className={navbar ? styles.active : styles.header}>
      <Head>
        <title>
          {title
            ? `${title}- Bark Park Pet Salon Baguio`
            : "Bark Park Pet Salon Baguio"}
        </title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <a href="" className={styles.logo}>
        <FaPaw />
        <i className="fas fa-paw">Bark Park Pet Salon Baguio</i>
      </a>

      <nav className={styles.navbar}>
        <a href="">Home</a>
        <a href="/product">Products</a>
        <a href="search?category=">Categories</a>
        <a href="">Services</a>
      </nav>
      <div className={styles.icons}>
        <NextLink href="/cart" passHref>
          <Link style={{ fontSize: "25px" }}>
            {cart.cartItems.length > 0 ? (
              <Badge color="secondary" badgeContent={cart.cartItems.length}>
                <HiShoppingCart
                  style={{
                    fontSize: "2rem",
                    marginRight: "15px",
                    color: "#fff",
                  }}
                />
              </Badge>
            ) : (
              <HiShoppingCart
                style={{
                  fontSize: "2rem",
                  marginRight: "20px",
                  color: "#fff",
                }}
              />
            )}
          </Link>
        </NextLink>
        {userInfo ? (
          <>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={loginClickHandler}
              className={classes.navbarButton}
              style={{ fontSize: "1.5rem", marginBottom: "10px" }}
            >
              <CgProfile style={{ fontSize: "2rem" }} />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={loginMenuCloseHandler}
            >
              <MenuItem onClick={(e) => loginMenuCloseHandler(e, "/profile")}>
                Profile
              </MenuItem>
              <MenuItem
                onClick={(e) => loginMenuCloseHandler(e, "/order-history")}
              >
                Order History
              </MenuItem>
              {userInfo.isAdmin && (
                <MenuItem
                  onClick={(e) => loginMenuCloseHandler(e, "/admin/dashboard")}
                >
                  Admin Dashboard
                </MenuItem>
              )}
              <MenuItem onClick={logoutMenuCloseHandler}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <NextLink href="/login" passHref>
            <Link style={{ fontSize: "25px" }}>
              <CgProfile style={{ fontSize: "2rem", color: "black" }} />
            </Link>
          </NextLink>
        )}
      </div>
    </header>
  );
}
