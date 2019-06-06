import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Tab,
  Tabs,
  withStyles,
} from '@material-ui/core';
import AppMenu from '../overview/AppMenu';
import Title from '../commons/title/Title';
import styles from './Profile.style';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: '',
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
        <div>
          <Paper square>
            <Tabs
              value={currentTab}
              onChange={this.handleChangeTab}
              classes={{ indicator: classes.tabsIndicator }}
            >
              <Tab label="Account details" />
              <Tab label="My reservations" disabled/>
            </Tabs>
          </Paper>
          <Title
            title="Hello User! Please complete your profile."
            style={styles.header}
          />

        </div>
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
