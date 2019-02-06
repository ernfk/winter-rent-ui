import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import classNames from 'classnames';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import styles from './item-property-definitions-fields.style';

const initialState = {
  color: '',
  gender: '',
  length: '',
  model: '',
  price: '',
  producer: '',
  raceStyle: '',
  season: '',
  secondColor: '',
  size: '',
  errors: {
    color: '',
    gender: '',
    length: '',
    model: '',
    price: '',
    producer: '',
    raceStyle: '',
    season: '',
    secondColor: '',
    size: '',
  },
};

class ItemPropertyDefinitionsFields extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

    handleChange = name => (event) => {
      this.setState({
        [name]: event.target.value,
      });
    };

    handleAddItem = () => {
      const { selectedItemType } = this.props;
      this.validateForm(this.state, selectedItemType);
    };

    handleClearFields = () => {
      this.setState(initialState);
    };

    validateForm = (fields, selectedItemType) => {
      const errors = { ...this.state.errors };

      Object.keys(fields).forEach((field) => {
        if (this.state[field] === '') {
          errors[field] = 'Field can not be empty';
        } else if (field === 'length' || field === 'price') {
          const value = Number(this.state[field]);
          if (isNaN(value)) {
            errors[field] = 'Must be number';
          } else {
            errors[field] = '';
          }
        } else {
          errors[field] = '';
        }
      });

      this.setState({ errors });
    };

    getInputProps = (itemPropertyDefinition) => {
      const { adornment } = itemPropertyDefinition.fieldProperties;
      return <InputAdornment
            position={adornment.position}>
            {adornment.value}
        </InputAdornment>;
    };

    getTextFields = () => {
      const { itemPropertyDefinitions, classes, selectedItemType } = this.props;

      return itemPropertyDefinitions
        .filter(ipd => ipd.fieldProperties.fieldType === 'textfield' && selectedItemType === ipd.itemType)
        .sort((a, b) => a.fieldProperties.sortNo - b.fieldProperties.sortNo)
        .map((ipd, index) => {
          const { stateRef } = ipd.fieldProperties;
          return <FormControl className={classes.formControl} key={index}>
                    <InputLabel htmlFor={`${stateRef}-textfield`}>{ipd.propertyName}</InputLabel>
                    <Input
                        id={`${stateRef}-textfield`}
                        value={this.state[stateRef]}
                        onChange={this.handleChange(stateRef)}
                        aria-describedby="component-error-text"
                        endAdornment={this.getInputProps(ipd)}
                    />

                    <FormHelperText id="component-error-text"
                                    style={{ color: 'red' }}>{this.state.errors[stateRef]}</FormHelperText>
                </FormControl>;
        });
    };

    getMenuItems = itemPropertyDefinition => itemPropertyDefinition.fieldProperties.menuItems
      .map(item => <MenuItem value={item} key={item}>{item}</MenuItem>);

    getSelectFields = () => {
      const { itemPropertyDefinitions, classes, selectedItemType } = this.props;

      return itemPropertyDefinitions
        .filter(ipd => ipd.fieldProperties.fieldType === 'select' && selectedItemType === ipd.itemType)
        .map((ipd, index) => {
          const { stateRef } = ipd.fieldProperties;
          return <FormControl className={classes.formControl} key={index}>
                    <InputLabel htmlFor={`select-${stateRef}`}>
                        {ipd.propertyName}
                    </InputLabel>
                    <Select
                        value={this.state[stateRef]}
                        onChange={this.handleChange(stateRef)}
                        input={
                            <Input
                                name={`select-${stateRef}`}
                                id={`select-${stateRef}`}
                            />
                        }
                    >
                        {this.getMenuItems(ipd)}
                    </Select>
                </FormControl>;
        });
    };

    getButtons = () => {
      const { classes } = this.props;

      return (
            <div>
                <Button variant="contained" className={classes.button} onClick={this.handleAddItem}>
                    <SaveIcon className={classes.leftIcon}/>
                    Save
                </Button>
                <Button variant="outlined" className={classes.clearButton} onClick={this.handleClearFields}>
                    <ClearIcon className={classes.leftIcon}/>
                    Clear
                </Button>
            </div>
      );
    };

    render() {
      const { classes } = this.props;
      console.log(this.state);
      return (
            <div>
                <div className={classes.fieldsGrid}>
                    {this.getTextFields()}
                    {this.getSelectFields()}
                </div>
                {this.getButtons()}
            </div>
      );
    }
}

ItemPropertyDefinitionsFields.propTypes = {
  classes: PropTypes.object.isRequired,
  itemPropertyDefinitions: PropTypes.array,
  selectedItemType: PropTypes.string,
};

export default withStyles(styles)(ItemPropertyDefinitionsFields);
