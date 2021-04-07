import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  drawer: {
    borderRight: 0,
    zIndex: 1200,
    width: 271,
    top: 0
  }, 
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  menuButton: {
    position: 'absolute',
    top: 0,
    right: 5
  },
  profile: {
    marginBottom: theme.spacing(5)
  },

  listItem: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      borderLeft: `4px solid ${theme.palette.primary.main}`,
      borderRadius: '4px',
      '& $listItemIcon': {
        marginLeft: '-4px'
      }
    },
    '& + &': {
      marginTop: theme.spacing(1)
    }
  },
  activeListItem: {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    borderRadius: '4px',
    backgroundColor: theme.palette.secondary.main,
    '& $listItemText': {
      color: theme.palette.contrastText
    },
    '& $listItemIcon': {
      marginLeft: '-4px'
    }
  },
  listItemIcon: {
    marginRight: 0
  },
  listItemText: {
    fontWeight: 500,
    color: theme.palette.contrastText
  },

  [theme.breakpoints.down('sm')]: {
    root: { 
    	float: 'left',
    },
    drawer: { width: '80%' },
  }
}));
