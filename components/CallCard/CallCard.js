import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minHeight: 210,
  },  
  main: {
    backgroundColor: "#ffffff",
    height: "inherit",
  },
});

export default function CallCard() {
  const classes = useStyles();
  //console.log(classes);
  return (
    <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Norfolk and Norwich University Hospital
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Colney Lane Norwich NR4 7UY
          </Typography>
        </CardContent>
     <CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Call: 01603 286286
        </Button>
        <Button size="small" color="primary">
          Message
        </Button>
      </CardActions>
    </CardActionArea>
    </Card>
  );
}


//TODO: Console log says there is a button within a button here?
export const CallCardTest = () => { 

  const classes = useStyles();
  return (
    <Card className={classes.root} >
      <CardContent>
         <Typography gutterBottom variant="h5" component="h2">
           Alan Childs
         </Typography>
         <Typography variant="body2" color="textSecondary" component="p">
           Lilac Cottage, Mere Road
         </Typography>
       </CardContent>
     <CardActionArea>
      <CardActions>
        <Button size="small" color="primary"
	  onClick={ ()=>{window.location = ("tel:01953483533"); }}>
	 Call: 01953 483533
        </Button>
        <Button size="small" color="primary"
         onClick={ ()=>{window.location = ("sms:01953483533"); }}>
          Message
        </Button>
      </CardActions>
     </CardActionArea>
    </Card>
  );
}


