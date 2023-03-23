import {
  Button,
  Card,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Link,
  List,
  ListItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useContext } from "react";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import NextLink from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock <= 0) {
      window.alert("Sorry, Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };
  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  const checkOutHandler = () => {
    router.push("shipping");
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
    <Layout title="Shopping Cart">
      <Typography
        variant="h1"
        style={{ fontSize: "30px", fontWeight: "bolder", marginTop: "20px" }}
      >
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <div>
          Cart is Empty.{" "}
          <NextLink href="/product" passHref>
            <Link>Shop Now</Link>
          </NextLink>
        </div>
      ) : (
        <Grid container spacing={2}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <NextLink href={`/products/${item.slug}`} passHref>
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
                        <NextLink href={`/products/${item.slug}`} passHref>
                          <Link>
                            <Typography>{item.name}</Typography>
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell align="right">
                        <FormControl>
                          <InputLabel id="quantity-label"></InputLabel>
                          <Select
                            labelId="quantity-label"
                            native
                            value={item.quantity}
                            onChange={(e) =>
                              updateCartHandler(item, e.target.value)
                            }
                            input={
                              <Input
                                type="number"
                                min={1}
                                max={item.countInStock}
                              />
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="right">₱{item.price}.00</TableCell>
                      <TableCell align="right">
                        <Button
                          style={{
                            backgroundColor: "red",
                          }}
                          variant="contained"
                          onClick={() => removeItemHandler(item)}
                        >
                          X
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h1">
                    <strong>Subtotal</strong> (
                    {cartItems.reduce((a, c) => a + c.quantity, 0)}&nbsp; items)
                    :&nbsp;₱
                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}.00
                  </Typography>
                </ListItem>
                <ListItem>
                  <StyledButton
                    onClick={checkOutHandler}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    <strong> Check Out</strong>
                  </StyledButton>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
