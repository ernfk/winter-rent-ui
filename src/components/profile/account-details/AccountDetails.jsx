import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, withStyles } from '@material-ui/core';
import { Backspace as ClearIcon, Save as SaveIcon } from '@material-ui/icons';
import Title from '../../commons/title/Title';
import styles from './AccountDetails.style';

class AccountDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: '',
      lastName: '',
      street: '',
      city: '',
      phoneNo: 0,
      postalCode: 0,
      flatNo: 0,
      username: '',
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.currentUserProfile.username !== state.username) {
      return {
        id: nextProps.currentUserProfile.id,
        name: nextProps.currentUserProfile.name,
        lastName: nextProps.currentUserProfile.lastName,
        street: nextProps.currentUserProfile.street,
        city: nextProps.currentUserProfile.city,
        phoneNo: nextProps.currentUserProfile.phoneNo,
        postalCode: nextProps.currentUserProfile.postalCode,
        flatNo: nextProps.currentUserProfile.flatNo,
        username: nextProps.currentUserProfile.username,
      };
    }
    return null;
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleSave = () => {
    const { currentUsernameOrEmail, updateUserProfile } = this.props;

    updateUserProfile(currentUsernameOrEmail, this.state);
  };

  handleClear = () => {
    const clearedState = this.state;
    Object.keys(clearedState).forEach((key) => {
      if (key !== 'username') clearedState[key] = '';
    });

    this.setState(clearedState);
  };

  isProfileComplete = () => Object.values(this.state).some(val => val);

  render() {
    const { classes } = this.props;
    const {
      name, lastName, street, city, phoneNo, postalCode, flatNo,
    } = this.state;

    const greetings = this.isProfileComplete() ? 'Your profile' : 'Please complete your profile';

    return (
      <div style={styles.container}>
        <Title
          title={greetings}
          style={styles.header}
        />
        <TextField
          id="name"
          label="Name"
          value={name}
          onChange={this.handleChange('name')}
          className={classes.textField}
          type="text"
        />
        <TextField
          id="lastName"
          label="Last name"
          value={lastName}
          onChange={this.handleChange('lastName')}
          className={classes.textField}
          type="text"
        />
        <TextField
          id="street"
          label="Street"
          value={street}
          onChange={this.handleChange('street')}
          className={classes.textField}
          type="text"
        />
        <TextField
          id="flatNo"
          label="Flat number"
          value={flatNo}
          onChange={this.handleChange('flatNo')}
          className={classes.textField}
          type="number"
        />
        <TextField
          id="city"
          label="City"
          value={city}
          onChange={this.handleChange('city')}
          className={classes.textField}
          type="text"
        />
        <TextField
          id="postalCode"
          label="Postal code"
          value={postalCode}
          onChange={this.handleChange('postalCode')}
          className={classes.textField}
        />
        <TextField
          id="phoneNo"
          label="Phone number"
          value={phoneNo}
          onChange={this.handleChange('phoneNo')}
          className={classes.textField}
          type="number"
        />
        <div style={styles.buttonsContainer}>
          <Button
            variant="contained"
            onClick={this.handleSave}
          >
            <SaveIcon className={classes.icon} />
            {'Save'}
          </Button>
          <Button
            variant="contained"
            className={classes.clearButton}
            onClick={this.handleClear}
          >
            <ClearIcon className={classes.icon} />
            {'Clear'}
          </Button>
        </div>
      </div>
    );
  }
}

AccountDetails.propTypes = {
  classes: PropTypes.shape({}),
  currentUsernameOrEmail: PropTypes.string,

  updateUserProfile: PropTypes.func,
};

AccountDetails.defaultProps = {
  classes: {},
  currentUsernameOrEmail: '',
  updateUserProfile: () => {},
};

export default withStyles(styles)(AccountDetails);
