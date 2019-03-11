import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, FormControl, Input, InputAdornment, Paper, withStyles,
} from '@material-ui/core';
import {
  Accessibility as LoginIcon,
  AccountCircle as AccountCircleIcon,
  Https as PasswordIcon,
} from '@material-ui/icons';
import Title from '../commons/title/title';
import ExitButton from '../commons/exit-button/exit-button';
import styles from './login-panel.style';

const LoginPanel = ({ classes, history }) => (
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
        <Button variant="outlined" onClick={() => history.push('/registration')}>
          {'Register'}
        </Button>
      </div>
      <ExitButton history={history} />
    </Paper>
  </div>
);

LoginPanel.propTypes = {
  classes: PropTypes.shape({}),
  history: PropTypes.shape({}),
};

LoginPanel.defaultProps = {
  classes: {},
  history: {},
};

export default withStyles(styles)(LoginPanel);
