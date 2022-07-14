import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useEffect, useContext, useReducer } from "react";
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

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function AdminOrders() {
  const { state } = useContext(Store);
  const router = useRouter();
  const classes = useStyles();
  const { userInfo } = state;

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/orders`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);
  return (
    <Layout title="Orders">
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card className={classes.section}>
            <List>
              <NextLink href="/admin/dashboard" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Admin Dashboard"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/orders" passHref>
                <ListItem selected button component="a">
                  <ListItemText primary="Orders"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/products" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Products"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/users" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Users"></ListItemText>
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  Orders
                </Typography>
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
                          <TableCell
                            style={{
                              fontWeight: "bold",
                              fontSize: "1rem",
                            }}
                          >
                            ID
                          </TableCell>
                          <TableCell
                            style={{
                              fontWeight: "bold",
                              fontSize: "1rem",
                            }}
                          >
                            USER
                          </TableCell>
                          <TableCell
                            style={{
                              fontWeight: "bold",
                              fontSize: "1rem",
                            }}
                          >
                            DATE
                          </TableCell>
                          <TableCell
                            style={{
                              fontWeight: "bold",
                              fontSize: "1rem",
                            }}
                          >
                            TOTAL
                          </TableCell>
                          <TableCell
                            style={{
                              fontWeight: "bold",
                              fontSize: "1rem",
                            }}
                          >
                            PAID
                          </TableCell>
                          <TableCell
                            style={{
                              fontWeight: "bold",
                              fontSize: "1rem",
                            }}
                          >
                            DELIVERED
                          </TableCell>
                          <TableCell
                            style={{
                              fontWeight: "bold",
                              fontSize: "1rem",
                            }}
                          >
                            ACTION
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order._id}>
                            <TableCell
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              {order._id.substring(20, 24)}
                            </TableCell>
                            <TableCell
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              {order.user ? order.user.name : "DELETED USER"}
                            </TableCell>
                            <TableCell
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              {order.createdAt}
                            </TableCell>
                            <TableCell
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              {order.totalPrice}
                            </TableCell>
                            <TableCell
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              {order.isPaid
                                ? `paid at ${order.paidAt}`
                                : "not paid"}
                            </TableCell>
                            <TableCell
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              {order.isDelivered
                                ? `delivered at ${order.deliveredAt}`
                                : "not delivered"}
                            </TableCell>
                            <TableCell
                              style={{
                                fontWeight: "bold",
                              }}
                            >
                              <NextLink href={`/order/${order._id}`} passHref>
                                <Button
                                  style={{
                                    fontWeight: "bold",
                                  }}
                                  variant="contained"
                                >
                                  Details
                                </Button>
                              </NextLink>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(AdminOrders), { ssr: false });
