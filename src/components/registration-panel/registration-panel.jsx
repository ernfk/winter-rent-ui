import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Checkbox, Paper, TextField, withStyles,
  FormHelperText,
} from '@material-ui/core';
import { Mood as WelcomeIcon } from '@material-ui/icons';
import Title from '../commons/title/title';
import styles from './registration-panel-container.style';
import ExitButton from '../commons/exit-button/exit-button';

class RegistrationPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAcceptStatus: false,
      nameError: '',
      lastNameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
      termsAcceptStatusError: '',
    };
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
    const {
      name, lastName, email, password, confirmPassword, termsAcceptStatus,
    } = this.state;

    if (name === '') {
      this.setState({ nameError: 'This field is required' });
    } else {
      this.setState({ nameError: '' });
    }
    if (lastName === '') {
      this.setState({ lastNameError: 'This field is required' });
    } else {
      this.setState({ lastNameError: '' });
    }
    if (email === '') {
      this.setState({ emailError: 'This field is required' });
    } else {
      this.setState({ emailError: '' });
    }
    if (password === '') {
      this.setState({ passwordError: 'This field is required' });
    } else {
      this.setState({ passwordError: '' });
    }
    if (confirmPassword === '') {
      this.setState({ confirmPasswordError: 'This field is required' });
    } else if (confirmPassword !== password) {
      this.setState({ confirmPasswordError: 'The password does not match' });
    } else {
      this.setState({ confirmPasswordError: '' });
    }
    if (!termsAcceptStatus) {
      this.setState({ termsAcceptStatusError: 'You must accept the terms to create an account' });
    } else {
      this.setState({ termsAcceptStatusError: '' });
    }
  };

  render() {
    const { classes, history } = this.props;
    const {
      name, lastName, email, password, confirmPassword, termsAcceptStatus,
      nameError, lastNameError, emailError, passwordError, confirmPasswordError,
      termsAcceptStatusError,
    } = this.state;

    return (
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
              {nameError}
            </FormHelperText>
            <TextField
              placeholder="Last name"
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.textfield}
              value={lastName}
              onChange={this.handleChange('lastName')}
            />
            <FormHelperText classes={{ root: classes.error }}>
              {lastNameError}
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
              {emailError}
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
              {passwordError}
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
              {confirmPasswordError}
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
            {termsAcceptStatusError}
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
      </div>
    );
  }
}

RegistrationPanel.propTypes = {
  classes: PropTypes.shape({}),
  history: PropTypes.shape({}),
};

RegistrationPanel.defaultProps = {
  classes: {},
  history: {},
};

export default withStyles(styles)(RegistrationPanel);
