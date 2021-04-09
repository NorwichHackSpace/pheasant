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
import { getFromLS, saveToLS } from "components/LocalStorage/LocalStorage";

//Settings
import styles from "./styles";
import checklistsObj from "./checksdb";

function handleIssues(sheetObj) {
	console.log("Handling Issues");
	let sheets = getFromLS("savedSheets") || []; //Array
	if ( Array.isArray(sheets) && sheets.push(sheetObj) ) {
		saveToLS("savedSheets", sheets);
		saveToLS("savedsnack", true);
		window.location.replace("/assignments");
	} else { //Error
		console.error("Unable to save completed checklist to an locally stored array.");
		saveToLS("savedSheets", []);
	}
}

function handleCompletion(sheetObj) {
	console.log("Handling Completion:", sheetObj);
	//sheetObj.type; //String
	//sheetObj.checked; //Array
	//sheetObj.signature; //Base65
	//sheetObj.timeStamp; //Epoch
	let sheets = getFromLS("savedSheets") || []; //Array
	if ( Array.isArray(sheets) && sheets.push(sheetObj) ) {
		saveToLS("savedSheets", sheets);
		saveToLS("savedsnack", true);
		window.location.replace("/assignments");
	} else { //Error
		console.error("Unable to save completed checklist to an locally stored array.");
		saveToLS("savedSheets", []);
	}
}

class Checklist extends Component {

	//For hydration before props we need a blankCheck
	blankCheck = 
	{ 'title': '', 
	  'desc': '', 
	  'checks': [ 
	  	{ title: '', 
	  	  desc: '' 
	  	}, 
	  ]};

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
	
	issues = () => {
		console.log("Found issues");
		this.sheetObj = { //Parse state to Obj before passing to localised function
			title: this.props.title, //String
			checked: this.state.checked, //Array
			signature: this.state.trimmedDataURL, //Image already converted to Base64
			timeStamp: Date.now(), //Epoch
		};
		this.setState({issueDialog: true}); //Pop-up the 'are you sure'
	}
	
	successful = () => {
		console.log("Checklist successful");
		let sheetObj = { //Parse state to Obj before passing to localised function
			title: this.props.title, //String
			checked: this.state.checked, //Array
			signature: this.state.trimmedDataURL, //Image already converted to Base64
			timeStamp: Date.now(), //Epoch
		};
		handleCompletion(sheetObj);
	}
	
	render() {
		const { classes } = this.props;
		let { trimmedDataURL } = this.state;	
		const checkList = checklistsObj[this.props.checklist] || this.blankCheck;
	
		return (
    <>
     <List dense >
      {checkList.checks.map((checkItem, index) => {
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
         ? ( this.state.checked.length !== checkList.checks.length ) ?  	  
		 /*  ISSUES CALLED HERE  */
         		   <Button size='medium' onClick={this.issues} >
				  Sign with Issues
			   </Button>
		 /*  SUCCESS CALLED HERE */			   
	   	  :        <Button size='medium' onClick={this.successful} >
				  Sign as Successful
			   </Button>
         : <Button size='medium' disabled>
		  No Signature
	   </Button>
        }
        
       	     <Dialog
			open={this.state.issueDialog}
			onClose={ () => { this.setState({issueDialog: false}) } }
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
			  <Button onClick={ () => { this.setState({issueDialog: false}) } } color="primary">
			    Resume Check
			  </Button>  
			  <Button onClick={ () => { handleIssues(this.sheetObj) } } color="primary" autoFocus>
			    Raise Issues
			  </Button> 
			</DialogActions>
		      </Dialog>
		      
    </div>
    </>
	)
	}
}

export default withStyles(styles)(Checklist); //'Higher-order component' method of injecting MaterialUI themeing.     
