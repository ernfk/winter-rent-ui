import React from 'react';
import PropTypes from 'prop-types';
import {
  Save as SaveIcon,
  Clear as CancelIcon,
  Backspace as ClearIcon,
  PhotoCamera as PhotoIcon,
} from '@material-ui/icons';
import {
  FormHelperText, InputAdornment, Select, MenuItem,
  InputLabel, FormControl, Input, Button, withStyles,
  Paper, IconButton,
} from '@material-ui/core';
import styles from './item-property-definitions-fields.style';

const getInitialState = ({ item, updateMode }, clear) => ({
  color: updateMode && !clear ? item.color : '',
  gender: updateMode && !clear ? item.gender : '',
  length: updateMode && !clear ? item.length : '',
  model: updateMode && !clear ? item.model : '',
  price: updateMode && !clear ? item.price : '',
  producer: updateMode && !clear ? item.producer : '',
  raceStyle: updateMode && !clear ? item['race style'] : '',
  season: updateMode && !clear ? item.season : '',
  secondColor: updateMode && !clear ? item['second color'] : '',
  size: updateMode && !clear ? item.size : '',
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
    const { selectedItemType, item } = this.props;
    const { id } = this.state;

    return {
      id,
      itemType: selectedItemType,
      itemProperties: this.getItemProperties(),
      modelNo: item ? item.modelNo : null,
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

  getFieldsForSelectedItemType = () => {
    const { itemPropertyDefinitions, selectedItemType } = this.props;

    return itemPropertyDefinitions
      .filter(ipd => ipd.itemType === selectedItemType)
      .map(ipd => ipd.fieldProperties.stateRef);
  };

  handleClearFields = () => {
    const state = getInitialState(this.props, true);
    this.setState(state);
  };

  handleCancel = () => {
    const { handleCancelUpdate } = this.props;
    handleCancelUpdate();
  };

  getInputProps = (itemPropertyDefinition) => {
    const { adornment } = itemPropertyDefinition.fieldProperties;
    return (
      <InputAdornment
        position={adornment.position}
      >
        {adornment.value}
      </InputAdornment>
    );
  };

  getTextFields = () => {
    const { itemPropertyDefinitions, classes, selectedItemType } = this.props;

    return itemPropertyDefinitions
      .filter(ipd => ipd.fieldProperties.fieldType === 'textfield' && selectedItemType === ipd.itemType)
      .sort((a, b) => a.fieldProperties.sortNo - b.fieldProperties.sortNo)
      .map((ipd, index) => {
        const { stateRef } = ipd.fieldProperties;
        return (
          <FormControl className={classes.formControl} key={index}>
            <InputLabel htmlFor={`${stateRef}-textfield`}>{ipd.propertyName}</InputLabel>
            <Input
              id={`${stateRef}-textfield`}
              value={this.state[stateRef]}
              onChange={this.handleChange(stateRef)}
              aria-describedby="component-error-text"
              endAdornment={this.getInputProps(ipd)}
            />

            <FormHelperText
              id="component-error-text"
              className={classes.errorLabel}
            >
              {this.state.errors[stateRef]}
            </FormHelperText>
          </FormControl>
        );
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
        return (
          <FormControl className={classes.formControl} key={index}>
            <InputLabel htmlFor={`select-${stateRef}`}>
              {ipd.propertyName}
            </InputLabel>
            <Select
              value={this.state[stateRef]}
              onChange={this.handleChange(stateRef)}
              input={(
                <Input
                  name={`select-${stateRef}`}
                  id={`select-${stateRef}`}
                />
                )}
            >
              {this.getMenuItems(ipd)}
            </Select>
            <FormHelperText
              id="component-error-text"
              className={classes.errorLabel}
            >
              {this.state.errors[stateRef]}
            </FormHelperText>
          </FormControl>
        );
      });
  };

  getButtons = () => {
    const { classes, updateMode } = this.props;

    return (
      <div>
        <Button variant="contained" className={classes.button} onClick={this.handleSaveOrUpdateItem}>
          <SaveIcon className={classes.icon} />
          {'Save'}
        </Button>
        <Button variant="contained" className={classes.clearButton} onClick={this.handleClearFields}>
          <ClearIcon className={classes.icon} />
          {'Clear'}
        </Button>
        {updateMode && (
          <Button variant="contained" className={classes.button} onClick={this.handleCancel}>
            <CancelIcon className={classes.icon} />
              {'Cancel'}
          </Button>
        )}
      </div>
    );
  };

  getPhoto = () => {
    const { classes } = this.props;
    return (
      <div style={styles.photoContainer}>
        <Paper classes={{ root: classes.paperRoot }}>
          <div style={styles.noPhotoPlaceHolder}>
            {'No photo'}
          </div>
        </Paper>
        <input accept="image/*" className={classes.photoUpload} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" component="span">
            <PhotoIcon className={classes.photoIcon} />
          </IconButton>
        </label>
      </div>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.formContainer}>
        <div>
          <div className={classes.fieldsGrid}>
            {this.getTextFields()}
            {this.getSelectFields()}
          </div>
          {this.getButtons()}
        </div>
        {this.getPhoto()}
      </div>
    );
  }
}

ItemPropertyDefinitionsFields.propTypes = {
  classes: PropTypes.shape({}),
  itemPropertyDefinitions: PropTypes.arrayOf(PropTypes.shape({})),
  selectedItemType: PropTypes.string,
  addOrUpdateItem: PropTypes.func,
  handleCancelUpdate: PropTypes.func,
  updateMode: PropTypes.bool,
  item: PropTypes.shape({ id: PropTypes.number }),
};

ItemPropertyDefinitionsFields.defaultProps = {
  classes: {},
  itemPropertyDefinitions: [],
  selectedItemType: '',
  addOrUpdateItem: () => {},
  handleCancelUpdate: () => {},
  updateMode: false,
  item: null,
};

export default withStyles(styles)(ItemPropertyDefinitionsFields);
