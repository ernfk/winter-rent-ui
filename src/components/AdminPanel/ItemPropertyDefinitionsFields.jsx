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
    if (adornment.value !== '') {
      return {
        endAdornment: <InputAdornment
              position={adornment.position}>
              {adornment.value}
          </InputAdornment>,
      };
    }
    return {};
  };

  getTextFields = () => {
    const { itemPropertyDefinitions, classes, selectedItemType } = this.props;

    return itemPropertyDefinitions
      .filter(ipd => ipd.fieldProperties.fieldType === 'textfield' && selectedItemType === ipd.itemType)
      .map((ipd, index) => {
        const propertyName = ipd.fieldProperties.stateRef;
        return <TextField
              id={`${propertyName}-textfield`}
              className={classNames(classes.formControl)}
              label={ipd.propertyName}
              InputProps={this.getInputProps(ipd)}
              key={index}
              onChange={this.handleChange(propertyName)}
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
        const propertyName = ipd.fieldProperties.stateRef;
        return <FormControl className={classes.formControl} key={index}>
                    <InputLabel htmlFor={`select-${propertyName}`}>
                        {ipd.propertyName}
                    </InputLabel>
                    <Select
                        value={this.state[propertyName]}
                        onChange={this.handleChange(propertyName)}
                        input={
                            <Input
                                name={`select-${propertyName}`}
                                id={`select-${propertyName}`}
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
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
