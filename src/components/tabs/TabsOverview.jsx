import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles } from '@material-ui/core';
import styles from './TabsOverview.style';

const TabsOverview = ({ classes }) => (
  <div>
    <Button variant="outlined" className={classes.button}>SKI</Button>
    <Button variant="outlined" className={classes.button}>BOARDS</Button>
    <Button variant="outlined" className={classes.button}>BOOTS</Button>
    <Button variant="outlined" className={classes.button}>CASQUES</Button>
    <Button variant="outlined" className={classes.button}>CONTACT</Button>
  </div>
);

TabsOverview.propTypes = {
  classes: PropTypes.shape({}),
};

TabsOverview.defaultProps = {
  classes: {},
};

export default withStyles(styles)(TabsOverview);
