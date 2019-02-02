/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/es/IconButton/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Settings from '@material-ui/icons/Settings';
import Menu from '@material-ui/core/es/Menu/Menu';
import MenuItem from '@material-ui/core/es/MenuItem/MenuItem';

const styles = {
  root: {
    flexGrow: 1,
    paddingRight: '5px',
  },
};

class AppMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

    handleProfileMenuOpen = (event) => {
      this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
      this.setState({ anchorEl: null });
    };

    handleOpenAdminPanel = () => {
      console.warn('Open admin panel');
    };

    render() {
      const { anchorEl } = this.state;
      const { classes } = this.props;
      const isMenuOpen = Boolean(anchorEl);

      const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
                    <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <Typography variant="h6" color="inherit" style={{ fontFamily: 'Yanone Kaffeesatz', fontSize: '30px' }}>
                                Winter rent
                            </Typography>
                        </div>
                        <div>
                            <IconButton
                                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
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
};

export default withStyles(styles)(AppMenu);
