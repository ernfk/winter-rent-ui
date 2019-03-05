import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, Input, InputAdornment, Paper, withStyles, Button, IconButton,
} from '@material-ui/core';
import {
  Accessibility as LoginIcon,
  AccountCircle as AccountCircleIcon,
  Https as PasswordIcon,
  ExitToApp as ExitIcon,
} from '@material-ui/icons';
import Title from '../commons/title/title';
import styles from './login-panel.style';

const LoginPanel = ({ classes }) => (
  <div className={classes.loginPanelContainer}>
    <Paper className={classes.paper} elevation={4}>
      <LoginIcon classes={{ root: classes.loginIcon }} />
      <Title title="PLEASE LOGIN" style={styles.title} />
      <FormControl className={classes.formControl}>
        <Input
          startAdornment={(
            <InputAdornment position="start">
              <AccountCircleIcon />
            </InputAdornment>
            )}
          placeholder="Email address"
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <Input
          startAdornment={(
            <InputAdornment position="start">
              <PasswordIcon />
            </InputAdornment>
            )}
          placeholder="Password"
        />
      </FormControl>
      <div className={classes.buttonsContainer}>
        <Button variant="outlined" className={classes.loginButton}>
          {'Login'}
        </Button>
        <Button variant="outlined">
          {'Register'}
        </Button>
      </div>
      <IconButton
        onClick={() => {}}
        color="inherit"
        className={classes.exitButton}
      >
        <ExitIcon classes={{ root: classes.exitIcon }} />
      </IconButton>
    </Paper>
  </div>
);

LoginPanel.propTypes = {
  classes: PropTypes.shape({}),
};

LoginPanel.defaultProps = {
  classes: {},
};

export default withStyles(styles)(LoginPanel);
