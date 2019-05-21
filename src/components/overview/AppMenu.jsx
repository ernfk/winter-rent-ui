/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  AppBar, IconButton, Menu, MenuItem, Toolbar, Typography, withStyles,
} from '@material-ui/core';
import { AccountCircle, Settings } from '@material-ui/icons';
import Logo from '../../images/logo.png';
import styles from './AppMenu.style';
import { getCurrentUsernameOrEmail } from '../../selectors/user';

class AppMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

   handleProfileMenuOpen = event => this.setState({ anchorEl: event.currentTarget });

   handleMenuClose = () => this.setState({ anchorEl: null });

   handleLog = () => {
     const { history, currentUsernameOrEmail } = this.props;

     currentUsernameOrEmail ? console.warn('logout') : history.push('/login');
     this.setState({ anchorEl: null });
   };

   handleOpenAdminPanel = () => {
     const { history } = this.props;

     history.push('/admin');
     this.setState({ anchorEl: null });
   };

   render() {
     const { anchorEl } = this.state;
     const { classes, currentUsernameOrEmail } = this.props;
     const isMenuOpen = Boolean(anchorEl);

     const renderMenu = (
       <Menu
         anchorEl={anchorEl}
         anchorOrigin={styles.menu}
         transformOrigin={styles.menu}
         open={isMenuOpen}
         onClose={this.handleMenuClose}
       >
         <MenuItem onClick={this.handleLog}>{currentUsernameOrEmail ? 'Logout' : 'Login'}</MenuItem>
         <MenuItem onClick={this.handleMenuClose} disabled>Profile</MenuItem>
       </Menu>
     );

     return (
       <div className={classes.root}>
         <AppBar position="static" color="default">
           <Toolbar style={styles.toolbar}>
             <div style={styles.logoContainer}>
               <img src={Logo} style={styles.logo} />
               <Typography variant="h6" color="inherit" style={styles.appBarHeader}>
                 {'Winter rent'}
               </Typography>
             </div>
             <div>
               <IconButton
                 aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                 aria-haspopup="true"
                 onClick={this.handleProfileMenuOpen}
                 color="inherit"
               >
                 <AccountCircle />
               </IconButton>
               <IconButton
                 aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                 aria-haspopup="true"
                 onClick={this.handleOpenAdminPanel}
                 color="inherit"
               >
                 <Settings />
               </IconButton>
             </div>
           </Toolbar>
         </AppBar>
         {renderMenu}
       </div>
     );
   }
}

AppMenu.propTypes = {
  classes: PropTypes.shape({}),
  currentUsernameOrEmail: PropTypes.string,
  history: PropTypes.shape({}),
};

AppMenu.defaultProps = {
  classes: {},
  currentUsernameOrEmail: '',
  history: {},
};

const mapStateToProps = state => ({
  currentUsernameOrEmail: getCurrentUsernameOrEmail(state),
});

const mapDispatchToProps = dispatch => ({

});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(AppMenu)));
