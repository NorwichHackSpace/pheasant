import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';
//Icons
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import SmsRoundedIcon from '@material-ui/icons/SmsRounded';

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
      <CardActions>
        <Tooltip title="Disabled during Dev">
	        <Button startIcon={<PhoneRoundedIcon />} aria-label="tel" >
	          01603 286286
	        </Button>
        </Tooltip>
        <Tooltip title="Disabled during Dev">
	        <Button startIcon={<SmsRoundedIcon />} aria-label="sms" >
	          Message
	        </Button>
        </Tooltip>
      </CardActions>
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
      <CardActions>
        <Button startIcon={<PhoneRoundedIcon />} 
	  	onClick={ ()=>{window.location = ("tel:07779331082"); }}>
	 01953 483533
        </Button>
        <Button startIcon={<SmsRoundedIcon />}
                onClick={ ()=>{window.location = ('sms:[07779331082]?body=' + 'Hello msg from Pheasent'); }}>
          Message
        </Button>
      </CardActions>
    </Card>
  );
}


