import axios from "axios";

import { useRouter } from "next/router";
import NexLink from "next/link";
import React, { useEffect, useContext, useReducer } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  TableContainer,
  Typography,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  ListItemText,
  Chip,
} from "@material-ui/core";
import { getError } from "../utils/error";
import { Store } from "../utils/Store";
import Layout from "../components/Layout";
import useStyles from "../utils/styles";

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

export default function RefundHistory() {
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

    const fetchOrders = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/history`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);

  return (
    <Layout title="Refund History">
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card className={classes.section}>
            <List>
              <NexLink href="/profile" passHref>
                <ListItem button component="a">
                  <AccountCircleIcon />
                  <ListItemText primary="User Profile"></ListItemText>
                </ListItem>
              </NexLink>
              <NexLink href="/order-history" passHref>
                <ListItem button component="a">
                  <WorkHistoryIcon />
                  <ListItemText primary="Order History"></ListItemText>
                </ListItem>
              </NexLink>
              <NexLink href="/refund-history" passHref>
                <ListItem selected button component="a">
                  <AssignmentReturnIcon />
                  <ListItemText primary="Refund History"></ListItemText>
                </ListItem>
              </NexLink>
            </List>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  Refund History
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
                            }}
                          >
                            Order ID
                          </TableCell>
                          <TableCell
                            style={{
                              fontWeight: "bolder",
                            }}
                          >
                            Date Request
                          </TableCell>
                          <TableCell
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            Total Amount
                          </TableCell>
                          <TableCell
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            Approved At
                          </TableCell>
                          <TableCell
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            Status
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order._id}>
                            {order.applyRefund ? (
                              <TableCell>
                                {order._id.substring(20, 24)}
                              </TableCell>
                            ) : (
                              ""
                            )}
                            {order.applyRefund ? (
                              <TableCell>{order.appliedAt}</TableCell>
                            ) : (
                              ""
                            )}
                            {order.applyRefund ? (
                              <TableCell>{order.totalPrice}</TableCell>
                            ) : (
                              ""
                            )}
                            {order.applyRefund ? (
                              <TableCell>
                                {order.isApproved
                                  ? `approved at ${order.approvedAt}`
                                  : "not approved"}
                              </TableCell>
                            ) : (
                              ""
                            )}
                            {order.applyRefund ? (
                              <TableCell>
                                {order.status == "Approved" ? (
                                  <Chip
                                    label={order.status}
                                    style={{
                                      backgroundColor: "#08f34b",
                                      color: "black",
                                      fontWeight: "bolder",
                                    }}
                                  />
                                ) : (
                                  ""
                                )}{" "}
                                {order.status == "pending" ? (
                                  <Chip
                                    label={order.status}
                                    style={{
                                      backgroundColor: "#FFA500",
                                      color: "black",
                                      fontWeight: "bolder",
                                    }}
                                  />
                                ) : (
                                  ""
                                )}
                                {order.status == "Declined" ? (
                                  <Chip
                                    label={order.status}
                                    style={{
                                      backgroundColor: "red",
                                      color: "black",
                                      fontWeight: "bolder",
                                    }}
                                  />
                                ) : (
                                  ""
                                )}
                              </TableCell>
                            ) : (
                              ""
                            )}
                            {order.applyRefund ? (
                              <TableCell>
                                {" "}
                                <NexLink
                                  href={`/refundPage/${order._id}`}
                                  passHref
                                >
                                  <Button
                                    variant="contained"
                                    style={{
                                      fontWeight: "bolder",
                                      backgroundColor: "#87CEEB ",
                                    }}
                                  >
                                    Details{" "}
                                  </Button>
                                </NexLink>
                              </TableCell>
                            ) : (
                              ""
                            )}
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
