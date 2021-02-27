import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";

import Link from "next/link";

function ListItemLink(props) {
  const { icon, primary, to } = props;

  return (
    <li>
      <ListItem button>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

const useStyles = makeStyles({
  root: {
    width: 360,
  },
});

export default function MenuList() {
  const classes = useStyles();

  return (
    <Paper elevation={0}>
      <List aria-label="main mailbox folders">
        <ListItemLink to="/inbox" primary="Inbox" icon={<InboxIcon />} />
        <ListItemLink to="/drafts" primary="Drafts" icon={<DraftsIcon />} />
      </List>
      <Divider />
      <List aria-label="secondary mailbox folders">
        <ListItemLink to="/trash" primary="Trash" />
        <ListItemLink to="/spam" primary="Spam" />
      </List>
    </Paper>
  );
}
