/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  withStyles,
  Button,
} from '@material-ui/core';
import { AccountCircle, Settings, PowerSettingsNew as LogIcon, Star } from '@material-ui/icons';
import InfoSnackbar from '../commons/info-snackbar/InfoSnackbar';
import Logo from '../../images/logo.png';
import styles from './AppMenu.style';
import { getCurrentUsernameOrEmail } from '../../selectors/user';
import { logout } from '../../actions/user';

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
     const { history } = this.props;
     history.push('/login');
   };

    handleRegister = () => {
      const { history } = this.props;
      history.push('/registration');
    };

   handleLogout = () => {
     const { logoutUser } = this.props;
     logoutUser();
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
         <MenuItem onClick={this.handleMenuClose} disabled>Profile</MenuItem>
         <MenuItem onClick={this.handleLogout}>
           {'Logout'}
           <LogIcon className={classes.loginIcon} />
         </MenuItem>
       </Menu>
     );

     return (
       <div className={classes.root}>
         <AppBar position="static" color="default">
           <Toolbar style={styles.toolbar}>
             <div style={styles.logoContainer}>
               <img src={Logo} style={styles.logo} alt="logo" />
               <Typography variant="h6" color="inherit" style={styles.appBarHeader}>
                 {'Winter rent'}
               </Typography>
             </div>
             <div>
               {currentUsernameOrEmail
                 ? (
                   <IconButton
                     aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                     aria-haspopup="true"
                     onClick={this.handleProfileMenuOpen}
                     color="inherit"
                   >
                     <AccountCircle />
                   </IconButton>
                 )
                 : (
                   <div>
                     <Button onClick={this.handleLog}>
                       {'Login'}
                       <LogIcon className={classes.icon} />
                     </Button>
                     <Button onClick={this.handleRegister}>
                       {'Register'}
                       <Star className={classes.icon} />
                     </Button>
                   </div>
                 ) }
               {currentUsernameOrEmail && (
               <IconButton
                 aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                 aria-haspopup="true"
                 onClick={this.handleOpenAdminPanel}
                 color="inherit"
               >
                 <Settings />
               </IconButton>
               )}
             </div>
           </Toolbar>
         </AppBar>
         {renderMenu}
         <InfoSnackbar />
       </div>
     );
   }
}

AppMenu.propTypes = {
  classes: PropTypes.shape({}),
  currentUsernameOrEmail: PropTypes.string,
  history: PropTypes.shape({}),
  logoutUser: PropTypes.func,
};

AppMenu.defaultProps = {
  classes: {},
  currentUsernameOrEmail: '',
  history: {},
  logoutUser: () => {},
};

const mapStateToProps = state => ({
  currentUsernameOrEmail: getCurrentUsernameOrEmail(state),
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logout()),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(AppMenu)));
