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
      name: 'Andrew',
      lastName: 'Baggs',
      street: 'Ocean Drive',
      city: 'Wildwood',
      phoneNo: 700800500,
      postalCode: 54000,
      flatNo: 55,
    };
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleSave = () => {

  };

  handleClear = () => {
    const clearedState = this.state;
    Object.keys(clearedState).forEach(key => clearedState[key] = '');

    this.setState(clearedState);
  };

  render() {
    const { classes } = this.props;
    const {
      name, lastName, street, city, phoneNo, postalCode, flatNo,
    } = this.state;

    return (
      <div style={styles.container}>
        <Title
          title="Hello User! Please complete your profile."
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
};

AccountDetails.defaultProps = {
  classes: {},
};

export default withStyles(styles)(AccountDetails);
