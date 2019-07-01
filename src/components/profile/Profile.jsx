import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Tab,
  Tabs,
  withStyles,
} from '@material-ui/core';
import { connect } from 'react-redux';
import AppMenu from '../overview/AppMenu';
import styles from './Profile.style';
import AccountDetails from './account-details/AccountDetails';
import MyReservations from './my-reservations/MyReservations';
import History from './history/History';
import * as UserSelectors from '../../selectors/user';
import * as UserActions from '../../actions/user';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
    };
  }

  componentDidMount() {
    const { getUserProfile, currentUsernameOrEmail } = this.props;
    getUserProfile(currentUsernameOrEmail);
  }

  handleChangeTab = (event, newValue) => {
    this.setState({ currentTab: newValue });
  };

  render() {
    const { currentTab } = this.state;
    const {
      classes,
      currentUserProfile,
      updateUserProfile,
      currentUsernameOrEmail,
    } = this.props;

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
            <Tab label="My reservations" disabled />
            <Tab label="History" disabled />
          </Tabs>
        </Paper>
        {currentTab === 0 && (
        <AccountDetails
          currentUserProfile={currentUserProfile}
          updateUserProfile={updateUserProfile}
          currentUsernameOrEmail={currentUsernameOrEmail}
        />
        )}
        {currentTab === 1 && <MyReservations />}
        {currentTab === 2 && <History />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUsernameOrEmail: UserSelectors.getCurrentUsernameOrEmail(state),
  currentUserProfile: UserSelectors.getCurrentUserProfile(state),
});

const mapDispatchToProps = dispatch => ({
  getUserProfile: currentUsernameOrEmail => dispatch(UserActions.getUserProfile(currentUsernameOrEmail)),
  updateUserProfile: (username, userProfile) => dispatch(UserActions.updateUserProfile(username, userProfile)),
});

Profile.propTypes = {
  classes: PropTypes.shape({}),
  currentUserProfile: PropTypes.shape({}),
  currentUsernameOrEmail: PropTypes.string,
  getUserProfile: PropTypes.func,
  updateUserProfile: PropTypes.func,
};

Profile.defaultProps = {
  classes: {},
  currentUserProfile: {},
  currentUsernameOrEmail: 0,
  getUserProfile: () => {},
  updateUserProfile: () => {},
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Profile));
