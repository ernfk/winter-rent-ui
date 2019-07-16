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
import ProfileDetails from './profile-details/ProfileDetails';
import MyReservations from './my-reservations/MyReservations';
import History from './history/History';
import * as UserSelectors from '../../selectors/user';
import * as UserActions from '../../actions/user';
import Info, { InfoTypes } from '../commons/info/Info';

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

  isUserLogged = () => window.localStorage.getItem('accessToken');

  render() {
    const { currentTab } = this.state;
    const {
      classes,
      currentUserProfile,
      updateUserProfile,
      currentUsernameOrEmail,
      history,
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
        {currentTab === 0 && this.isUserLogged()
          ? (
            <ProfileDetails
              currentUserProfile={currentUserProfile}
              updateUserProfile={updateUserProfile}
              currentUsernameOrEmail={currentUsernameOrEmail}
            />
          )
          : (
            <Info
              title="Please login first"
              history={history}
              type={InfoTypes.UNAUTHORIZED}
              exitButton={false}
            />
          )
        }
        {currentTab === 1 && <MyReservations />}
        {currentTab === 2 && <History />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUsernameOrEmail: UserSelectors.getCurrentUsernameOrEmail(),
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
  history: PropTypes.shape({}),
  updateUserProfile: PropTypes.func,
};

Profile.defaultProps = {
  classes: {},
  currentUserProfile: {},
  currentUsernameOrEmail: 0,
  getUserProfile: () => {},
  history: {},
  updateUserProfile: () => {},
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Profile));
