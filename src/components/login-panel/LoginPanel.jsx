import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button, FormControl, IconButton, Input,
  InputAdornment, Paper, withStyles,
  FormHelperText,
} from '@material-ui/core';
import {
  Accessibility as LoginIcon,
  AccountCircle as AccountCircleIcon,
  Https as PasswordIcon,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';
import Title from '../commons/title/Title';
import ExitButton from '../commons/exit-button/ExitButton';
import Info, { InfoTypes } from '../commons/info/Info';
import InfoSnackbar from '../commons/info-snackbar/InfoSnackbar';
import * as UserActions from '../../actions/user';
import * as UserSelectors from '../../selectors/user';
import styles from './LoginPanel.style';

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
      showPassword: false,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { currentUsernameOrEmail, history } = this.props;

    if (currentUsernameOrEmail !== prevProps.currentUsernameOrEmail) {
      history.push('/');
    }
  };

  handleChange = (event, name) => {
    this.setState({ [name]: event.target.value });
  };

  handleLogin = () => {
    const { login, history } = this.props;
    const { usernameOrEmail, password } = this.state;

    const user = { usernameOrEmail, password };

    this.isFormValid() && login(user, history);
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

  onRegisterClick = () => {
    const { clearUserSuccessfullyRegisteredStatus, history } = this.props;

    clearUserSuccessfullyRegisteredStatus();
    history.push('/registration');
  };

  handleClickShowPassword = () => {
    const { showPassword } = this.state;

    this.setState({ showPassword: !showPassword });
  };

  render() {
    const { classes, history } = this.props;
    const {
      usernameOrEmail, password, errors, showPassword,
    } = this.state;
    const isUserLogged = window.localStorage.getItem('accessToken');

    return (
      isUserLogged
        ? (
          <Info
            title="You are already logged in!"
            history={history}
            type={InfoTypes.INFO}
          />
        )
        : (
          <div className={classes.loginPanelContainer}>
            <Paper className={classes.paper} elevation={4}>
              <div>
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
                    endAdornment={(
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )}
                    name="password"
                    onChange={event => this.handleChange(event, 'password')}
                    placeholder="Password"
                    value={password}
                    type={showPassword ? 'text' : 'password'}
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
                  <Button variant="outlined" onClick={this.onRegisterClick}>
                    {'Register'}
                  </Button>
                </div>
                <ExitButton history={history} />
              </div>
            </Paper>
            <InfoSnackbar />
          </div>
        )
    );
  }
}

const mapStateToProps = state => ({
  currentUsernameOrEmail: UserSelectors.getCurrentUsernameOrEmail(),
});

const mapDispatchToProps = dispatch => ({
  login: (user, history) => dispatch(UserActions.signIn(user, history)),
  clearUserSuccessfullyRegisteredStatus: () => dispatch(UserActions.setUserSuccessfullyRegisteredStatus(false)),
});

LoginPanel.propTypes = {
  classes: PropTypes.shape({}),
  currentUsernameOrEmail: PropTypes.string,
  history: PropTypes.shape({}),
  login: PropTypes.func,
  clearUserSuccessfullyRegisteredStatus: PropTypes.func,
};

LoginPanel.defaultProps = {
  classes: {},
  currentUsernameOrEmail: '',
  history: {},
  login: () => {},
  clearUserSuccessfullyRegisteredStatus: () => {},
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LoginPanel));
