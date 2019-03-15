import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, FormControl, Input, InputAdornment, Paper, withStyles,
  FormHelperText,
} from '@material-ui/core';
import {
  Accessibility as LoginIcon,
  AccountCircle as AccountCircleIcon,
  Https as PasswordIcon,
} from '@material-ui/icons';
import Title from '../commons/title/title';
import ExitButton from '../commons/exit-button/exit-button';
import styles from './login-panel.style';

class LoginPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {
        email: '',
        password: '',
      },
    };
  }

  handleChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  };

  handleLogin = () => {
    if (this.isFormValid()) {
      console.info('Login');
    } else {
      console.warn('Error');
    }
  };

  isFormValid = () => this.validateForm();

  validateForm = () => {
    const errors = { ...this.state.errors };
    const fieldsToCheck = Object.keys(this.state).filter(field => field !== 'errors');

    fieldsToCheck.forEach((field) => {
      if (this.state[field] === '') {
        errors[field] = 'Can not be empty';
      } else {
        errors[field] = '';
      }
    });

    this.setState({ errors });

    return this.checkErrors(errors);
  };

  checkErrors = (errors) => {
    const index = Object.values(errors).findIndex(err => err !== '');
    return index === -1;
  };

  render() {
    const { classes, history } = this.props;
    const { email, password, errors } = this.state;
    return (
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
              name="email"
              onChange={event => this.handleChange(event, 'email')}
              placeholder="Email address"
              value={email}
            />
          </FormControl>
          <FormHelperText classes={{ root: classes.error }}>
            {errors.email}
          </FormHelperText>
          <FormControl className={classes.formControl}>
            <Input
              startAdornment={(
                <InputAdornment position="start">
                  <PasswordIcon />
                </InputAdornment>
              )}
              name="password"
              onChange={event => this.handleChange(event, 'password')}
              placeholder="Password"
              value={password}
            />
          </FormControl>
          <FormHelperText classes={{ root: classes.error }}>
            {errors.password}
          </FormHelperText>
          <div className={classes.buttonsContainer}>
            <Button
              variant="outlined"
              className={classes.loginButton}
              onClick={this.handleLogin}
            >
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
  }
}

LoginPanel.propTypes = {
  classes: PropTypes.shape({}),
  history: PropTypes.shape({}),
};

LoginPanel.defaultProps = {
  classes: {},
  history: {},
};

export default withStyles(styles)(LoginPanel);
