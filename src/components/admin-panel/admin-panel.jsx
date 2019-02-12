import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Drawer, AppBar, CssBaseline, Toolbar, List, Typography,
  ListItem, ListItemIcon, ListItemText, IconButton, withStyles,
} from '@material-ui/core';
import { AddBox as AddIcon, ExitToApp as ExitIcon, ViewList } from '@material-ui/icons';
import AddItem from './add-item.jsx';
import styles from './admin-panel.style';


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
               <Toolbar className={classes.adminPanelToolbar}>
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
  history: PropTypes.object.isRequired,
};


export default withStyles(styles)(withRouter(AdminPanel));
