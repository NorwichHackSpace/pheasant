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

//Components
import Paper from '@material-ui/core/Paper';

import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';
import Avatar from "@material-ui/core/Avatar";
import Checkbox from '@material-ui/core/Checkbox';

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

//Third Party
import SignaturePad from 'react-signature-canvas'; // https://github.com/agilgur5/react-signature-canvas/tree/cra-example/


//Settings
const styles = (theme) => ({
	///////

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

	///////
	root: {
		margin: '60px auto 10px',
		padding: '15px',
		width: '80%',
	},
	demo: {},
	title: {},
});

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
		console.log("MOUNTED");
	}

	componentWillUnmount() {
		this.isCurrentlyMounted = false;
		console.log("UN-MOUNTED");
	}

   handleToggle = (value) => {
    if (!this.isCurrentlyMounted) {
    	console.log("RETURNED");
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
    this.setState({checked: newChecked,});
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
    <h1>Pre-Flight Checklist</h1>
    
    
     <List dense className={classes.root}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem key={value} button>
            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                /* onChange={this.handleToggle(value)} */
                /* checked={this.state.checked.indexOf(value) !== -1} */
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
    
    
    <div className={classes.signature}>
      <h2>Sign your assignment!</h2>
      <div className={classes.signcanvas}>
        <SignaturePad canvasProps={{className: classes.sigPad}}
         		ref={(ref) => { this.sigPad = ref }} /> 
      </div>
      <div>
        <Button onClick={this.clear}>
          Clear
        </Button> {' '}
        <Button onClick={this.trim}>
          Save
        </Button>
      </div>
      {trimmedDataURL
        ? <img src={trimmedDataURL} className={classes.sigImage} />
        : null}
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
