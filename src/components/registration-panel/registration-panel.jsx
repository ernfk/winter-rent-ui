import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Checkbox, Paper, TextField, withStyles,
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
      termsAcceptStatus: 'false',
    };
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes, history } = this.props;
    const {
      name, lastName, email, password, confirmPassword, termsAcceptStatus,
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
            <TextField
              placeholder="Last name"
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.textfield}
              value={lastName}
              onChange={this.handleChange('lastName')}
            />
            <TextField
              placeholder="Email"
              InputLabelProps={{
                shrink: true,
              }}
              className={classes.textfield}
              value={email}
              onChange={this.handleChange('email')}
            />
            <TextField
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              margin="normal"
              className={classes.textfield}
              value={password}
              onChange={this.handleChange('password')}
            />
            <TextField
              type="password"
              placeholder="Confirm password"
              autoComplete="current-password"
              margin="normal"
              className={classes.textfield}
              value={confirmPassword}
              onChange={this.handleChange('confirmPassword')}
            />
          </div>
          <div style={styles.rulesAgreementContainer}>
            <Checkbox
              color="default"
              value={termsAcceptStatus}
              onChange={this.handleChange('termsAcceptStatus')}
            />
            <Paper className={classes.rulesAgreementPaper}>
              <div style={styles.ruleAgreementTitle}>
                {'I accept the Terms of Use & Privacy Policy'}
              </div>
            </Paper>
          </div>
          <div style={styles.buttonsContainer}>
            <Button
              onClick={() => {}}
              variant="outlined"
              className={classes.signUpButton}
            >
              {'Sign up'}
            </Button>
          </div>
          <ExitButton history={history} />
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
