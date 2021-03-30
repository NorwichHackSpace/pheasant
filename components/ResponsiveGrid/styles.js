import { makeStyles } from "@material-ui/core";

export default (theme) => ({
  root: {},
  main: {
    backgroundColor: "#ffffff",
    height: "inherit",
  },
  panelControl: {
    position: 'absolute',
    cursor: "pointer",
    top: '6px',
    right: '6px',
    color: theme.palette.primary.light,
  },
  panelWrapper: {
    //'background-color': 'red',
  },
  hiddenIcon: {
    visibility: 'hidden',
  },
});

