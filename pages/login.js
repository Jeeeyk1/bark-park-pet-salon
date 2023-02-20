import {
  List,
  ListItem,
  TextField,
  Button,
  Link,
  Paper,
  Grid,
  Avatar,
} from "@material-ui/core";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import useStyles from "../utils/styles";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { getError } from "../utils/error";
import LockIcon from "@mui/icons-material/Lock";
import { FaPaw } from "react-icons/fa";
import { withStyles } from "@material-ui/styles";
export default function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { redirect } = router.query; // login?redirect=/shipping
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);

  const classes = useStyles();
  const submitHandler = async ({ email, password }) => {
    closeSnackbar();
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", data);
      router.push(redirect || "/product");
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  const paperStyle = {
    padding: 20,
    width: "350px",
    height: "70vh",
    margin: "20px auto",
  };
  const StyledButton = withStyles({
    root: {
      height: "50px",

      backgroundColor: "#1A2421",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#1A2421",
        color: "#fcd01c",
      },
    },
  })(Button);
  return (
    <Layout title="Login">
      <Grid align="center">
        <Paper elevation={20} style={paperStyle}>
          <Avatar style={{ backgroundColor: "#fcd01c" }}>
            <FaPaw />
          </Avatar>
          <h2>Login</h2>
          <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
            <List>
              <ListItem>
                <PersonIcon />
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="email"
                      label="Email"
                      inputProps={{ type: "email" }}
                      error={Boolean(errors.email)}
                      helperText={
                        errors.email
                          ? errors.email.type === "pattern"
                            ? "Email is not valid"
                            : "Email is required"
                          : ""
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <LockIcon />
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 6,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="password"
                      label="Password"
                      inputProps={{ type: "password" }}
                      error={Boolean(errors.password)}
                      helperText={
                        errors.password
                          ? errors.password.type === "minLength"
                            ? "Password length is more than 5"
                            : "Password is required"
                          : ""
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <StyledButton
                  variant="contained"
                  type="submit"
                  fullWidth
                  color="primary"
                  style={{ fontWeight: "bolder" }}
                >
                  Login
                </StyledButton>
              </ListItem>
              <ListItem>
                Don&apos;t have an account? &nbsp;
                <NextLink
                  href={`/register?redirect=${redirect || "/"}`}
                  passHref
                >
                  <Link>Register</Link>
                </NextLink>
              </ListItem>
            </List>
          </form>
        </Paper>
      </Grid>
    </Layout>
  );
}
