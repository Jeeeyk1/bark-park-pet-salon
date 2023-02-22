import React, { useContext, useEffect, useReducer, useState } from "react";

import Layout from "../../components/Layout";
import { Store } from "../../utils/Store";
import Cookies from "js-cookie";
import {
  Button,
  List,
  ListItem,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import { getError } from "../../utils/error";
import styles from "../../utils/style.module.css";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import dynamic from "next/dynamic";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state };
    case "FETCH_SUCCESS":
      return { ...state, order: action.payload };
    case "FETCH_FAIL":
      return { ...state };

    default:
      state;
  }
}
function Gcash({ params }) {
  const orderId = params.id;
  const { state } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();
  const [{ order }, dispatch] = useReducer(reducer, {
    order: {},
    error: "",
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const [referenceNum, setReferenceNum] = useState();
  const [referenceNumber, setReferenceNumber] = useState();

  const { totalPrice } = order;
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setReferenceNumber(referenceNum);
    console.log(referenceNumber);
    setValue("referenceNumber", referenceNumber);
    if (!userInfo) {
      return router.push("/login");
    } else {
      setReferenceNumber(Cookies.get("referenceNumber" || ""));
    }

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

    fetchOrder();
  }, []);

  const submitHandler = async ({ referenceNumber }) => {
    if (!window.confirm("Are you sure with your Reference Number?")) {
      return;
    }
    closeSnackbar();
    try {
      await axios.put(`/api/orders/${orderId}/reference`, { referenceNumber });
      enqueueSnackbar("Paid successfully", { variant: "success" });
      router.push("/product");
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
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
  return (
    <Layout title="Gcash Payment">
      <div className={styles.payment}>
        <br />
        <br />
        <br />
        <Typography
          component="h1"
          style={{ fontSize: "25px", fontWeight: "bolder" }}
        >
          {" "}
          Order {orderId}
        </Typography>
        <br />
        <br />
        {userInfo ? (
          <Typography className={styles.userGcash}>
            Hello, {userInfo.name} Please pay ₱{totalPrice}{" "}
          </Typography>
        ) : (
          <h1>Logging out.....</h1>
        )}
        <div className={styles.QR}>
          {" "}
          <img alt="qr" src="../images/QR_CODE.png" />
        </div>
        <div className={styles.submitStyle}>
          {" "}
          <form onSubmit={handleSubmit(submitHandler)}>
            <List>
              <ListItem>
                <Controller
                  name="referenceNumber"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 10,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={referenceNumber}
                      onChange={(e) => setReferenceNum(e.target.value)}
                      id="referenceNumber"
                      label="Reference Number"
                      inputProps={{ type: "numbers" }}
                      error={Boolean(errors.referenceNumber)}
                      helperText={
                        errors.referenceNumber
                          ? errors.referenceNumber.type === "minLength"
                            ? "Reference Number length is more than 9"
                            : "Reference Number is required"
                          : ""
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
            </List>
            <StyledButton variant="contained" type="submit" fullWidth>
              <strong>Submit</strong>
            </StyledButton>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  return { props: { params } };
}

export default dynamic(() => Promise.resolve(Gcash), { ssr: false });
