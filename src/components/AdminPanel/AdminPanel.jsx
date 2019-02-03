import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/AddBox';
import ExitIcon from '@material-ui/icons/ExitToApp';
import ViewList from '@material-ui/icons/ViewList';
import IconButton from '@material-ui/core/es/IconButton/IconButton';
import { withRouter } from 'react-router-dom';
import AddItem from './AddItem.jsx';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#f5f5f5',
    color: '#000000',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

class AdminPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentOpenContent: 'addItem',
    };
  }

    handleBackToApp = () => {
      const { history } = this.props;
      history.push('/');
    };

    handleOpenContent = (value) => {
      this.setState({ currentOpenContent: value });
    };

    getContent = () => {
      const { currentOpenContent } = this.state;
      if (currentOpenContent === 'addItem') {
        return <AddItem/>;
      } if (currentOpenContent === 'showAllItems') {
        return <Typography> List of items </Typography>;
      }
      return <Typography>Welcome to Admin Panel</Typography>;
    };

    render() {
      const { classes } = this.props;

      return (
       <div className={classes.root}>
           <CssBaseline />
           <AppBar position="fixed" className={classes.appBar}>
               <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                   <Typography variant="h6" color="inherit" noWrap >
                       Admin Panel
                   </Typography>
                   <IconButton
                       onClick={this.handleBackToApp}
                       color="inherit"
                   >
                       <ExitIcon/>
                   </IconButton>
               </Toolbar>
           </AppBar>
           <Drawer
               className={classes.drawer}
               variant="permanent"
               classes={{ paper: classes.drawerPaper }}
           >
               <div className={classes.toolbar} />
               <List>
                       <ListItem button onClick={() => this.handleOpenContent('addItem')}>
                           <ListItemText primary={'Add new item'} />
                           <ListItemIcon>
                               <AddIcon />
                           </ListItemIcon>
                       </ListItem>
                   <ListItem button disabled onClick={() => this.handleOpenContent('showAllItems')}>
                       <ListItemText primary={'Show all items'} />
                       <ListItemIcon>
                           <ViewList />
                       </ListItemIcon>
                   </ListItem>
               </List>
           </Drawer>
           <main className={classes.content}>
               <div className={classes.toolbar} />
                   {this.getContent()}
           </main>
       </div>
      );
    }
}

AdminPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(withRouter(AdminPanel));
