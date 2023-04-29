

import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  styled,
  Toolbar,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PaymentMethod from "/Payment-Methods.png"

function Link(props) {
  return (
    <Typography variant="body">
      <MuiLink
        component={RouterLink}
        underline="hover"
        {...props}
        sx={{
          color: "inherit",
        }}
        
      ></MuiLink>
    </Typography>
  );
}

function Footer() {
  const CustomLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
  }));

  return (
    <Box>
      <Divider />
      {/* <Container container justify="center" style={{ minHeight: "212px" }}> */}
      <Container maxWidth="xl">
        <Toolbar>
          <Grid container item columnSpacing={2} pt={2}>
            <Grid item sm={3} xs={12}>
              <Typography
                variant="h4"
                sx={{ fontFamily: "David Libre" }}
                fontWeight={200}
              >
                Ayusha Store
              </Typography>
              <Stack p={1} gap={0.5} sx={{ color: "text.secondary" }}>
                <CustomLink >About Us</CustomLink>

                <Typography paragraph>
                  <Facebook color="action" /> <Instagram color="action" />
                  <Twitter color="action" /> <YouTube color="action" />
                </Typography>
              </Stack>
            </Grid>

            <Grid item sm={3} xs={11} sx={{ color: "text.primary" }}>
              <Typography variant="h5" fontWeight={500}>
                Quick Links
              </Typography>
              <Stack p={1} gap={0.5} sx={{ color: "text.secondary" }}>
                <Link to="/profile/orders">My orders</Link>
                <Link to="/profile/cart">Cart</Link>
                <Link >Terms & Conditions</Link>
              </Stack>
            </Grid>
            <Grid item sm={4} xs={11} sx={{ color: "text.primary" }}>
              <Typography variant="h5" fontWeight={500}>
                Contact Us
              </Typography>
              <Stack p={1} gap={0.5} sx={{ color: "text.secondary" }}>
                <MuiLink
                  underline="hover"
                  sx={{
                    color: "inherit",
                  }}
                  href="tel:0718203888"
                >
                  Sales and Support : 071 820 3888 / 071 530 4187
                </MuiLink>

                <MuiLink
                  underline="hover"
                  sx={{
                    color: "inherit",
                  }}
                  href="https://goo.gl/maps/E5fqtBCg7xgCUomJ9"
                >
                  Address : Isurupura, talahena South, Malabe.
                </MuiLink>
              </Stack>
            </Grid>
            <Grid item sm={2} xs={11} sx={{ color: "text.primary" }}>
              <Typography variant="h5" fontWeight={500}>
                Payment Options
              </Typography>
              <Stack p={1} gap={0.5} sx={{ color: "text.secondary" }}>
                <img
                  src={PaymentMethod}
                  alt="payment options"
                  style={{ height: "150px", width: "150px" }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>

      <AppBar
        position="static"
        elevation={0}
        component="footer"
        color="default"
      >
        <Toolbar style={{ justifyContent: "center" }}>
          <Typography variant="caption">©2022</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Footer;










// import React from "react";
// import { Box } from "@mui/material";

// const Footer = () => {
//   return <Box sx={{ backgroundColor: "black", color: "white" }}>Footer</Box>;
// };

// export default Footer;
