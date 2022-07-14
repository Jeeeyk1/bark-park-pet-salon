import React, { useContext, useState } from "react";
import Head from "next/head";
import {
  AppBar,
  Toolbar,
  Container,
  Link,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Badge,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { FaPaw } from "react-icons/fa";
import NextLink from "next/link";
import styles from "../utils/style.module.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { red } from "@material-ui/core/colors";
import { Store } from "../utils/Store";
import useStyles from "../utils/styles";
import Footer from "../pages/footer";
import { HiShoppingCart } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
export default function Layout({ title, description, children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 100,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 200,
        margin: "1rem 0",
      },
    },
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: "#4fa8bd",
      },
      secondary: {
        main: "#208080",
      },
      tertiary: {
        main: red,
      },
    },
  });
  const classes = useStyles();

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
  return (
    <div>
      <Head>
        <title>
          {title
            ? `${title}- Bark Park Pet Salon Baguio`
            : "Bark Park Pet Salon Baguio"}
        </title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <i className={styles.logo1}>
                  <FaPaw />
                  Bark Park Pet Salon
                </i>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div className={styles.icons}>
              <NextLink href="/cart" passHref>
                <Link style={{ fontSize: "25px" }}>
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                      <HiShoppingCart
                        style={{
                          fontSize: "2rem",
                          marginBottom: "12px",
                          marginRight: "5px",
                        }}
                      />
                    </Badge>
                  ) : (
                    <HiShoppingCart
                      style={{
                        fontSize: "2rem",
                        marginTop: "10px",
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
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, "/profile")}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, "/order-history")
                      }
                    >
                      Order History
                    </MenuItem>
                    {userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, "/admin/dashboard")
                        }
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
                    <CgProfile style={{ fontSize: "2rem" }} />
                  </Link>
                </NextLink>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
      </ThemeProvider>
      <Footer />
    </div>
  );
}
