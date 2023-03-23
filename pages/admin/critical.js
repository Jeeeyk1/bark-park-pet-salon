import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useEffect, useContext, useReducer, useState } from "react";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingSharpIcon from "@mui/icons-material/LocalShippingSharp";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import WarningIcon from "@mui/icons-material/Warning";
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  ListItemText,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { getError } from "../../utils/error";
import { Store } from "../../utils/Store";
import Layout from "../../components/Layout";
import useStyles from "../../utils/styles";

import { Pagination } from "@material-ui/lab";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreate: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      state;
  }
}

function AdminProducts() {
  const { state } = useContext(Store);
  const router = useRouter();
  const classes = useStyles();
  const { userInfo } = state;

  const [
    { loading, error, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    products: [],
    error: "",
  });

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/products`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
        setProductz(data);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const [productz, setProductz] = useState([]);
  const [currentPage] = useState(1);
  const [postPerPage] = useState(9);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentProducts = productz.slice(indexOfFirstPost, indexOfLastPost);
  const paginateOnchange = () => {
    // setCurrentPage(value);
    console.log(indexOfFirstPost, indexOfLastPost);
    console.log(currentProducts);
  };
  return (
    <Layout title="Products">
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <br />
          <br />

          {userInfo ? (
            <Typography variant="h1">
              <AdminPanelSettingsIcon />
              <span style={{ fontWeight: "bold" }}>Admin:</span> {userInfo.name}
            </Typography>
          ) : (
            <Typography>Logging out.....</Typography>
          )}
          <br />

          <Card className={classes.section2}>
            <List>
              <br />
              <NextLink href="/admin/dashboard" passHref>
                <ListItem button component="a">
                  <DashboardCustomizeIcon />
                  <ListItemText primary="Admin Dashboard"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/orders" passHref>
                <ListItem button component="a">
                  <LocalShippingSharpIcon />
                  <ListItemText primary="Orders"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/products" passHref>
                <ListItem button component="a">
                  <Inventory2Icon />
                  <ListItemText primary="Products"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/users" passHref>
                <ListItem button component="a">
                  <PeopleAltIcon />
                  <ListItemText primary="Users"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/refund" passHref>
                <ListItem button component="a">
                  <AssignmentReturnIcon />
                  <ListItemText primary="Refund requests"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/critical" passHref>
                <ListItem selected button component="a">
                  <WarningIcon />
                  <ListItemText primary="Critical Stocks"></ListItemText>
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    <Typography component="h1" variant="h1">
                      Products
                    </Typography>
                    {loadingDelete && <CircularProgress />}
                  </Grid>
                  <Grid align="right" item xs={6}>
                    {loadingCreate && <CircularProgress />}
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                {loading ? (
                  <CircularProgress />
                ) : error ? (
                  <Typography className={classes.error}>{error}</Typography>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <strong>ID</strong>
                          </TableCell>
                          <TableCell>
                            <strong>NAME</strong>
                          </TableCell>
                          <TableCell>
                            <strong>PRICE</strong>
                          </TableCell>
                          <TableCell>
                            <strong>CATEGORY</strong>
                          </TableCell>
                          <TableCell style={{ color: "red" }}>
                            <strong>STOCKS</strong>
                          </TableCell>
                          <TableCell>
                            <strong>RATING</strong>
                          </TableCell>

                          <TableCell>
                            {" "}
                            <strong>ACTION</strong>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {currentProducts.map(
                          (product) =>
                            product.countInStock <= 10 && (
                              <TableRow key={product._id}>
                                <TableCell>
                                  {product._id.substring(20, 24)}
                                </TableCell>
                                {product.countInStock <= 10 && (
                                  <>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell
                                      style={{
                                        color: "red",
                                        fontWeight: "bolder",
                                      }}
                                    >
                                      {product.countInStock}
                                    </TableCell>
                                    <TableCell>{product.rating}</TableCell>
                                    <TableCell>
                                      <NextLink
                                        href={`/admin/product/${product._id}`}
                                        passHref
                                      >
                                        <Button
                                          style={{
                                            fontWeight: "bolder",
                                            backgroundColor: "#24a0ed",
                                            color: "#ffff",
                                          }}
                                          size="medium"
                                          variant="contained"
                                          color="red"
                                        >
                                          Add Stocks
                                        </Button>
                                      </NextLink>{" "}
                                    </TableCell>
                                  </>
                                )}
                              </TableRow>
                            )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </ListItem>
              <Pagination
                color="primary"
                count={0}
                onChange={paginateOnchange}
              ></Pagination>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(AdminProducts), { ssr: false });
