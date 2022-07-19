import { Box, Grid, Link, Typography } from "@material-ui/core";
import { List } from "@material-ui/icons";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import NextLink from "next/link";
export default function Footer() {
  return (
    <Box
      style={{
        marginTop: "20px",
        background: "#4fa8bd",
        color: "#ffff",
        padding: { xs: 4, md: 10 },
        paddingTop: 12,
        paddingBottom: 12,
        fontSize: { xs: "12px", md: "14px" },
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item md={6} lg={4}>
          <Typography
            style={{
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            About us
          </Typography>
          <Typography variant="caption2">Bark Park Pet Salon</Typography>
          <Box
            sx={{
              mt: 4,
              color: "#ffff",
            }}
          >
            <Link>
              <NextLink
                href="https://www.facebook.com/Bark-Pack-Pet-Salon-Baguio-620647448458299"
                passHref
              >
                <FacebookIcon sx={{ mr: 1 }} />
              </NextLink>
            </Link>
            <InstagramIcon sx={{ mr: 1 }} />
          </Box>
        </Grid>
        <Grid item md={6} lg={2}>
          <Typography variant="body">Information</Typography>
          <List></List>
        </Grid>
      </Grid>
    </Box>
  );
}
