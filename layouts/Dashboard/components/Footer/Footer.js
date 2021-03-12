import React from "react";
import { Divider, Typography, Link } from "@material-ui/core";
import useStyles from "./styles";

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Divider />
    </div>
  );
}
