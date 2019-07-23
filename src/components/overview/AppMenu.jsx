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
import * as UserActions from '../../actions/user';
import * as UserSelectors from '../../selectors/user';
import styles from './AppMenu.style';

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
    const { history, clearUserSuccessfullyRegisteredStatus } = this.props;

    clearUserSuccessfullyRegisteredStatus();
    history.push('/registration');
  };

  handleLogout = () => {
    const { logoutUser, history } = this.props;

    logoutUser(history);
    this.setState({ anchorEl: null });
  };

  handleOpenAdminPanel = () => {
    const { history } = this.props;

    history.push('/admin');
    this.setState({ anchorEl: null });
  };

  getUserProfile = () => {
    const { currentUserProfile } = this.props;
    let profileTitle = window.localStorage.getItem('usernameOrEmail');

    if (currentUserProfile.name && currentUserProfile.lastName) {
      profileTitle = `${currentUserProfile.name} ${currentUserProfile.lastName}`;
    }
    return profileTitle;
  };

  isUserAdmin = () => window.localStorage.getItem('isAdmin');

  isUserLogged = () => window.localStorage.getItem('accessToken');

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const showAdminButton = this.isUserLogged() && Boolean(this.isUserAdmin());

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={styles.menu}
        transformOrigin={styles.menu}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem
          className={classes.userProfileMenuItem}
          disabled
        >
          {this.getUserProfile()}
        </MenuItem>
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
              {this.isUserLogged()
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
              { showAdminButton && (
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
  currentUserProfile: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}),
  logoutUser: PropTypes.func,
  clearUserSuccessfullyRegisteredStatus: PropTypes.func,
};

AppMenu.defaultProps = {
  classes: {},
  history: {},
  logoutUser: () => {},
  clearUserSuccessfullyRegisteredStatus: () => {},
};

const mapDispatchToProps = dispatch => ({
  logoutUser: history => dispatch(UserActions.logout(history)),
  clearUserSuccessfullyRegisteredStatus: () => dispatch(UserActions.setUserSuccessfullyRegisteredStatus(false)),
});

const mapStateToProps = state => ({
  currentUserProfile: UserSelectors.getCurrentUserProfile(state),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(AppMenu)));
