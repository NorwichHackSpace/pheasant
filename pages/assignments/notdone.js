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
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined'
import UndoOutlinedIcon from '@material-ui/icons/UndoOutlined';

//Components
import {
	Paper, Typography, Link, 
	Table, TableHead, TableRow, TableCell, TableBody,
	Button, Divider, Avatar, Checkbox, Tooltip,
	List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText,
	Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
	Accordion, AccordionSummary, AccordionDetails, FormControlLabel
} from "@material-ui/core";

import Checklist from "components/Assignments/Checklist";

//Third Party
import { getFromLS, saveToLS } from "components/LocalStorage/LocalStorage";

//Settings
import styles from "components/Assignments/styles";
import checklistsObj from "components/Assignments/checksdb";

class MyAssignments extends Component {
	defaultTitle = 'Assignments Not Done';
	constructor() {
		super();
		this.state = {
			checkList: 0,
			listDisplay: false,
			title: this.defaultTitle,
			sheets: [],
		};
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
	
	render() {
		const { classes } = this.props;

	return (  
	   <Paper className={classes.root} elevation={3}  > 
	   <div style={{display:'flex'}} >
		   <Typography type="title" className={classes.title} variant="h4" component="h1" >{this.state.title}
		   </Typography>
		{this.state.listDisplay    
		?  <Button edge="end" aria-label="delete"  onClick={ () => { this.setState({ listDisplay: false, title: this.defaultTitle, }) } }  >
			   <Tooltip title={"Cancel current assignment" }>
			         <UndoOutlinedIcon />
			   </Tooltip>
		   </Button>
		: null
		}
	</div>
	   
	   	{this.state.listDisplay 
	   	? <Checklist classes={classes} checklist={this.state.checkList} title={this.state.title} />	
	   	:
		<>
	   	<Table className={classes.table} >
				<TableHead>
				  <TableRow>
				    <TableCell>Checklist</TableCell>
				    <TableCell align="right">Type</TableCell>
				    <TableCell align="right"></TableCell>
				  </TableRow>
				</TableHead>
				<TableBody>
	   
		   { checklistsObj.map((check, index) => {
			if ( this.state.sheets.some( element => element.title == check.desc )) { return }   		
			return (
				    <TableRow key={'checklist-index-'+index}>
				      <TableCell component="th" scope="row">
					<Link color='secondary' href='#' onClick={ () => { this.setState({title: check.desc, checkList: index, listDisplay: true, }) ; } }>
						{check.desc}	
					</Link>
				      </TableCell>
				      <TableCell align="right">Adhoc</TableCell>
				      <TableCell align="right">
						<Link color='secondary' href='#' onClick={ () => { this.setState({title: check.desc, checkList: index, listDisplay: true, }) ; } }>
							<MenuBookIcon />			
						</Link>				      
				      </TableCell>
				    </TableRow>
			)
		   })}
		   </TableBody>
	      </Table> 
	      </>
	     }
	   </Paper>
	 )

	} //End render

}



export default withStyles(styles)(MyAssignments); //'Higher-order component' method of injecting MaterialUI themeing.     
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
