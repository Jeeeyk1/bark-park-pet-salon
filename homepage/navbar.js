import React, { useContext, useState } from "react";
import styles from "../utils/style.module.css";

import { FaPaw } from "react-icons/fa";
import Head from "next/head";
import {
  Badge,
  Button,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Store } from "../utils/Store";
import useStyles from "../utils/styles";
import { HiShoppingCart } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import NextLink from "next/link";
import { CgMenu } from "react-icons/cg";

export default function Navbar({ title, description }) {
  const classes = useStyles();
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
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
  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };
  const homeRouter = () => {
    router.push("/");
    setSidebarVisible(false);
  };
  const productsRouter = () => {
    router.push("product");
    setSidebarVisible(false);
  };
  const categoriesRouter = () => {
    router.push("search?category");
    setSidebarVisible(false);
  };
  const servicesRouter = () => {
    router.push("services");
    setSidebarVisible(false);
  };
  return (
    <header className={styles.active}>
      <Head>
        <title>
          {title
            ? `${title}- Bark Park Pet Salon Baguio`
            : "Bark Park Pet Salon Baguio"}
        </title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <a href="./" className={styles.logo}>
        <FaPaw />
        <i className="fas fa-paw">Bark Park Pet Salon </i>
      </a>

      <nav className={styles.navbar}>
        <a href="">Home</a>
        <a href="product">Products</a>
        <a href="search?category=">Categories</a>
        <a href="services">Services</a>
      </nav>
      <div>
        <IconButton
          edge="start"
          aria-label="open drawer"
          onClick={sidebarOpenHandler}
        >
          <CgMenu className={styles.menu} />
        </IconButton>
        <Drawer
          anchor="right"
          open={sidebarVisible}
          onClose={sidebarCloseHandler}
        >
          <List>
            <ListItem>
              <Button onClick={homeRouter}>
                <ListItemText>Home</ListItemText>
              </Button>
            </ListItem>
            <ListItem>
              <Button onClick={productsRouter}>
                <ListItemText>Products</ListItemText>
              </Button>
            </ListItem>
            <ListItem>
              <Button>
                <ListItemText onClick={categoriesRouter}>
                  Categories
                </ListItemText>
              </Button>
            </ListItem>
            <ListItem>
              <Button>
                <ListItemText onClick={servicesRouter}>Services</ListItemText>
              </Button>
            </ListItem>
          </List>
        </Drawer>
        <NextLink href="/cart" passHref>
          <Link style={{ fontSize: "25px" }}>
            {cart.cartItems.length > 0 && userInfo ? (
              <Badge color="secondary" badgeContent={cart.cartItems.length}>
                <HiShoppingCart className={styles.icons1} />
              </Badge>
            ) : (
              <HiShoppingCart className={styles.icons0} />
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
              <CgProfile className={styles.icons2} />
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
              <CgProfile className={styles.icons0} />
            </Link>
          </NextLink>
        )}
      </div>
    </header>
  );
}
