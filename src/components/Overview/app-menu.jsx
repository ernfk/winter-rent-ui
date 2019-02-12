/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, withStyles,
} from '@material-ui/core';
import { AccountCircle, Settings } from '@material-ui/icons';
import Logo from '../../images/logo.png';
import styles from './app-menu.style';


class AppMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

   handleProfileMenuOpen = event => this.setState({ anchorEl: event.currentTarget });

   handleMenuClose = () => this.setState({ anchorEl: null });

   handleOpenAdminPanel = () => {
     const { history } = this.props;
     history.push('/admin');
   };

   render() {
     const { anchorEl } = this.state;
     const { classes } = this.props;
     const isMenuOpen = Boolean(anchorEl);

     const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={styles.menu}
                transformOrigin={styles.menu}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleMenuClose}>Logout</MenuItem>
            </Menu>
     );

     return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Toolbar style={styles.toolbar}>
                        <div style={styles.logoContainer}>
                            <img src={Logo} style={styles.logo}/>
                            <Typography variant="h6" color="inherit" style={styles.appBarHeader}>
                                Winter rent
                            </Typography>
                        </div>
                        <div>
                            <IconButton
                                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                                disabled
                            >
                                <AccountCircle/>
                            </IconButton>
                            <IconButton
                                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleOpenAdminPanel}
                                color="inherit"
                            >
                                <Settings/>
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
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(AppMenu));
