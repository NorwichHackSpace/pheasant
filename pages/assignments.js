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
import DeleteIcon from '@material-ui/icons/Delete';

//Components
import Grid from '@material-ui/core/Grid';

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from '@material-ui/core/CardHeader';

import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
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
	bigButton: {
		height: '50%', 
		width: '50%'
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
		
		const flowItems = [
			{ title: 'Issues', 
				icon: <AssignmentLateIcon className={classes.bigButton} />,
				desc: 'Issues identified during an assignment that need resolving',
				link: 'assignments/issues',
			},
			{ title: 'My Assignments', 
				icon: <AssignmentIndIcon className={classes.bigButton} />,
				desc: 'List tasks that you can complete',
				link: 'assignments/mine',
			},
			{ title: 'Assignments Not Done', 
				icon: <AssignmentIcon className={classes.bigButton} />,
				desc: 'List all assignments uncompleted and in schedule',
				link: 'assignments/notdone',
			},
			{ title: 'Assignment Checkup', 
				icon: <AssignmentTurnedInIcon className={classes.bigButton} />,
				desc: 'Check sign-off and signature',
				link: 'assignments/completed',
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
{/******* RESET ICON  BELOW *******/}
            <Grid key={'temp-reset-button'} item>
              <Card className={classes.demo} justify="center">
                <CardContent>
                <CardHeader disableTypography="true" style={{padding: 0,}} title={
                	<Typography gutterBottom variant="h6" component="h2">
                		Reset Demo Data
                	</Typography>} 
                />
                  <Tooltip title={'Reset Demo Data'}>
	           <Button fullWidth='true' aria-label="delete" 
	           		size='large' style={{ height: '80%', }}
	           		onClick={ ()=>{ saveToLS("savedSheets", []); } }
	            > 
		    		<DeleteIcon className={classes.bigButton} />
                   </Button>
                   </Tooltip>
              	 </CardContent>
              </Card>
            </Grid>
{/******* RESET ICON  ABOVE **********/}
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
// * Scheduled (Tasks that generate depending on time of last check)
// * Adhoc (Specific to job role, done as a routine)
// * All (Everything assigned to you, even if not required to be done)
// My Assignments (List tasks you can complete)
// * Raise Suggestions (For reporting common problems or ideas)
// * Issues Logbook (For reporting any faults found)
// * Logbook Adhoc (Logging sitewide checks that are done as needed)
// Assignments Not Done
//  ( Team issues, check on others )
// Assignments Checkup
//  ( Show when check was done and by who )
