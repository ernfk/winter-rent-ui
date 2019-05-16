import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button, FormControl, Input,
  InputAdornment, Paper, withStyles,
  FormHelperText,
} from '@material-ui/core';
import {
  Accessibility as LoginIcon,
  AccountCircle as AccountCircleIcon,
  Https as PasswordIcon,
} from '@material-ui/icons';
import Title from '../commons/title/Title';
import ExitButton from '../commons/exit-button/ExitButton';
import styles from './LoginPanel.style';
import { signIn } from '../../actions/user';
import InfoSnackbar from '../commons/info-snackbar/InfoSnackbar';

class LoginPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      usernameOrEmail: '',
      password: '',
      errors: {
        usernameOrEmail: '',
        password: '',
      },
    };
  }

  handleChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  };

  handleLogin = () => {
    const { login } = this.props;
    const { usernameOrEmail, password } = this.state;

    const user = { usernameOrEmail, password };

    this.isFormValid() && login(user);
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
    const { usernameOrEmail, password, errors } = this.state;
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
              name="usernameOrEmail"
              onChange={event => this.handleChange(event, 'usernameOrEmail')}
              placeholder="Email or username"
              value={usernameOrEmail}
            />
          </FormControl>
          <FormHelperText classes={{ root: classes.error }}>
            {errors.usernameOrEmail}
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
        <InfoSnackbar />
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(signIn(user)),
});

LoginPanel.propTypes = {
  classes: PropTypes.shape({}),
  history: PropTypes.shape({}),
  login: PropTypes.func,
};

LoginPanel.defaultProps = {
  classes: {},
  history: {},
  login: () => {},
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LoginPanel));
