import React, {
	Component
} from "react";
import {
	withStyles
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

//Icons
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import CloseIcon from '@material-ui/icons/Close';

//Components
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from '@material-ui/core/CardHeader';

import Button from "@material-ui/core/Button";
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';

import Snackbar from '@material-ui/core/Snackbar';

import { getFromLS, saveToLS } from "../components/LocalStorage/LocalStorage";

//Settings
const styles = (theme) => ({
	root: {
		flexGrow: 1,
		margin: '60px auto 10px',
		padding: '15px',
		width: '90%',
	},
	demo: {
		height: 215,
		width: 300,
	},
	title: {},
	control: {
		padding: theme.spacing(2),
	},
});


class Flows extends Component {
	constructor() {
		super();
		this.state = {
			savedsnack: getFromLS("savedsnack") || false,
		};
		this.isCurrentlyMounted = false;
	}

	render() {
		const spacing = 2;
		const { classes } = this.props;
		let { trimmedDataURL } = this.state;
		
		const flowItems = [
			{ title: 'Issues', 
				icon: <AssignmentLateIcon style={{height: '50%', width: '50%'}} />,
				desc: 'Issues identified during an assignment that need resolving',
				link: 'assignment/checklist',
			},
			{ title: 'My Assignments', 
				icon: <AssignmentIndIcon style={{height: '50%', width: '50%'}} />,
				desc: 'List tasks that you can complete',
				link: 'assignment/mine',
			},
			{ title: 'Assignments Not Done', 
				icon: <AssignmentIcon style={{height: '50%', width: '50%'}} />,
				desc: 'List all assignments uncompleted and in schedule',
				link: 'assignment/checklist',
			},
			{ title: 'Assignment Checkup', 
				icon: <AssignmentTurnedInIcon style={{height: '50%', width: '50%'}} />,
				desc: 'Check sign-off and signature',
				link: 'assignment/checklist',
			},
		];
		
		return (
    <Grid container className={classes.root} spacing={spacing}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {flowItems.map((value, index) => (
            <Grid key={value.title} item>
              <Card className={classes.demo} justify="center">
                <CardContent>
                <CardHeader disableTypography="true" style={{padding: 0,}} title={
                	<Typography gutterBottom variant="h6" component="h2">
                		{value.title}
                	</Typography>} 
                />
                  <Tooltip title={value.desc}>
	           <Button fullWidth='true' aria-label="delete" 
	           		size='large' style={{ height: '80%', }}
	           		onClick={ ()=>{window.location = (value.link); } }
	            >
		    {value.icon}
                   </Button>
                   </Tooltip>
              	 </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
      
       <Snackbar
        severity="success"
	anchorOrigin={{ vertical: 'bottom', horizontal: 'center'  }}
        open={this.state.savedsnack}
        autoHideDuration={6000}
        onClose={ () => { saveToLS("savedsnack", false); this.setState({savedsnack: false}) }}
        message="Checklist Saved"
        action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={ () => { saveToLS("savedsnack", false); this.setState({savedsnack: false}) } }   >
              <CloseIcon fontSize="small" />
            </IconButton>
        }
      />
    </Grid>
		)
	}
}


export default withStyles(styles)(Flows); //'Higher-order component' method of injecting MaterialUI themeing.     
// My Jobs
// * All
// * Active
// * Scheduled
// My Assignments
// * Air Traffic Control
// * Emergancy Changes
// * Issues Logbook
// * Logbook Adhoc
// Assignments Not Done
//  ( Team issues, check on others )
// Assignments Checkup
//  ( Show when check was done and by who )
