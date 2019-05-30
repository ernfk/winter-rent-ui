import React from 'react';
import PropTypes from 'prop-types';
import { Paper, withStyles } from '@material-ui/core';
import Title from '../title/Title';
import ExitButton from '../exit-button/ExitButton';
import styles from './info.style';

const Info = ({
  classes, history, title, icon,
}) => (
  <div className={classes.infoContainer}>
    <Paper className={classes.paper} elevation={4}>
      <div>
        {icon}
        <Title title={title} style={styles.title} />
        <ExitButton history={history} />
      </div>
    </Paper>
  </div>
);

Info.propTypes = {
  classes: PropTypes.shape({}),
  history: PropTypes.shape({}),
  icon: PropTypes.element,
  title: PropTypes.string,
};

Info.defaultProps = {
  classes: {},
  history: {},
  title: '',
};

export default withStyles(styles)(Info);
