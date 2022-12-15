import React, { useContext, useState } from "react";
import styles from "../utils/style.module.css";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import { FaPaw } from "react-icons/fa";
import Head from "next/head";
import {
  AppBar,
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
  Toolbar,
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
    <div>
      <Head>
        <title>
          {title
            ? `${title}- Bark Park Pet Salon Baguio`
            : "Bark Park Pet Salon Baguio"}
        </title>
        {description && <meta name="description" content={description}></meta>}
      </Head>

      <AppBar position="static" className={styles.navbar2}>
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
            {" "}
            <nav className={styles.navbar}>
              <a href="\">Home</a>
              <a href="product">Products</a>
              <a href="search?category=">Categories</a>
              <a href="services">Services</a>
            </nav>
          </div>

          <div className={classes.grow}></div>
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
                    <ListItemText onClick={servicesRouter}>
                      Services
                    </ListItemText>
                  </Button>
                </ListItem>
              </List>
            </Drawer>
          </div>

          <div>
            <NextLink href="/cart" passHref>
              <Link>
                {cart.cartItems.length > 0 && userInfo ? (
                  <Badge color="secondary" badgeContent={cart.cartItems.length}>
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
                    onClick={(e) => loginMenuCloseHandler(e, "/order-history")}
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
    </div>
  );
}
