import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    height: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  difference: {
    display: "flex",
    flexDirection: "column",
  },
  differenceValue: {
    color: (props) =>
      props.positiveDifference
        ? theme.palette.success.main
        : theme.palette.error.main,
    marginRight: theme.spacing(1),
  },
  executeButton: {
    backgroundColor: theme.palette.primary.success,
  },
}));
