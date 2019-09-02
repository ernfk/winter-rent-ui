import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, withStyles } from '@material-ui/core';
import styles from './TabsOverview.style';

const TabsOverview = ({ classes, history }) => {
  const handleGoTo = (path) => {
    history.push(path);
  };

  return (
    <div>
      <Button
        className={classes.button}
        onClick={() => handleGoTo('./ski')}
      >
        {'SKI'}
      </Button>
      <Button
        className={classes.button}
        onClick={() => handleGoTo('./boards')}
        disabled
      >
        {'BOARDS'}
      </Button>
      <Button className={classes.button} disabled>BOOTS</Button>
      <Button className={classes.button} disabled>CASQUES</Button>
      <Button className={classes.button} disabled>CONTACT</Button>
    </div>
  );
};

TabsOverview.propTypes = {
  classes: PropTypes.shape({}),
  history: PropTypes.shape({}),
};

TabsOverview.defaultProps = {
  classes: {},
  history: {},
};

export default withStyles(styles)(withRouter(TabsOverview));
