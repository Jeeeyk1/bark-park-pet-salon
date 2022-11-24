import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import CheckoutWizard from "../components/CheckoutWizard";
import useStyles from "../utils/styles";
import Layout from "../components/Layout";
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { useSnackbar } from "notistack";

export default function Payment() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("");
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;
  useEffect(() => {
    if (!shippingAddress.address) {
      router.push("/shipping");
    } else {
      setPaymentMethod(Cookies.get("paymentMethod") || "");
    }
  }, []);
  const submitHandler = (e) => {
    closeSnackbar();
    e.preventDefault();
    if (!paymentMethod) {
      enqueueSnackbar("Payment method is required", { variant: "error" });
    } else {
      dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethod });
      Cookies.set("paymentMethod", paymentMethod);
      router.push("/placeorder");
    }
  };
  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2}></CheckoutWizard>
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
          Payment Method
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                arial-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  label="Paypal"
                  value="Paypal"
                  control={<Radio />}
                >
                  Paypal
                </FormControlLabel>
                <FormControlLabel
                  label="Gcash"
                  value="Gcash"
                  control={<Radio />}
                >
                  Gcash
                </FormControlLabel>
                <FormControlLabel label="COD" value="COD" control={<Radio />}>
                  Cash on Delivery
                </FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Continue
            </Button>
            <ListItem>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                onClick={() => router.push("/shipping")}
              >
                Back
              </Button>
            </ListItem>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
