import React from 'react';
import PropTypes from 'prop-types';
import { Paper, withStyles } from '@material-ui/core';
import {
  CheckCircle as InfoIcon,
  Warning as WarningIcon,
} from '@material-ui/icons/';
import Title from '../title/Title';
import ExitButton from '../exit-button/ExitButton';
import styles from './Info.style';

export const InfoTypes = {
  INFO: 'INFO',
  UNAUTHORIZED: 'UNAUTHORIZED',
};

const Info = ({
  classes, history, title, type, exitButton,
}) => (
  <div className={classes.infoContainer}>
    <Paper className={classes.paper} elevation={4}>
      <div>
        {type === InfoTypes.INFO
          ? <InfoIcon classes={{ root: classes.icon }} />
          : <WarningIcon classes={{ root: classes.iconError }} />}
        <Title title={title} style={styles.title} />
        {exitButton && <ExitButton history={history} />}
      </div>
    </Paper>
  </div>
);

Info.propTypes = {
  classes: PropTypes.shape({}),
  exitButton: PropTypes.bool,
  history: PropTypes.shape({}),
  title: PropTypes.string,
  type: PropTypes.string,
};

Info.defaultProps = {
  classes: {},
  exitButton: true,
  history: {},
  title: '',
  type: '',
};

export default withStyles(styles)(Info);
