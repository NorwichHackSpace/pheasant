import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputIcon from "@material-ui/icons/Input";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 50,
    height: 50,

    boxShadow: `0px 2px 5px 0px  ${theme.palette.contrastText}`,
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    height: "inherit",
  },
}));

export default function ResetButton(props) {
  const classes = useStyles();

  return (
    <Button className={classes.root} onClick={props.onClick}>
      <InputIcon />
    </Button>
  );
}
