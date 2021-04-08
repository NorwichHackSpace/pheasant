import React, {
	Component, 
	} from "react";
import {
	withStyles
} from "@material-ui/core/styles";

//Icons
import IconButton from "@material-ui/core/IconButton";
import FolderIcon from "@material-ui/icons/Folder";
import GetAppIcon from "@material-ui/icons/GetApp";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuBookIcon from '@material-ui/icons/MenuBook';

//Components
import {
	Paper, Typography, Link,
	Button, Divider, Avatar, Checkbox,
	List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText,
	Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
	Accordion, AccordionSummary, AccordionDetails, FormControlLabel
	} from "@material-ui/core";

//Third Party
import SignaturePad from 'react-signature-canvas'; // https://github.com/agilgur5/react-signature-canvas/tree/cra-example/
import { getFromLS, saveToLS } from "../../components/LocalStorage/LocalStorage";

//Settings

const styles = (theme) => ({

	signature: {
		'text-align': 'center',
		top: '10%',
		left: '10%',
	},

	signcanvas: {
		width: '80%',
		'max-height': '100px',
		aspectRatio: 6 / 2,
		margin: '0 auto 20px',
		'background-color': '#fff',
		border: '1px solid grey',
	},

	sigPad: {
		width: '100%',
		height: '100%',
	},

	sigImage: {
		'background-size': '40% auto',
		width: '200px',
		aspectRatio: 6 / 2,
		'background-color': '#fff',
		margin: '20px',
	},
	
	checkitems: {
		width: '100%',
		border: '1px solid grey',
		'background-color': theme.palette.background.default,
		padding: '0 15px',
	},

	root: {
		margin: '40px auto 15px',
		padding: '0 0 15px 0',
		width: '90%',

	},
	title: { 
		'padding': '15px 25px 0', 
	},
});

const exampleChecklist = [
	{
		title: 'Screenwash',
		desc: 'The screenwash is topped up.',
		resources: [ 
			{ desc: 'Screenwash Guide' , link: 'screenwash' }, 
			{ desc: 'Bug Removal' , link: 'debugging' }, 
		],
	},
	{
		title: 'Fuel',
		desc: 'Fuel gauge shows at least half a tank.',
		resources: [ 
			{ desc: 'Selecting the correct fuel grade' , link: 'fuelgrades' }, 
			{ desc: 'Dealing with a mis-fueling' , link: 'misfuel' },
		],
	},
	{
		title: 'Oil',
		desc: 'Remove oil dip stick. Wipe with cloth. Insert, remove, and check level is between min and max'
	},
	{
		title: 'Fluffy Dice',
		desc: 'Fluffy dice are displayed in windscreen.'
	},
	{
		title: 'Tires',
		desc: 'Inspect tires. If Helicopter has them you have the wrong vehicle.'
	},
];

function handleIssues() {
	console.log("Handling Issues");
}

function handleCompletion() {
	console.log("Handling Completion");
	saveToLS("savedsnack", true);
	window.location.replace("/assignment");
}

class Flows extends Component {
	constructor() {
		super();
		this.state = {
			checked: [],
			issueDialog: false,
		};
		this.isCurrentlyMounted = false;
	}

	componentDidMount() {
		this.isCurrentlyMounted = true;
	}

	componentWillUnmount() {
		this.isCurrentlyMounted = false;
	}

	handleToggle = (value) => {
		if (!this.isCurrentlyMounted) {
			return;
		}
		const currentIndex = this.state.checked.indexOf(value);
		const newChecked = [...this.state.checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}
		this.setState({
			checked: newChecked,
		});
	}

	state = {
		trimmedDataURL: null
	}
	
	sigPad = {}
	clear = () => {
		this.sigPad.clear()
	}
	
	trim = () => {
		this.setState({
			trimmedDataURL: this.sigPad.getTrimmedCanvas()
				.toDataURL('image/png')
		})
	}
	
/////////	

	issues = () => {
		console.log("Found issues");
		this.setState({issueDialog: true});
	}
	
	successful = () => {
		console.log("Checklist successful");
		handleCompletion();
	}
	
/////////	

	render() {
		const {
			classes
		} = this.props;
		let {
			trimmedDataURL
		} = this.state;	
		return (
   <Paper className={classes.root} eveation={3}  >
    <h1 className={classes.title}>Pre-Flight Checklist</h1>
     <List dense >
      {exampleChecklist.map((checkItem, index) => {
        const labelId = `checkbox-list-${checkItem.title}`;
        return (
          <ListItem key={labelId}  >
          
      <Accordion className={classes.checkitems} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={

              <Checkbox
                edge="start"
                onChange={() => this.handleToggle(index)} 
                checked={this.state.checked.indexOf(index) !== -1}
              />

            }
            label={checkItem.title} 
          />
        </AccordionSummary>
        <AccordionDetails style={{ 'display': "block", }} >
          <Typography variant="body1"  >
		{checkItem.desc} 
	  </Typography>
		{ checkItem.resources
		   ? <>
		     <Divider style={{ 'margin': '10px', }} />
		     <Typography key={ 'resource-link'+index } variant="body2" >
		     <MenuBookIcon /> Related Resources: <br />
			     {checkItem.resources.map((resource, index) => {
			     return (
				     	<Link href='#' variant="body1" key={'resource-link'+index} 
				     	      color='secondary' style={{'padding-left': '40px'}}
				     	>
				     		{resource.desc}<br />
				     	</Link>
				     )
			     })}
		     </Typography>
		     </>
		   : null
		}
          
        </AccordionDetails>
      </Accordion>
            
          </ListItem>
        );
      })}
    </List>
    
    
    <div className={classes.signature}>
      <h2>Signature</h2>
      <div className={classes.signcanvas}>
       {trimmedDataURL
        ? <img src={trimmedDataURL} className={classes.sigImage} />
        : <SignaturePad canvasProps={{className: classes.sigPad}}
         		ref={(ref) => { this.sigPad = ref }} /> 
         }
      </div>
        {trimmedDataURL
         ? <div>
	           <Button onClick={ () => {this.setState({trimmedDataURL: null}) } } >Clear</Button> {' '}
	           <Button disabled>Save</Button>
           </div>
         : <div>
	         <Button onClick={this.clear}>Clear</Button> {' '}
        	   <Button onClick={this.trim}>Save</Button>
           </div>
        }
       <br />
       {trimmedDataURL
         ? ( this.state.checked.length !== exampleChecklist.length ) ?  	  
         		   <Button size='medium' onClick={this.issues} >
				  Sign with Issues
			   </Button>
	   	  :        <Button size='medium' onClick={this.successful} >
				  Sign as Successful
			   </Button>
         : <Button size='medium' disabled>
		  No Signature
	   </Button>
        }
        
       	     <Dialog
			open={this.state.issueDialog}
			onClose={handleCompletion}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		      >
			<DialogTitle id="alert-dialog-title">{"Save checklist with issues?"}</DialogTitle>
			<DialogContent>
			  <DialogContentText id="alert-dialog-description">
			    Saving a checklist with items unchecked will automaticly generate shared issues with those items.
			    Are you sure this is what you want to do?
			  </DialogContentText>
			</DialogContent>
			<DialogActions>
			  <Button onClick={ () => { this.setState({issueDialog: false}) }} color="primary">
			    Resume Check
			  </Button>
			  <Button onClick={handleIssues} color="primary" autoFocus>
			    Raise Issues
			  </Button>
			</DialogActions>
		      </Dialog>
		      
    </div>
    </Paper>)
	}
}

export default withStyles(styles)(Flows); //'Higher-order component' method of injecting MaterialUI themeing.     
// My Jobs
// * All
// * Active
// * Scheduled
// My Flows
// * Air Traffic Control
// * Emergancy Changes
// * Issues Logbook
// * Logbook Adhoc
// Flows Not Done
//  ( Team issues, check on others )
// Flows Checkup
//  ( Show when check was done and by who )
