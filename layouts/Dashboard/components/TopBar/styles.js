import { makeStyles } from "@material-ui/core";
import { urlObjectKeys } from "next/dist/next-server/lib/utils";

export default makeStyles((theme) => ({
  root: {
    borderBottom: `2px solid ${theme.palette.background.default}`,
    boxShadow: `2 0 35px 0  ${theme.palette.background.default}`,
    backgroundColor: theme.palette.custom.primary,
    display: "flex",
    alignItems: "center",
    height: 60,
    zIndex: theme.appBar,
  },
  toolbar: {
    minHeight: "1%", //Stops logo overflowing
    width: "100%",
    paddingLeft: "5px",
  },
  brandWrapper: {
    background: theme.palette.custom.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "271px", //Ugly hack to get the height of logo displayed
    height: "calc(100% - 2px)",
    flexShrink: 0,
  },
  logo: {
    width: "calc(100% - 90px)",
    height: "100%",
    margin: "20px", //EAAA Logo doesn't resize until ~20px
    paddingTop: "16px", //Another ugly hack to get the height of logo centered to the bar
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: 3,
    color: theme.palette.background.default,
    backgroundImage: theme.palette.custom.backgroundImage,
    backgroundRepeat: "no-repeat",
    // backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundSize: "contain",
  },
/*  
    title: { //Only used for text, not for image logos
    marginLeft: theme.spacing(5),
    textTransform: "uppercase",
    textDecoration: "none",
    fontSize: 14,
    color: theme.palette.Text,
  }, */
  themeToggler: {
    marginLeft: "auto", // This moves the 'Theme Toggle' icon, but nothing else
  },
  notificationsButton: {
    margin: theme.spacing(0, 1),
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
  [theme.breakpoints.down("sm")]: {
   brandWrapper: { margin: "none" },
/*   logo: { display: "none" }, */
  },
}));
