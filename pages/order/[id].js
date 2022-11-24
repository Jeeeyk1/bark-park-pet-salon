/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CircularProgress,
  Grid,
  Link,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@material-ui/core";
import styles from "../../utils/style.module.css";
import React, { useContext, useEffect, useReducer } from "react";
import dynamic from "next/dynamic";
import Layout from "../../components/Layout";
import { Store } from "../../utils/Store";
import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import useStyles from "../../utils/styles";
import CheckoutWizard from "../../components/CheckoutWizard";
import { getError } from "../../utils/error";
import axios from "axios";
import { useSnackbar } from "notistack";
import { usePayPalScriptReducer, PayPalButtons } from "@paypal/react-paypal-js";
function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, sucessPay: "true" };
    case "PAY_FAIL":
      return { ...state, loadingPay: false, errorPay: action.payload };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false, errorPay: "" };
    case "DELIVER_REQUEST":
      return { ...state, loadingDeliver: true };
    case "DELIVER_SUCCESS":
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: true,
        sucessPay: "true",
      };
    case "DELIVER_FAIL":
      return { ...state, loadingDeliver: false, errorDeliver: action.payload };
    case "DELIVER_RESET":
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
        errorDeliver: "",
      };
    default:
      state;
  }
}

function Order({ params }) {
  const { enqueueSnackbar } = useSnackbar();
  const orderId = params.id;
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const classes = useStyles();
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [
    { loading, error, order, successPay, loadingDeliver, successDeliver },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
    referenceNumber,
    applyRefund,
  } = order;

  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    }
    console.log(referenceNumber);
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
      if (successDeliver) {
        dispatch({ type: "DELIVER_RESET" });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get("/api/keys/paypal", {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        paypalDispatch({
          type: "resetOptions",
          value: { "client-id": clientId, currency: "PHP" },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      loadPaypalScript();
    }
  }, [order, successPay, successDeliver]);
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "PAY_SUCCESS", payload: data });
        enqueueSnackbar("Order is paid", { variant: "success" });
      } catch (err) {
        dispatch({ type: "PAY_FAIL", payload: getError(err) });
        enqueueSnackbar(getError(err), { variant: "error" });
      }
    });
  }

  function onError(err) {
    enqueueSnackbar(getError(err), { variant: "error" });
  }

  async function deliverOrderHandler() {
    try {
      dispatch({ type: "DELIVER_REQUEST" });
      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "DELIVER_SUCCESS", payload: data });
      enqueueSnackbar("Order is delivered", { variant: "success" });
    } catch (err) {
      dispatch({ type: "DELIVER_FAIL", payload: getError(err) });
    }
  }

  return (
    <Layout title={`Order ${orderId}`}>
      <CheckoutWizard activeStep={4}></CheckoutWizard>
      <Typography
        component="h1"
        style={{ fontSize: "25px", fontWeight: "bolder" }}
      >
        {" "}
        Order {orderId}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography className={classes.error}>{error}</Typography>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography
                    component="h2"
                    style={{ fontSize: "25px", fontWeight: "bolder" }}
                  >
                    Shipping Address
                  </Typography>
                </ListItem>
                <ListItem>
                  {shippingAddress.fullName}, {""}
                  {shippingAddress.address}, {""}
                  {shippingAddress.zipCode}
                </ListItem>
                <ListItem>
                  Contact Number: {""}
                  {shippingAddress.contactNumber}
                </ListItem>
                <ListItem>
                  Status:{" "}
                  {isDelivered
                    ? `delivered at ${deliveredAt}`
                    : "not delivered"}
                </ListItem>
              </List>
            </Card>

            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography
                    component="h2"
                    style={{ fontSize: "25px", fontWeight: "bolder" }}
                  >
                    Payment Method
                  </Typography>
                </ListItem>
                <ListItem>{paymentMethod}</ListItem>
                <ListItem>
                  Status: {isPaid ? `paid at ${paidAt}` : "not paid"}
                </ListItem>
                {paymentMethod === "Gcash" && referenceNumber ? (
                  <ListItem>ReferenceNumber: {referenceNumber}</ListItem>
                ) : (
                  <br />
                )}
              </List>
            </Card>

            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component="h2" variant="h2">
                    Order Items
                  </Typography>
                </ListItem>
                <ListItem>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableHead>
                      <TableBody>
                        {orderItems.map((item) => (
                          <TableRow key={item._id}>
                            <TableCell>
                              <NextLink
                                href={`/products/${item.slug}`}
                                passHref
                              >
                                <Link>
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                  ></Image>
                                </Link>
                              </NextLink>
                            </TableCell>

                            <TableCell>
                              <NextLink
                                href={`/products/${item.slug}`}
                                passHref
                              >
                                <Link>
                                  <Typography>{item.name}</Typography>
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>{item.quantity}</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>{item.price}</Typography>
                            </TableCell>
                            <TableCell align="right"></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ListItem>
              </List>
            </Card>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography variant="h2">Order Summary</Typography>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Item Price:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">{itemsPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Shipping:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">{shippingPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>
                        <strong>Total:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        <strong>{totalPrice}</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                {!isPaid && !userInfo.isAdmin && !isDelivered && (
                  <ListItem>
                    {isPending ? (
                      <CircularProgress />
                    ) : (
                      <div className={classes.fullWidth}>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                        <div className={styles.gcash}>
                          <Button
                            onClick={() => {
                              router.push(`../${orderId}`);
                            }}
                          >
                            <Typography className={styles.gcashButton}>
                              Gcash Payment
                            </Typography>
                          </Button>
                        </div>
                      </div>
                    )}
                  </ListItem>
                )}
                {isPaid && !userInfo.isAdmin && isDelivered && !applyRefund && (
                  <ListItem>
                    {isPending ? (
                      <CircularProgress />
                    ) : (
                      <div className={classes.fullWidth}>
                        <div className={styles.refund}>
                          <Button
                            onClick={() => {
                              router.push(`../../refund/${orderId}`);
                            }}
                          >
                            <Typography className={styles.refundBox}>
                              Refund
                            </Typography>
                          </Button>
                        </div>
                      </div>
                    )}
                  </ListItem>
                )}
                {userInfo.isAdmin && !order.isDelivered && (
                  <ListItem>
                    {loadingDeliver && <CircularProgress />}
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={deliverOrderHandler}
                      style={{
                        fontWeight: "bolder",
                        backgroundColor: "#fcd01c",
                      }}
                    >
                      Ship Out Order
                    </Button>
                  </ListItem>
                )}
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}
export async function getServerSideProps({ params }) {
  return { props: { params } };
}

export default dynamic(() => Promise.resolve(Order), { ssr: false });
