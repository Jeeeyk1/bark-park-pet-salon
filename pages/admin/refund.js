import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useEffect, useContext, useReducer } from "react";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingSharpIcon from "@mui/icons-material/LocalShippingSharp";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
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
  Chip,
} from "@material-ui/core";
import { getError } from "../../utils/error";
import { Store } from "../../utils/Store";
import Layout from "../../components/Layout";
import useStyles from "../../utils/styles";
import WarningIcon from "@mui/icons-material/Warning";
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
          <br />
          <br />

          {userInfo ? (
            <Typography variant="h1">
              <AdminPanelSettingsIcon />
              <span style={{ fontWeight: "bold" }}>Admin:</span> {userInfo.name}
            </Typography>
          ) : (
            <Typography>Logging out.....</Typography>
          )}
          <br />

          <Card className={classes.section2}>
            <List>
              <br />
              <NextLink href="/admin/dashboard" passHref>
                <ListItem button component="a">
                  <DashboardCustomizeIcon />
                  <ListItemText primary="Admin Dashboard"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/orders" passHref>
                <ListItem button component="a">
                  <LocalShippingSharpIcon />
                  <ListItemText primary="Orders"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/products" passHref>
                <ListItem button component="a">
                  <Inventory2Icon />
                  <ListItemText primary="Products"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/users" passHref>
                <ListItem button component="a">
                  <PeopleAltIcon />
                  <ListItemText primary="Users"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/refund" passHref>
                <ListItem selected button component="a">
                  <AssignmentReturnIcon />
                  <ListItemText primary="Refund requests"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/admin/critical" passHref>
                <ListItem button component="a">
                  <WarningIcon />
                  <ListItemText primary="Critical Stocks"></ListItemText>
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>

        <Grid item md={9} xs={12}>
          <br />
          <br />
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  Refund Requests
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
                            ORDER ID
                          </TableCell>
                          <TableCell
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            USER
                          </TableCell>
                          <TableCell
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            DATE REQUEST
                          </TableCell>
                          <TableCell
                            style={{
                              fontWeight: "bold",
                              fontSize: "1rem",
                            }}
                          >
                            STATUS
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
                            {order.applyRefund ? (
                              <TableCell style={{}}>
                                {order._id.substring(20, 24)}
                              </TableCell>
                            ) : (
                              ""
                            )}
                            {order.applyRefund ? (
                              <TableCell style={{}}>
                                {order.user ? order.user.name : "DELETED USER"}
                              </TableCell>
                            ) : (
                              ""
                            )}

                            {order.applyRefund ? (
                              <TableCell style={{}}>
                                {order.appliedAt}
                              </TableCell>
                            ) : (
                              ""
                            )}
                            {order.applyRefund ? (
                              <TableCell>
                                {console.log(order.status)}{" "}
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
                              <TableCell
                                style={{
                                  fontWeight: "bold",
                                }}
                              >
                                <NextLink
                                  href={`../refundPage/${order._id}`}
                                  passHref
                                >
                                  <Button
                                    style={{
                                      fontWeight: "bolder",
                                      backgroundColor: "#24a0ed",
                                      color: "#ffff",
                                    }}
                                    variant="outlined"
                                  >
                                    Details
                                  </Button>
                                </NextLink>
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

export default dynamic(() => Promise.resolve(AdminOrders), { ssr: false });
