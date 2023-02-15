import React, { useContext, useState } from "react";
import Head from "next/head";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingSharpIcon from "@mui/icons-material/LocalShippingSharp";
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
  ListItemText,
  ListItem,
  List,
  IconButton,
  Drawer,
  Typography,
  Switch,
} from "@material-ui/core";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

import PersonPinIcon from "@mui/icons-material/PersonPin";
import LogoutIcon from "@mui/icons-material/Logout";

import { FaPaw } from "react-icons/fa";
import NextLink from "next/link";
import styles from "../utils/style.module.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { red } from "@material-ui/core/colors";
import { Store } from "../utils/Store";
import useStyles from "../utils/styles";
import Footer from "../pages/footer1";

import { CgMenu } from "react-icons/cg";
export default function Layout({ title, description, children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };
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
        main: "#24a0ed",
      },
      secondary: {
        main: "#208080",
      },
      tertiary: {
        main: red,
      },
      pending: {
        main: "#90EE90",
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
  const [sidebarVisible, setSidebarVisible] = useState(false);
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

        <AppBar position="static" className={styles.navbar1}>
          <Toolbar>
            <IconButton
              edge="start"
              aria-label="open drawer"
              onClick={sidebarOpenHandler}
              className={styles.menu}
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
                    <ListItemText onClick={servicesRouter}>
                      Services
                    </ListItemText>
                  </Button>
                </ListItem>
              </List>
            </Drawer>
            <NextLink href="/" passHref>
              <Link>
                <i className={styles.logo1}>
                  <FaPaw />
                  Bark Park Pet Salon
                </i>
              </Link>
            </NextLink>

            <div className={classes.grow}></div>
            <div>
              {" "}
              <nav className={styles.navbar}>
                <a href="../">Home</a>
                <a href="../product">Products</a>
                <a href="../search?category=">Categories</a>
                <a href="../services">Services</a>
              </nav>
            </div>

            <div className={classes.grow}></div>

            <div>
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
              <NextLink href="/cart" passHref>
                <Link>
                  <Typography
                    component="span"
                    style={{
                      color: "black",
                      fontWeight: "bolder",
                      marginRight: "10px",
                    }}
                  >
                    {cart.cartItems.length > 0 ? (
                      <Badge
                        color="primary"
                        badgeContent={cart.cartItems.length}
                      >
                        Cart
                      </Badge>
                    ) : (
                      "Cart"
                    )}
                  </Typography>
                </Link>
              </NextLink>

              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    style={{
                      color: "black",
                      fontWeight: "bolder",
                      marginRight: "10px",
                    }}
                  >
                    {userInfo.name}
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
                      <PersonPinIcon />
                      Profile
                    </MenuItem>
                    {!userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, "/order-history")
                        }
                      >
                        <WorkHistoryIcon />
                        Order History
                      </MenuItem>
                    )}
                    {userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, "/admin/orders")
                        }
                      >
                        <LocalShippingSharpIcon />
                        Orders
                      </MenuItem>
                    )}
                    {userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, "/admin/products")
                        }
                      >
                        <Inventory2Icon />
                        Products
                      </MenuItem>
                    )}
                    {userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, "/admin/users")
                        }
                      >
                        <PeopleAltIcon />
                        Users
                      </MenuItem>
                    )}
                    {userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, "/admin/refund")
                        }
                      >
                        <AssignmentReturnIcon />
                        Refund Requests
                      </MenuItem>
                    )}
                    {!userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, "/refund-history")
                        }
                      >
                        <AssignmentReturnIcon />
                        Refund History
                      </MenuItem>
                    )}

                    {userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, "/admin/dashboard")
                        }
                      >
                        <AdminPanelSettingsIcon /> Admin Dashboard
                      </MenuItem>
                    )}
                    <MenuItem onClick={logoutMenuCloseHandler}>
                      <LogoutIcon />
                      <NextLink href="/login" passHref>
                        <Link
                          style={{
                            color: "black",

                            marginRight: "10px",
                          }}
                        >
                          Logout
                        </Link>
                      </NextLink>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link
                    style={{
                      color: "black",
                      fontWeight: "bolder",
                      marginRight: "10px",
                    }}
                  >
                    Login
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
