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
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import { FaPaw } from "react-icons/fa";
import NextLink from "next/link";
import styles from "../utils/style.module.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { red } from "@material-ui/core/colors";
import { Store } from "../utils/Store";
import useStyles from "../utils/styles";
import Footer from "../pages/footer1";
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
        main: "#24a0ed",
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

        <AppBar position="static" className={styles.navbar1}>
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
            <div>
              <NextLink href="/cart" passHref>
                <Link>
                  {cart.cartItems.length > 0 && userInfo ? (
                    <Badge
                      color="secondary"
                      badgeContent={cart.cartItems.length}
                    >
                      <HiShoppingCart className={styles.icon} />
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
                  >
                    <CgProfile className={styles.icon} />
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
                    <MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, "/order-history")
                      }
                    >
                      <WorkHistoryIcon />
                      Order History
                    </MenuItem>
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
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link>
                    <CgProfile className={styles.icons0} />
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
