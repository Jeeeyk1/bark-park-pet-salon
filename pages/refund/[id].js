/* eslint-disable @next/next/no-img-element */
import {
  CircularProgress,
  List,
  ListItem,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";

import React, { useContext, useEffect, useReducer } from "react";

import Layout from "../../components/Layout";
import { Store } from "../../utils/Store";

import { useRouter } from "next/router";
import useStyles from "../../utils/styles";

import { getError } from "../../utils/error";
import axios from "axios";
import { useSnackbar } from "notistack";
function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      state;
  }
}

export default function RefundRequest({ params }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const orderId = params.id;
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loading, error, order, successPay, successDeliver }, dispatch] =
    useReducer(reducer, {
      loading: true,
      order: {},
      error: "",
    });
  const { description } = order;
  const submitHandler = async ({ description }) => {
    if (!window.confirm("Are you sure to refund this order?")) {
      return;
    }
    closeSnackbar();
    try {
      await axios.put(`/api/orders/${orderId}/refund`, {
        description,
      });
      enqueueSnackbar("Refund request has been successful", {
        variant: "success",
      });

      // router.push("/refund-history");
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
    console.log("number of request added + " + order.numberOfRefundRequests);
    console.log("Description tested " + description);
  };

  useEffect(() => {
    setValue("description", description);
    if (!userInfo) {
      return router.push("/login");
    }
    console.log(description);
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
    }
  }, [order, successPay, successDeliver]);

  return (
    <Layout title={`Order ${orderId}`}>
      <br />
      <br />
      <Typography
        component="h1"
        style={{
          fontSize: "25px",
          fontWeight: "bolder",
          justifyContet: "center",
          textAlign: "center",
        }}
      >
        {" "}
        Order {orderId}
      </Typography>
      <br />
      <br />
      <br />
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography className={classes.error}>{error}</Typography>
      ) : (
        <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
          <Typography
            component="h1"
            style={{ fontSize: "25px", fontWeight: "bolder" }}
          >
            Refund Request
          </Typography>
          <Typography>Note:</Typography>{" "}
          <Typography>Please be informed that not all</Typography>
          <List>
            <ListItem>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 15,
                }}
                render={({ field }) => (
                  <TextField
                    size="string"
                    variant="outlined"
                    id="description"
                    fullWidth
                    multiline
                    label="Please enter details why do you want to refund or return this item"
                    inputProps={{ type: "text", sx: { height: 300 } }}
                    error={Boolean(errors.description)}
                    helperText={
                      errors.description
                        ? errors.description.type === "minLength"
                          ? "Description length is more than 15"
                          : "Description is required"
                        : ""
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>

            <ListItem>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                color="primary"
              >
                Submit Refund Request
              </Button>
            </ListItem>
          </List>
        </form>
      )}
    </Layout>
  );
}
