import { List, makeStyles, styled } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "center",
    top: "800px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: "5rem",
  },
  root1: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    position: "center",
    color: "#black",
  },
  container: {
    height: "100vh",
    textAlign: "center",
  },
  navbar: {
    backgroundColor: "#4fa8bd",
    "& a": {
      color: "#ffffff",
      marginLeft: 10,
    },
  },
  brand1: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  brand: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    color: "#ffffff",
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: "80vh",
  },
  main1: {
    maxWidth: "xl",

    bakcground: "#fff",
  },
  footer: {
    marginTop: 10,
    textAlign: "center",
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
    color: "ffffff",
  },
  section2: {
    marginTop: 10,
    marginBottom: 10,
    color: "#088F8F",
    fontWeight: "bold",
  },
  form: {
    width: "100%",
    maxWidth: 800,
    margin: "0 auto",
  },
  navbarButton: {
    color: "#ffffff",
    textTransform: "initial",
  },
  transparentBackground: {
    backgroundColor: "transparent",
  },
  error: {
    color: "#f04040",
  },
  reviewForm: {
    maxWidth: 800,
    width: "100%",
  },
  reviewItem: {
    marginRight: "1rem",
    borderRight: "1px #808080 solid",
    paddingRight: "1rem",
  },
  mt1: { marginTop: "1rem" },
  //search
  searchSection: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
    searchForm: {
      border: "1px solid black",
      backgroundColor: "white",
      borderRadius: 8,
    },
    searchInput: {
      paddingLeft: 5,
      color: "#000000",
      "&::placeholder": {
        color: "#606060",
      },
    },
    iconButton: {
      backgroundColor: "black",
      padding: 5,
      borderRadius: "0 5px 5px 0",
      "& span": {
        color: "#00000",
      },
    },
  },
  sort: {
    marginRight: 10,
  },
  //homepage
  section1: {
    backgroundSize: "cover",
    height: "1000px",
    display: "flex",
    background: `url(images/image1.jpg)`,

    position: "relative",
  },
  h3: { textAlign: "center", fontSize: "50px", position: "center" },

  boxB: {
    display: "flex",
    justifyContent: "center",

    height: "100%",
    padding: "0px 0px",

    // background: "rgba(168, 229, 248, 1)",
    margin: " 50px 50px 0px",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  boxC: {
    display: "flex",
    alignText: "center",
    flexDirection: "column",
    justifyContent: "center",
    maWidth: 420,
    padding: "30px",
  },
  boxD: {
    alignText: "center",
    marginTop: "100px",
    [theme.breakpoints.up("md")]: {
      padding: "40px 0px 40px 0px",
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 0px 20px 0px",

    background: "rgba(91, 218, 255, .1)",

    height: "100%",
  },
  titleB: {
    textAlign: "left",
    color: "#fff",
    lineHeight: 1.5,
    fontSize: "72px",
    fontFamily: "Rubik Moonrocks",
    marginBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "35px",
      textAlign: "center",
    },
  },
  message: {
    fontSize: "1.5rem",
    fontFamily: "Bebas Neue",
    [theme.breakpoints.up("md")]: {
      fontSize: "3rem",
      textAlign: "center",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "2rem",
      textAlign: "center",
    },
  },
  button1: {
    border: "none",
    fontSize: "40px",
    margin: "20",
    width: "150",
    height: 65,
    fontFamily: "Rubik Moonrocks",
    borderRadius: 6,
    textTransform: "uppercase",
    boxShadow: "0 30px 5px 2px rgba(0,105,135, .2)",
    curson: "pointer",
    color: "#fff",
    backgroundSite: "200%",
    transition: "0.4s",
    "&:hover": {
      backgroundPosition: "right",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "25px",
    },
  },
}));

export const MyList = styled(List)(({ type }) => ({
  display: type === "row" ? "flex" : "block",
  flexGrow: 3,
  justifyContent: "center",
  alignItems: "center",
}));
export const BannerImage = styled("img")(({ src, theme }) => ({
  src: `url(${src})`,
  width: "500px",
  [theme.breakpoints.down("md")]: {
    width: "350px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "250px",
    height: "250px",
  },
}));
export const FeatureImage = styled("img")(({ src, theme }) => ({
  src: `url(${src})`,

  [theme.breakpoints.down("md")]: {
    height: "300",
    width: "500px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "350px",
    height: "200px",
  },
}));

export default useStyles;
