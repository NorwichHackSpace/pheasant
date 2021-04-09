import React, {
	Component, 
	} from "react";
import {
	withStyles
} from "@material-ui/core/styles";

//Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';

//Components
import {
	Paper, Typography, Link, 
	Table, TableHead, TableRow, TableCell, TableBody,
	Button, Divider, Avatar, Checkbox, Tooltip,
	List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText,
	Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
	Accordion, AccordionSummary, AccordionDetails, FormControlLabel
	} from "@material-ui/core";

//Third Party
import { getFromLS, saveToLS } from "components/LocalStorage/LocalStorage";

//Settings
import styles from "components/Assignments/styles";
import checklistsObj from "components/Assignments/checksdb";

class MyAssignments extends Component {
	defaultTitle = 'Assignments Completed';
	constructor() {
		super();
		this.state = {
			checkList: 0,
			sigDisplay: false,
			title: this.defaultTitle,
			sheets: [],
		};
		this.signature = null;
		this.isCurrentlyMounted = false;
	}
	
	componentDidMount() {
		this.isCurrentlyMounted = true;
		this.setState({ 
			sheets: getFromLS("savedSheets") || [] 
		});
	}

	componentWillUnmount() {
		this.isCurrentlyMounted = false;
	}
	
	sigClose() {
		this.setState({ 
			sigDisplay: false 
		});
	};

	render() {
		const { classes } = this.props;


	return (  
	   <Paper className={classes.root} elevation={3}  > 
	   <div style={{display:'flex'}} >
		   <Typography type="title" className={classes.title} variant="h4" component="h1" >{this.state.title}
		   </Typography>
	</div>
	   
	   	{ (this.state.sheets.length == 0 )
	   	? 	<Typography style={{ 'padding' : '80px' }} variant="body1" component="body1" >
			   <Divider /><br />
			   <span style={{ 'padding' : '80px' }}>No checklists completed!</span>
		   </Typography>
	   	:
		<>
	   	<Table className={classes.table} >
				<TableHead>
				  <TableRow>
				    <TableCell>Checklist</TableCell>
				    <TableCell align="right">Time</TableCell>
				    <TableCell align="right"></TableCell>
				  </TableRow>
				</TableHead>
				<TableBody>
	   
		   { this.state.sheets.map((check, index) => {
			return (
				    <TableRow key={'checklist-index-'+index}>
				      <TableCell component="th" scope="row">
					<Link color='secondary' href='#' onClick={ () => { /* */; } } >
						{check.title}	
					</Link>
				      </TableCell>
				      <TableCell align="right">{ (new Date(check.timeStamp)).toLocaleString() }</TableCell>
				      <TableCell align="right">
						<Link color='secondary' href='#' onClick={ () => { this.signature = check.signature; this.setState({sigDisplay: true, }) } }  >
							<FindInPageOutlinedIcon />			
						</Link>				      
				      </TableCell>
				    </TableRow>
			)
		   })}
		   </TableBody>
	      </Table> 
	      </>
	     }
{/* Display of signature */}
	  <Dialog onClose={ () => { this.setState({sigDisplay: false, }) } } aria-labelledby="simple-dialog-title" open={ this.signature ? this.state.sigDisplay : false }
	  		  onClick={() => { this.setState({sigDisplay: false, }) } }
	  >
		<DialogTitle id="simple-dialog-title">Signature</DialogTitle>
		<img src={this.signature} style={{padding: '10px',}} />
	  </Dialog>
	   </Paper>
	 )

	} //End render

}

export default withStyles(styles)(MyAssignments);
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
