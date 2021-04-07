import React, {
	Component
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
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';
import Avatar from "@material-ui/core/Avatar";
import Checkbox from '@material-ui/core/Checkbox';

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';

//Third Party
import SignaturePad from 'react-signature-canvas'; // https://github.com/agilgur5/react-signature-canvas/tree/cra-example/


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
		'padding' : '15px 25px 0', 
	},
});

const exampleChecklist = [{
		title: 'Screenwash',
		desc: 'The screenwash is topped up.',
		resources: 'Screenwash Guide',
	},
	{
		title: 'Fuel',
		desc: 'Fuel gauge shows at least half a tank.'
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

class Flows extends Component {
	constructor() {
		super();
		this.state = {
			checked: [],
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
		console.log("SET ", newChecked);
		console.log("LENGTH ", exampleChecklist.length );
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
        <AccordionDetails>
          <Typography color="textSecondary">
		{checkItem.desc} <br />
		<MenuBookIcon /> Related Resources: Foo Manual Link , Bar Link
          </Typography>
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
         		   <Button size='medium' onClick={console.log("Saved")} >
				  Sign with Issues
			   </Button>
	   	  :        <Button size='medium' onClick={console.log("Saved")} >
				  Sign as Successful
			   </Button>
         : <Button size='medium' disabled>
		  No Signature
	   </Button>
        }
    </div>
    </Paper>)
	}
}

export default withStyles(styles)(Flows); //'Higher-order component' method of injecting MaterialUI themeing.     // My Jobs
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
