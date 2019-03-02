import React from 'react';
import PropTypes from 'prop-types';
import { Save as SaveIcon, Clear as CancelIcon, Backspace as ClearIcon } from '@material-ui/icons';
import {
  FormHelperText, InputAdornment, Select, MenuItem,
  InputLabel, FormControl, Input, Button, withStyles,
} from '@material-ui/core';
import styles from './item-property-definitions-fields.style';


const getInitialState = ({ item, updateMode }) => ({
  color: updateMode ? item.color : '',
  gender: updateMode ? item.gender : '',
  length: updateMode ? item.length : '',
  model: updateMode ? item.model : '',
  price: updateMode ? item.price : '',
  producer: updateMode ? item.producer : '',
  raceStyle: updateMode ? item['race style'] : '',
  season: updateMode ? item.season : '',
  secondColor: updateMode ? item['second color'] : '',
  size: updateMode ? item.size : '',
  id: updateMode ? item.id : -1,
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
});

class ItemPropertyDefinitionsFields extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = getInitialState(props);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.item) {
      if (props.item.id !== state.id) {
        return getInitialState(props);
      }
    }
    return null;
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSaveOrUpdateItem = () => {
    const { addOrUpdateItem } = this.props;
    const isFormReady = this.validateForm();
    if (isFormReady) {
      const itemDTO = this.getItemDTO();
      addOrUpdateItem(itemDTO);
      this.handleClearFields();
    }
  };

  handleClearFields = () => {
    const state = getInitialState(this.props);
    this.setState(state);
  };

  handleCancel = () => {
    const { handleCancelUpdate } = this.props;
    handleCancelUpdate();
  };

  validateForm = () => {
    const errors = { ...this.state.errors };
    const fieldsToCheck = this.getFieldsForSelectedItemType();

    fieldsToCheck.forEach((field) => {
      if (this.state[field] === '') {
        errors[field] = 'Field can not be empty';
      } else if (field === 'length' || field === 'price') {
        const value = Number(this.state[field]);
        if (Number.isNaN(value)) {
          errors[field] = 'Must be number';
        } else {
          errors[field] = '';
        }
      } else {
        errors[field] = '';
      }
    });

    this.setState({ errors });

    return this.isFormErrorFree(errors);
  };

  getFieldsForSelectedItemType = () => {
    const { itemPropertyDefinitions, selectedItemType } = this.props;

    return itemPropertyDefinitions
      .filter(ipd => ipd.itemType === selectedItemType)
      .map(ipd => ipd.fieldProperties.stateRef);
  };

  isFormErrorFree = (errors) => {
    const errorsToCheck = this.getFieldsForSelectedItemType();

    const numberOfErrors = Object.entries(errors)
      .filter((error) => {
        if (errorsToCheck.includes(error[0])) {
          return error[1] !== '';
        }
      }).length;

    return numberOfErrors === 0;
  };

  getItemDTO = () => {
    const { selectedItemType } = this.props;

    return {
      id: null,
      itemType: selectedItemType,
      itemProperties: this.getItemProperties(),
    };
  };

  getItemProperties = () => {
    const { selectedItemType, itemPropertyDefinitions } = this.props;
    const itemProperties = this.getFieldsForSelectedItemType();

    const itemPropertiesForDTO = itemProperties.map((ip) => {
      const value = this.state[ip];
      const itemPropertyDefinitionForDTO = itemPropertyDefinitions
        .find(ipd => ipd.fieldProperties.stateRef === ip && ipd.itemType === selectedItemType);

      return {
        id: null,
        itemPropertyDefinition: {
          id: itemPropertyDefinitionForDTO.id,
          propertyName: itemPropertyDefinitionForDTO.propertyName,
          itemType: selectedItemType,
        },
        itemType: selectedItemType,
        value,
      };
    });

    return itemPropertiesForDTO;
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
                                    className={classes.errorLabel}>
                        {this.state.errors[stateRef]}
                    </FormHelperText>
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
                <FormHelperText id="component-error-text"
                                className={classes.errorLabel}>
                    {this.state.errors[stateRef]}
                </FormHelperText>
                </FormControl>;
        });
    };

    getButtons = () => {
      const { classes, updateMode } = this.props;

      return (
            <div>
                <Button variant="contained" className={classes.button} onClick={this.handleSaveOrUpdateItem}>
                    <SaveIcon className={classes.icon}/>
                    Save
                </Button>
                <Button variant="contained" className={classes.clearButton} onClick={this.handleClearFields}>
                    <ClearIcon className={classes.icon}/>
                    Clear
                </Button>
                {updateMode && <Button variant="contained" className={classes.button} onClick={this.handleCancel}>
                    <CancelIcon className={classes.icon}/>
                    Cancel
                </Button>}
            </div>
      );
    };

    render() {
      const { classes } = this.props;

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
  addOrUpdateItem: PropTypes.func,
  handleCancelUpdate: PropTypes.func,
  updateMode: PropTypes.bool,
  item: PropTypes.shape({ id: PropTypes.number }),
};

export default withStyles(styles)(ItemPropertyDefinitionsFields);
