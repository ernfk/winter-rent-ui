import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, withStyles } from '@material-ui/core';
import { ExitToApp as ExitIcon } from '@material-ui/icons';
import styles from './exit-button.style';

const ExitButton = ({ history, classes }) => (
  <IconButton
    onClick={() => history.push('/')}
    color="inherit"
    className={classes.exitButton}
  >
    <ExitIcon classes={{ root: classes.exitIcon }} />
  </IconButton>
);

ExitButton.propTypes = {
  classes: PropTypes.shape({}),
  history: PropTypes.shape({}),
};

ExitButton.defaultProps = {
  classes: {},
  history: {},
};

export default withStyles(styles)(ExitButton);
