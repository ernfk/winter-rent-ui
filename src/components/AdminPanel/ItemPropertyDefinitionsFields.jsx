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

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '200px',
  },
});

class ItemPropertyDefinitionsFields extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
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

  render() {
    return (
          <div style={{ display: 'grid', gridColumnGap: '40px', gridTemplateColumns: '200px 200px' }}>
              {this.getTextFields()}
              {this.getSelectFields()}
          </div>
    );
  }
}

ItemPropertyDefinitionsFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemPropertyDefinitionsFields);
