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
function Services() {
  return (
    <Container className={styles.services}>
      <Card className={styles.box}>
        <NextLink href="" passHref>
          <CardActionArea>
            <CardMedia
              style={{
                borderRadius: 20,
              }}
              component="img"
              image="/images/pethotell.jpeg"
              title="Try"
            ></CardMedia>
            <CardContent>
              <Typography variant="h3" style={{ fontFamily: "Anton" }}>
                Pet Boarding
              </Typography>
            </CardContent>
          </CardActionArea>
        </NextLink>
      </Card>
      <Card className={styles.box}>
        <NextLink href="" passHref>
          <CardActionArea>
            <CardMedia
              style={{
                borderRadius: 20,
              }}
              component="img"
              image="/images/Grooming.jpg"
              title="Try"
            ></CardMedia>
            <CardContent>
              <Typography variant="h3" style={{ fontFamily: "Anton" }}>
                Grooming
              </Typography>
            </CardContent>
          </CardActionArea>
        </NextLink>
      </Card>
    </Container>
  );
}

export default Services;
