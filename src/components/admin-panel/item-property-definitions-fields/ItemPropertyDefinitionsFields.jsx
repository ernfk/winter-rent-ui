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
import styles from './ItemPropertyDefinitionsFields.style';

const getInitialState = ({ item, updateMode, itemImage }, clear) => ({
  color: updateMode && !clear ? item.color : 'RED',
  gender: updateMode && !clear ? item.gender : 'MALE',
  length: updateMode && !clear ? item.length : '123',
  model: updateMode && !clear ? item.model : 'C',
  price: updateMode && !clear ? item.price : '123',
  producer: updateMode && !clear ? item.producer : 'ELAN',
  raceStyle: updateMode && !clear ? item['race style'] : 'RACE',
  season: updateMode && !clear ? item.season : 'NEW',
  secondColor: updateMode && !clear ? item['second color'] : 'GREEN',
  size: updateMode && !clear ? item.size : 'L ',
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
    uploadPhoto: '',
  },
  filePreviewPath: itemImage.photo ? `data:image/jpeg;base64,${itemImage.photo}` : null,
  file: itemImage.photo,
});

class ItemPropertyDefinitionsFields extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = getInitialState(props);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.item) {
      if (props.item.id !== state.id && props.updateMode) {
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
    const { file, imageId } = this.state;

    const isFormReady = this.validateForm();
    if (isFormReady) {
      const itemDTO = this.getItemDTO();
      addOrUpdateItem(itemDTO, file, imageId);
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
    const { filePreviewPath } = this.state;

    return (
      <div style={styles.photoContainer}>
        <Paper classes={{ root: classes.paperRoot }}>
          <div style={styles.noPhotoPlaceHolder}>
            {filePreviewPath ? <img src={filePreviewPath} /> : 'No photo'}
          </div>
        </Paper>
        <input
          accept="image/*"
          className={classes.photoUpload}
          id="icon-button-file"
          type="file"
          onChange={this.handleUpload}
        />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" component="span">
            <PhotoIcon className={classes.photoIcon} />
          </IconButton>
        </label>
        <FormHelperText
          id="component-error-text"
          className={classes.errorLabel}
        >
          {this.state.errors.uploadPhoto}
        </FormHelperText>
      </div>
    );
  };

  handleUpload = ({ target }) => {
    const { files } = target;
    const image = new Image();

    image.src = URL.createObjectURL(files[0]);
    image.onload = () => this.checkImageResolution(image, files[0]);
    target.value = '';
  };

  checkImageResolution = (image, file) => {
    if (image.naturalHeight <= 200 && image.naturalWidth <= 200) {
      this.uploadPhoto(image, file);
    } else {
      this.setUploadPhotoError('Images width and height can not be bigger than 200px');
    }
  };

  uploadPhoto = (image, file) => {
    const { itemImage } = this.props;

    this.setUploadPhotoError('');
    this.setState({ filePreviewPath: image.src, file });
    if (itemImage.id) {
      this.setState({ imageId: itemImage.id });
    }
  };

  setUploadPhotoError = (error) => {
    const errors = { ...this.state.errors };

    errors.uploadPhoto = error;
    this.setState({ errors });
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
  itemPropertyDefinitions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedItemType: PropTypes.string.isRequired,
  addOrUpdateItem: PropTypes.func.isRequired,
  handleCancelUpdate: PropTypes.func,
  updateMode: PropTypes.bool.isRequired,
  item: PropTypes.shape({ id: PropTypes.number }),
  itemImage: PropTypes.shape({ id: PropTypes.number }),
};

ItemPropertyDefinitionsFields.defaultProps = {
  classes: {},
  item: {},
  itemImage: {},
  handleCancelUpdate: () => {},
};

export default withStyles(styles)(ItemPropertyDefinitionsFields);
