import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  root: {
    minHeight: "98vh",
    background: theme.palette.background.default,
    color: theme.palette.contrastText,
    margin: theme.spacing(0),
  },
  content: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(10),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  },
  contentShift: {
    marginLeft: '270px'
  },
  [theme.breakpoints.down('sm')]: {
    content: {
      padding: 0,
      paddingTop: theme.spacing(5)
    }
  }
}));
