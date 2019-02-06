import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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

  handleClearFields = () => {
    this.setState(initialState);
  };

  getInputProps = (itemPropertyDefinition) => {
    const { adornment } = itemPropertyDefinition.fieldProperties;
    const inputProps = {};
    if (adornment.value !== '') {
      inputProps.endAdornment = <InputAdornment
              position={adornment.position}>
              {adornment.value}
          </InputAdornment>;
    }
    return inputProps;
  };

  getTextFields = () => {
    const { itemPropertyDefinitions, classes, selectedItemType } = this.props;

    return itemPropertyDefinitions
      .filter(ipd => ipd.fieldProperties.fieldType === 'textfield' && selectedItemType === ipd.itemType)
      .sort((a, b) => a.fieldProperties.sortNo - b.fieldProperties.sortNo)
      .map((ipd, index) => {
        const { stateRef } = ipd.fieldProperties;
        return <TextField
              id={`${stateRef}-textfield`}
              className={classNames(classes.formControl)}
              label={ipd.propertyName}
              InputProps={this.getInputProps(ipd)}
              key={index}
              onChange={this.handleChange(stateRef)}
              value={this.state[stateRef]}
          />;
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
        <Button variant="contained" className={classes.button} disabled>
            <SaveIcon className={classes.leftIcon} />
            Save
        </Button>
        <Button variant="outlined" className={classes.clearButton} onClick={this.handleClearFields}>
            <ClearIcon className={classes.leftIcon} />
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
