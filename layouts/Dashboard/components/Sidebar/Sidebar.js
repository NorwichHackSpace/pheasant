import React from "react";
import PropTypes from "prop-types";
import {
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


function Sidebar(props) {
  const { open, variant, onClose } = props;
  const classes = useStyles();
  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      open={open}
      onClose={onClose}
      variant={variant}
    >
      <section className={classes.root}>
        <Hidden mdUp>
          <IconButton
            className={classes.menuButton}
            aria-label="Menu"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </Hidden>

        <List component="div" disablePadding>
          {pages.map((page, index) => (
            <Link href={page.href} key={index}>
              <ListItem
                key={page.title}
                activeclassname={classes.activeListItem}
                className={classes.listItem}
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
    </Drawer>
  );
}
Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
