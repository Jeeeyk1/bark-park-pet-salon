import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import useStyles from "../utils/styles";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import {
  ListItem,
  Typography,
  List,
  TextField,
  Button,
  MenuItem,
} from "@material-ui/core";
import CheckoutWizard from "../components/CheckoutWizard";

export default function Shipping() {
  const [barangay, setBarangay] = useState();

  const handlerChange = (event) => {
    setBarangay(event.target.value);
    console.log(shippingAddress.barangay);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=/shipping");
    }
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("barangay", shippingAddress.barangay);
    setValue("city", shippingAddress.city);
    setValue("zipCode", shippingAddress.zipCode);
    setValue("contactNumber", shippingAddress.contactNumber);
  }, []);

  const classes = useStyles();
  const submitHandler = ({
    fullName,
    address,
    barangay,
    city,
    zipCode,
    contactNumber,
  }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",

      payload: {
        fullName,
        address,
        barangay,
        city,
        zipCode,
        contactNumber,
      },
    });
    Cookies.set(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        barangay,
        city,
        zipCode,
        contactNumber,
      })
    );
    router.push(redirect || "/payment");
  };
  return (
    <Layout title="Shipping">
      <CheckoutWizard activeStep={1} />
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography
          component="h1"
          style={{ fontSize: "25px", fontWeight: "bolder" }}
        >
          Shipping Address
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="fullName"
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
                  id="fullName"
                  label="Full Name"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.fullName)}
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === "minLength"
                        ? "Full Name length is more than 4"
                        : "Full Name is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="address"
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
                  id="address"
                  label="Full Address "
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.address)}
                  helperText={
                    errors.address
                      ? errors.address.type === "minLength"
                        ? "Address length is more than 4"
                        : "Address is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name="barangay"
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
                  id="barangay"
                  value={barangay}
                  label="Select barangay"
                  select
                  inputProps={{ type: "text" }}
                  onChange={handlerChange}
                  error={Boolean(errors.barangay)}
                  helperText={
                    errors.barangay
                      ? errors.barangay.type === "Barangay is required"
                      : ""
                  }
                  {...field}
                >
                  <MenuItem value="Brookside">Brookside</MenuItem>
                  <MenuItem value="Irisan">Irisan</MenuItem>
                  <MenuItem value="Green valley">Green valley</MenuItem>
                  <MenuItem value="Quezon Hill">Quezon Hill</MenuItem>
                  <MenuItem value="Ambiong">Ambiong</MenuItem>
                  <MenuItem value="Campo sioco">Campo sioco</MenuItem>
                  <MenuItem value="Bakakeng norte">Bakakeng norte</MenuItem>
                  <MenuItem value="Bakakeng sur">Bakakeng sur</MenuItem>
                  <MenuItem value="Camp 7">Camp 7</MenuItem>
                  <MenuItem value="Loakan proper">Loakan proper</MenuItem>
                  <MenuItem value="Bakakeng norte">Bakakeng norte</MenuItem>
                </TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name="city"
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
                  id="city"
                  select
                  label="City"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.city)}
                  helperText={
                    errors.city
                      ? errors.city.type === "minLength"
                        ? "City length is more than 4"
                        : "City is required"
                      : ""
                  }
                  {...field}
                >
                  <MenuItem value="Baguio City">Baguio City</MenuItem>
                </TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="zipCode"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 4,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="zipCode"
                  label="Zip Code"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.zipCode)}
                  helperText={
                    errors.zipCode
                      ? errors.zipCode.type === "minLength"
                        ? "Zip Code length is more than 3"
                        : "Zip Code is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="contactNumber"
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
                  id="contactNumber"
                  label="Contact Number"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.contactNumber)}
                  helperText={
                    errors.contactNumber
                      ? errors.contactNumber.type === "minLength"
                        ? "Contact Number length is more than 4"
                        : "Contact Number is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Continue
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}
