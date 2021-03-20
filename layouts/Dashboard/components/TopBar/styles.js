import { makeStyles } from "@material-ui/core";
import { urlObjectKeys } from "next/dist/next-server/lib/utils";

export default makeStyles((theme) => ({
  root: {
    borderBottom: `3px solid ${theme.palette.background.secondary}`,
    boxShadow: `2 0 35px 0  ${theme.palette.background.secondary}`,
    backgroundColor: theme.palette.custom.primary,
    display: "flex",
    alignItems: "center",
    height: 60,
    zIndex: theme.appBar,
  },
  toolbar: {
    minHeight: "1%", //Stops logo overflowing
    width: "98%",
    paddingLeft: "15px",
  },
  brandWrapper: {
    background: theme.palette.custom.primary,
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    width: "271px", //Ugly hack to get the height of logo displayed
    height: "calc(100% - 2px)",
    flexShrink: 1,
  },
  logo: {
    width: "calc(100% - 90px)",
    height: "100%",
    margin: "20px", //EAAA Logo doesn't resize until ~20px
    paddingTop: "15px", //Another ugly hack to get the height of logo centered to the bar
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: 3,
    color: theme.palette.background.default,
    backgroundImage: theme.palette.custom.backgroundImage,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
  },
    title: { //Only used for text, not for image logos
    marginLeft: theme.spacing(5),
    textTransform: "uppercase",
    textDecoration: "none",
    fontSize: 14,
    color: theme.palette.Text,
  },
  themeToggler: {
    marginLeft: "auto",
  },
  [theme.breakpoints.down("xl")]: {
   toolbar: { width: "96%", },
  },
  [theme.breakpoints.down("m")]: {
   toolbar: { width: "100%", },
  },
  [theme.breakpoints.down("sm")]: {
//   brandWrapper: { marginLeft: "-50px", marginRight: "-50px", },
     brandWrapper: { marginLeft: "calc(8% + -50px)", marginRight: "calc(8% + -50px)", }, 
  },
  [theme.breakpoints.down("xs")]: {
   logo: { display: "none" }, //TODO: Might be better to have a small logo?
  },
}));
