import React from "react";
import PropTypes from "prop-types";
import {
  SwipeableDrawer,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Hidden,
  Divider,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import Link from "next/link";
//Styling
import pages from "./pages";
import useStyles from "./styles";
//Icons
import CloseIcon from "@material-ui/icons/Close";

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

/*  */
function Sidebar(props) {
  const { open, variant, onClose } = props;
  const classes = useStyles();
  return (
    <SwipeableDrawer
      disableBackdropTransition={!iOS} disableDiscovery={iOS}
      anchor="left"
      classes={{ paper: classes.drawer }}
      open={open}
      onOpen={onClose}
      onClose={onClose}
      variant={variant}
    >
      <section className={classes.root}>
       <Typography gutterBottom variant="h5" component="h2" >
		PHEASANT
	 <Hidden mdUp>
          <IconButton
            className={classes.menuButton}
            aria-label="Menu"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </Hidden>
	</Typography>
	<Divider />
        <List component="div" disablePadding>
          {pages.map((page, index) => (
            <Link href={page.href} key={index}
            >
              <ListItem
                key={page.title}
                activeclassname={classes.activeListItem}
                className={classes.listItem}
                onClick={onClose}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  {page.icon}
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary={page.title}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </section>
    </SwipeableDrawer>
  );
}
Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
