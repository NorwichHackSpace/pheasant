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
    top: '4px',
    right: '4px',
    color: theme.palette.custom.primary,
  },
  panelWrapper: {
    //'background-color': 'red',
  },
  hiddenIcon: {
    visibility: 'hidden',
  },
});

