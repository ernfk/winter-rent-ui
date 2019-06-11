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
      name: 'A',
      lastName: 'B',
      street: 'C',
      city: 'D',
      phone: '123',
      postalCode: '54000',
    };
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleSave = () => {

  };

  handleClear = () => {

  };

  render() {
    const { classes } = this.props;
    const {
      name, lastName, street, city, phone, postalCode,
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
        />
        <TextField
          id="lastName"
          label="Last name"
          value={lastName}
          onChange={this.handleChange('lastName')}
          className={classes.textField}
        />
        <TextField
          id="street"
          label="Street"
          value={street}
          onChange={this.handleChange('street')}
          className={classes.textField}
        />
        <TextField
          id="city"
          label="City"
          value={city}
          onChange={this.handleChange('city')}
          className={classes.textField}
        />
        <TextField
          id="postalCode"
          label="Postal code"
          value={postalCode}
          onChange={this.handleChange('postalCode')}
          className={classes.textField}
        />
        <TextField
          id="phone"
          label="Phone number"
          value={phone}
          onChange={this.handleChange('phone')}
          className={classes.textField}
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
