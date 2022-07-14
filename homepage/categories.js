import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@material-ui/core";
import React from "react";
import NextLink from "next/link";
import styles from "../utils/style.module.css";
function Categories() {
  return (
    <Container className={styles.services}>
      <Card className={styles.box}>
        <NextLink href="/search?category=Dog Food" passHref>
          <CardActionArea>
            <CardMedia
              style={{
                borderRadius: 20,
                backgroundColor: "088F8F",
              }}
              component="img"
              image="/images/pethotell.jpeg"
              title="Dog Food"
            ></CardMedia>
            <CardContent>
              <Typography variant="h3" style={{ fontFamily: "sans-serif" }}>
                Dog Food
              </Typography>
            </CardContent>
          </CardActionArea>
        </NextLink>
      </Card>
      <Card className={styles.box}>
        <NextLink href="/search?category=Cat Food" passHref>
          <CardActionArea>
            <CardMedia
              style={{
                borderRadius: 20,
              }}
              component="img"
              image="/images/Grooming.jpg"
              title="Cat Food"
            ></CardMedia>
            <CardContent>
              <Typography variant="h3">Cat Food</Typography>
            </CardContent>
          </CardActionArea>
        </NextLink>
      </Card>
    </Container>
  );
}

export default Categories;
