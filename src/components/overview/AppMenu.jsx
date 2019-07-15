/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography, withStyles,
} from '@material-ui/core';
import {
  AccountCircle, PowerSettingsNew as LogIcon, Settings, Star,
} from '@material-ui/icons';
import InfoSnackbar from '../commons/info-snackbar/InfoSnackbar';
import Logo from '../../images/logo.png';
import styles from './AppMenu.style';
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

  handleOpenProfile = () => {
    const { history } = this.props;
    history.push('/profile');
  };

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
    const { classes } = this.props;
    const isUserLogged = window.localStorage.getItem('accessToken');
    const isMenuOpen = Boolean(anchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={styles.menu}
        transformOrigin={styles.menu}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleOpenProfile}>Profile</MenuItem>
        <MenuItem onClick={this.handleLogout}>
          {'Logout'}
          <LogIcon className={classes.icon} />
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
              {isUserLogged
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
              {isUserLogged && (
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
  history: PropTypes.shape({}),
  logoutUser: PropTypes.func,
};

AppMenu.defaultProps = {
  classes: {},
  history: {},
  logoutUser: () => {},
};

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logout()),
});

export default withStyles(styles)(connect(null, mapDispatchToProps)(withRouter(AppMenu)));
