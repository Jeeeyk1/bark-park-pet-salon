import { Box, Typography } from "@material-ui/core";
import React from "react";

import Navbar from "../homepage/navbar";
import Services from "../homepage/services";
import Footer from "./footer";

const services = () => {
  return (
    <div>
      <Navbar />
      <Box
        display="flex"
        justifyContent={"center"}
        style={{
          textAlign: "center",
          p: 4,
        }}
      >
        <Typography
          style={{
            marginTop: "100px",
            marginBottom: "100px",
            fontSize: "75px",
            fontFamily: "Bebas Neue",
          }}
        >
          Our Services
        </Typography>
      </Box>
      <Services />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default services;
