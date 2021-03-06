import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button, Checkbox, FormHelperText, Paper, TextField, withStyles,
} from '@material-ui/core';
import { Mood as WelcomeIcon } from '@material-ui/icons';
import Title from '../commons/title/Title';
import styles from './RegistrationPanel.style';
import ExitButton from '../commons/exit-button/ExitButton';
import InfoSnackbar from '../commons/info-snackbar/InfoSnackbar';
import Info, { InfoTypes } from '../commons/info/Info';
import * as UserActions from '../../actions/user';
import * as UserSelectors from '../../selectors/user';

const getInitialState = () => ({
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  termsAcceptStatus: false,
  errors: {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAcceptStatus: '',
  },
});

class RegistrationPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = getInitialState();
  }

  static getDerivedStateFromProps(props, state) {
    const { userRegisteredSuccessfully } = props;

    if (userRegisteredSuccessfully) {
      return getInitialState();
    }

    return null;
  }

  handleChange = name => (event) => {
    if (name === 'termsAcceptStatus') {
      this.setState({ termsAcceptStatus: event.target.checked });
    } else {
      this.setState({
        [name]: event.target.value,
      });
    }
  };

  handleSignUp = () => {
    const { signUpUser, history } = this.props;
    const {
      name, username, email, password,
    } = this.state;
    const user = {
      name, username, email, password,
    };

    this.isFormValid() && signUpUser(user, history);
  };

  isFormValid = () => this.validateForm();

  validateForm = () => {
    const REQUIRED_FIELD = 'This field is required';
    const PASSWORD_DOES_NOT_MATCH = 'The password does not match';
    const TERMS_NOT_ACCEPTED = 'You have to accepts the term to create the account!';
    const errors = { ...this.state.errors };
    const fieldsToCheck = Object.keys(this.state).filter(field => field !== 'errors');

    fieldsToCheck.forEach((field) => {
      if (field === 'termsAcceptStatus' && !this.state[field]) {
        errors[field] = TERMS_NOT_ACCEPTED;
      } else if (this.state[field] === '') {
        errors[field] = REQUIRED_FIELD;
      } else if (field === 'confirmPassword' && this.state[field] !== this.state.password) {
        errors[field] = PASSWORD_DOES_NOT_MATCH;
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
    const {
      name, username, email, password, confirmPassword, termsAcceptStatus,
      errors,
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
          <div style={styles.registrationPanelContainer}>
            <Paper className={classes.paper} elevation={4}>
              <WelcomeIcon classes={{ root: classes.welcomeIcon }} />
              <Title title="Registration" style={styles.title} />
              <div style={styles.textFieldsContainer}>
                <TextField
                  placeholder="Name"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.textfield}
                  value={name}
                  onChange={this.handleChange('name')}
                />
                <FormHelperText classes={{ root: classes.error }}>
                  {errors.name}
                </FormHelperText>
                <TextField
                  placeholder="Login"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.textfield}
                  value={username}
                  onChange={this.handleChange('username')}
                />
                <FormHelperText classes={{ root: classes.error }}>
                  {errors.username}
                </FormHelperText>
                <TextField
                  placeholder="Email"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.textfield}
                  value={email}
                  onChange={this.handleChange('email')}
                />
                <FormHelperText classes={{ root: classes.error }}>
                  {errors.email}
                </FormHelperText>
                <TextField
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  margin="normal"
                  className={classes.textfield}
                  value={password}
                  onChange={this.handleChange('password')}
                />
                <FormHelperText classes={{ root: classes.error }}>
                  {errors.password}
                </FormHelperText>
                <TextField
                  type="password"
                  placeholder="Confirm password"
                  autoComplete="current-password"
                  margin="normal"
                  className={classes.textfield}
                  value={confirmPassword}
                  onChange={this.handleChange('confirmPassword')}
                />
                <FormHelperText classes={{ root: classes.error }}>
                  {errors.confirmPassword}
                </FormHelperText>
              </div>
              <div style={styles.rulesAgreementContainer}>
                <Checkbox
                  color="default"
                  checked={termsAcceptStatus}
                  onChange={this.handleChange('termsAcceptStatus')}
                />
                <Paper className={classes.rulesAgreementPaper}>
                  <div style={styles.ruleAgreementTitle}>
                    {'I accept the Terms of Use & Privacy Policy'}
                  </div>
                </Paper>
              </div>
              <FormHelperText classes={{ root: classes.error }}>
                {errors.termsAcceptStatus}
              </FormHelperText>
              <div style={styles.buttonsContainer}>
                <Button
                  onClick={this.handleSignUp}
                  variant="outlined"
                  className={classes.signUpButton}
                >
                  {'Sign up'}
                </Button>
              </div>
              <div>
                <ExitButton history={history} />
              </div>
            </Paper>
            <InfoSnackbar />
          </div>
        )
    );
  }
}

RegistrationPanel.propTypes = {
  classes: PropTypes.shape({}),
  history: PropTypes.shape({}),
  signUpUser: PropTypes.func,
};

RegistrationPanel.defaultProps = {
  classes: {},
  history: {},
  signUpUser: () => {},
};

const mapStateToProps = state => ({
  userRegisteredSuccessfully: UserSelectors.isUserSuccessfullyRegistered(state),
});

const mapDispatchToProps = dispatch => ({
  signUpUser: (user, history) => {
    dispatch(UserActions.signUpUser(user, history));
  },
});
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RegistrationPanel));
