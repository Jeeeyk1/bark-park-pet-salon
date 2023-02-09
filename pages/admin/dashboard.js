import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NexLink from "next/link";
import React, { useEffect, useContext, useReducer } from "react";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingSharpIcon from "@mui/icons-material/LocalShippingSharp";
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  ListItemText,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { Bar } from "react-chartjs-2";
import { getError } from "../../utils/error";
import { Store } from "../../utils/Store";
import Layout from "../../components/Layout";
import useStyles from "../../utils/styles";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, summary: action.payload, error: "" };
    case "FETCH_SUCCESS_ORDERS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function AdminDashboard() {
  const { state } = useContext(Store);
  const router = useRouter();
  const classes = useStyles();
  const { userInfo } = state;

  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: "",
  });

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/summary`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchData();
  }, []);
  ChartJS.register(CategoryScale, LinearScale, BarElement);
  return (
    <Layout title="Dashboard">
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
            <Typography></Typography>
          )}

          <br />

          <Card className={classes.section2}>
            <List>
              <br />
              <NexLink href="/admin/dashboard" passHref>
                <ListItem selected button component="a">
                  <DashboardCustomizeIcon />
                  <ListItemText primary="Admin Dashboard"></ListItemText>
                </ListItem>
              </NexLink>
              <NexLink href="/admin/orders" passHref>
                <ListItem button component="a">
                  <LocalShippingSharpIcon />
                  <ListItemText primary="Orders"></ListItemText>
                </ListItem>
              </NexLink>
              <NexLink href="/admin/products" passHref>
                <ListItem button component="a">
                  <Inventory2Icon />
                  <ListItemText primary="Products"></ListItemText>
                </ListItem>
              </NexLink>
              <NexLink href="/admin/users" passHref>
                <ListItem button component="a">
                  <PeopleAltIcon />
                  <ListItemText primary="Users"></ListItemText>
                </ListItem>
              </NexLink>
              <NexLink href="/admin/refund" passHref>
                <ListItem button component="a">
                  <AssignmentReturnIcon />
                  <ListItemText primary="Refund requests"></ListItemText>
                </ListItem>
              </NexLink>
            </List>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                {loading ? (
                  <CircularProgress />
                ) : error ? (
                  <Typography className={classes.error}>{error}</Typography>
                ) : (
                  <Grid container spacing={6}>
                    <Grid item md={3}>
                      <Card raised>
                        <CardContent>
                          <Typography variant="h1">
                            ₱{summary.ordersPrice}
                          </Typography>
                          <Typography>Sales</Typography>
                        </CardContent>
                        <CardActions>
                          <NexLink href="/admin/orders" passHref>
                            <Button
                              style={{
                                borderRadius: 20,
                                fontSize: "13px",
                                fontWeight: "bold",
                                backgroundColor: "#24a0ed",
                                color: "#fff",
                              }}
                              variant="contained"
                              size="small"
                              color="primary"
                            >
                              View Sales
                            </Button>
                          </NexLink>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item md={3}>
                      <Card raised>
                        <CardContent>
                          <Typography variant="h1">
                            {summary.ordersCount}
                          </Typography>
                          <Typography> Orders</Typography>
                        </CardContent>
                        <CardActions>
                          <NexLink href="/admin/orders" passHref>
                            <Button
                              style={{
                                borderRadius: 20,
                                fontSize: "13px",
                                fontWeight: "bold",
                                backgroundColor: "#24a0ed",
                                color: "#fff",
                              }}
                              variant="contained"
                              size="small"
                              color="primary"
                            >
                              View orders
                            </Button>
                          </NexLink>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item md={3}>
                      <Card raised>
                        <CardContent>
                          <Typography variant="h1">
                            {summary.productsCount}
                          </Typography>
                          <Typography>Products</Typography>
                        </CardContent>
                        <CardActions>
                          <NexLink href="/admin/products" passHref>
                            <Button
                              style={{
                                borderRadius: 20,
                                fontSize: "13px",
                                fontWeight: "bold",
                                backgroundColor: "#24a0ed",
                                color: "#fff",
                              }}
                              variant="contained"
                              size="small"
                              color="primary"
                            >
                              View products
                            </Button>
                          </NexLink>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item md={3}>
                      <Card raised>
                        <CardContent>
                          <Typography variant="h1">
                            {summary.usersCount}
                          </Typography>
                          <Typography>Users</Typography>
                        </CardContent>
                        <CardActions>
                          <NexLink href="/admin/users" passHref>
                            <Button
                              style={{
                                borderRadius: 20,
                                fontSize: "13px",
                                fontWeight: "bold",
                                backgroundColor: "#24a0ed",
                                color: "#fff",
                              }}
                              variant="contained"
                              size="small"
                              color="primary"
                            >
                              View Users
                            </Button>
                          </NexLink>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item md={3}>
                      <Card raised>
                        <CardContent>
                          <Typography variant="h1">
                            {summary.refundRequestNum}
                          </Typography>
                          <Typography>Refund Request</Typography>
                        </CardContent>
                        <CardActions>
                          <NexLink href="/admin/refund" passHref>
                            <Button
                              style={{
                                borderRadius: 20,
                                fontSize: "13px",
                                fontWeight: "bold",
                                backgroundColor: "#24a0ed",
                                color: "#fff",
                              }}
                              variant="contained"
                              size="small"
                              color="primary"
                            >
                              View Request
                            </Button>
                          </NexLink>
                        </CardActions>
                      </Card>
                    </Grid>
                  </Grid>
                )}
              </ListItem>
              <ListItem>
                <Typography component="h1" variant="h1">
                  Sales Chart
                </Typography>
              </ListItem>
              <ListItem>
                <Bar
                  data={{
                    labels: summary.salesData.map((x) => x._id),
                    datasets: [
                      {
                        label: "Sales",
                        backgroundColor: "rgba(138, 182, 219, 1)",
                        data: summary.salesData.map((x) => x.totalSales),
                        border3Width: 4,
                      },
                    ],
                  }}
                  options={{
                    legend: { display: true, position: "left" },
                  }}
                ></Bar>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(AdminDashboard), { ssr: false });
