import React from 'react';
import { withStyles } from '@material-ui/core';
import Title from '../../commons/title/Title';
import styles from './AccountDetails.style';

const AccountDetails = () => (
  <div>
    <Title
      title="Hello User! Please complete your profile."
      style={styles.header}
    />
  </div>
);

export default withStyles(styles)(AccountDetails);
