/* eslint-disable @next/next/no-img-element */
import {
  CircularProgress,
  List,
  ListItem,
  Typography,
  Button,
  TextField,
  withStyles,
  MenuItem,
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
import dynamic from "next/dynamic";
import { Alert } from "@material-ui/lab";
function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true, errorUpdate: "" };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false, errorUpdate: "" };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
}

function RefundRequest({ params }) {
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

  const [
    { loading, error, order, successPay, successDeliver, loadingUpload },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });
  const { description, reason } = order;
  const submitHandler = async ({ description, imageRefund, reason }) => {
    if (!window.confirm("Are you sure to refund this order?")) {
      return;
    }
    closeSnackbar();
    try {
      await axios.put(`/api/orders/${orderId}/refund`, {
        description,
        imageRefund,
        reason,
      });
      enqueueSnackbar("Refund request has been successful", {
        variant: "success",
      });

      router.push("/refund-history");
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
    console.log("number of request added + " + order.numberOfRefundRequests);
    console.log("Description tested " + description);
    console.log("Reason tested " + reason);
  };

  useEffect(() => {
    setValue("description", description);
    setValue("reason", reason);
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
  const StyledButton = withStyles({
    root: {
      height: "50px",
      backgroundColor: "#1A2421",
      color: "#fcd01c",
      "&:hover": {
        backgroundColor: "#1A2421",
        color: "#fcd01c",
      },
    },
  })(Button);
  const uploadHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const { data } = await axios.post("/api/admin/upload", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: "UPLOAD_SUCCESS" });
      setValue("imageRefund", data.secure_url);
      enqueueSnackbar("File uploaded successfully", { variant: "success" });
    } catch (err) {
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  return (
    <Layout title={`Order BPPSB${orderId.substring(20, 24)}`}>
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
        Order BPPSB{orderId.substring(20, 24)}
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

          <Typography className={classes.warningText}></Typography>
          <Alert severity="warning" style={{ textTransform: "none" }}>
            <strong>
              {" "}
              Note : Please be aware that not all of your requests will be
              granted, The staff must first review each one before validating
              it. Thank you!
            </strong>
          </Alert>
          <List>
            <ListItem>
              <Controller
                name="reason"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 5,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="reason"
                    select
                    label="Reason for return"
                    inputProps={{ type: "text" }}
                    error={Boolean(errors.city)}
                    helperText={
                      errors.city
                        ? errors.city.type === "minLength"
                          ? "reason length is more than 4"
                          : "reason is required"
                        : ""
                    }
                    {...field}
                  >
                    <MenuItem
                      value="Wrong Item Received"
                      style={{ fontWeight: "bolder" }}
                    >
                      Wrong item received
                    </MenuItem>
                    <MenuItem
                      value=" Unauthorized Purchased"
                      style={{ fontWeight: "bolder" }}
                    >
                      Unauthorized Purchased
                    </MenuItem>
                    <MenuItem
                      value="Expired Product"
                      style={{ fontWeight: "bolder" }}
                    >
                      Expired Product
                    </MenuItem>
                    <MenuItem
                      value=" Different from Website Description"
                      style={{ fontWeight: "bolder" }}
                    >
                      Different from Website Description
                    </MenuItem>
                    <MenuItem
                      value=" Damaged item"
                      style={{ fontWeight: "bolder" }}
                    >
                      Damaged item
                    </MenuItem>
                    <MenuItem
                      value=" Replacement"
                      style={{ fontWeight: "bolder" }}
                    >
                      Replacement
                    </MenuItem>
                  </TextField>
                )}
              ></Controller>
            </ListItem>
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
                    rows={6}
                    label="Please enter full details why do you want to refund or return this item"
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
              <Controller
                name="imageRefund"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    id="imageRefund"
                    label="ImageRefund"
                    error={Boolean(errors.image)}
                    helperText={errors.image ? "Image is required" : ""}
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                component="label"
                style={{
                  fontWeight: "bolder",
                  backgroundColor: "#24a0ed",
                  color: "#ffff",
                }}
              >
                Upload file
                <input type="file" onChange={uploadHandler} hidden />
              </Button>

              {loadingUpload && <CircularProgress />}
            </ListItem>
            <ListItem>
              <StyledButton
                variant="contained"
                type="submit"
                fullWidth
                color="primary"
              >
                Submit Refund Request
              </StyledButton>
            </ListItem>
          </List>
        </form>
      )}
    </Layout>
  );
}
export async function getServerSideProps({ params }) {
  return { props: { params } };
}
export default dynamic(() => Promise.resolve(RefundRequest), { ssr: true });
