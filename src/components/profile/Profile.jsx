import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Tab,
  Tabs,
  withStyles,
} from '@material-ui/core';
import AppMenu from '../overview/AppMenu';
import styles from './Profile.style';
import AccountDetails from './account-details/AccountDetails';
import MyReservations from './my-reservations/MyReservations';
import History from './history/History';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
    };
  }

  handleChangeTab = (event, newValue) => {
    this.setState({ currentTab: newValue });
  };

  render() {
    const { currentTab } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <AppMenu />
        <Paper square>
          <Tabs
            value={currentTab}
            onChange={this.handleChangeTab}
            classes={{ indicator: classes.tabsIndicator }}
          >
            <Tab label="Account details" />
            <Tab label="My reservations" />
            <Tab label="History" />
          </Tabs>
        </Paper>
        {currentTab === 0 && <AccountDetails />}
        {currentTab === 1 && <MyReservations />}
        {currentTab === 2 && <History />}
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.shape({}),
};

Profile.defaultProps = {
  classes: {},
};

export default withStyles(styles)(Profile);
