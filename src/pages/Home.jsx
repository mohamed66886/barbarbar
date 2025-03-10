import React from "react";
import { Container, Typography } from "@mui/material";

const Home = () => {
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>مرحبًا بك في Barber Shop</Typography>
      <Typography variant="body1">إدارة محلك بسهولة واحترافية.</Typography>
    </Container>
  );
};

export default Home;
