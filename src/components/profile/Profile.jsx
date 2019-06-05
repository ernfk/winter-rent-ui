import React from 'react';
import { withStyles } from '@material-ui/core';
import AppMenu from '../overview/AppMenu';
import Title from '../commons/title/Title';
import styles from './Profile.style';

const Profile = () => (
  <div>
    <AppMenu />
    <div>
      <Title
        title="Hello User! Please complete your profile."
        style={styles.header}
      />

    </div>
  </div>
);

export default withStyles(styles)(Profile);
