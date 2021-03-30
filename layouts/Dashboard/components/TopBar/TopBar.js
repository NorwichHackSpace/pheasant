import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Badge, Toolbar, IconButton, AppBar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { getFromLS, saveToLS } from "../../../../components/LocalStorage/LocalStorage"

// Component styles
import ResponsiveLocalStorageLayout from "../../../../components/ResponsiveGrid/ResponsiveGrid";
import useStyles from "./styles";
import ThemeToggler from "../../../../components/ThemeToggler/ThemeToggler";

function useHasMounted() { //Hook for hydration
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => { setHasMounted(true); }, []);
  return hasMounted;
}

function Topbar(props) {
  const hasMounted = useHasMounted();
  const { className, children, openSidebar, onToggleSidebar } = props;
  const classes = useStyles(props);
  const [notifications] = useState([
    { message: "A Message", status: "success" },
  ]);
  
  //Fake user login
  const [user, setUser] = useState( getFromLS("userIn") || false );
  function UserStatus() { 
	if (!user) { return (<InputIcon />) }
	return (<PersonOutlineIcon />)
  };
  function fakeLogin(){
	saveToLS("userIn", !user);
	setUser(!user); //Hook	
  }
  
  //Fake bell login
  const [bellRinging, setBell] = useState( getFromLS("bellRinging") || true );
  function fakeBell(){
	saveToLS("bellRinging", !bellRinging);
	setBell(!bellRinging); //Hook	
  }
  
  return (
    <AppBar className={clsx(classes.root, className)}>
      <Toolbar className={classes.toolbar}>

        <IconButton
            className={classes.menuButton}
            aria-label="Menu"
            onClick={onToggleSidebar}
          >
            {openSidebar ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        <div className={classes.brandWrapper}>
         <div className={classes.logo}></div>
        </div>
       
     	<ThemeToggler className={classes.themeToggler} / >
        
        <IconButton className={classes.notificationsButton}>
          <Badge
            badgeContent={notifications.length}
            color="secondary"
            variant="dot"
            invisible={ bellRinging ? false : true }
            onClick={fakeBell}
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <IconButton className={classes.signInButton}
          onClick={fakeLogin}
        >          
         <UserStatus />
        </IconButton>	
      </Toolbar>
      {children}
    </AppBar>
  );
}

Topbar.propTypes = {
  className: PropTypes.string,
  onToggleSidebar: PropTypes.func,
  openSidebar: PropTypes.bool,
  children: PropTypes.node,
};

export default Topbar;
