import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import classNames from 'classnames';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ReactDOM from 'react-dom';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
    width: '200px',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '200px',
  },
});

const COLORS = ['RED', 'GREEN', 'BLUE'];
const GENDERS = ['MALE', 'WOMEN', 'JUNIOR', 'UNISEX'];
const PRODUCERS = ['ATOMIC', 'FISCHER', 'HEAD', 'ROSSIGNOLE', 'ELAN', 'BLIZZARD'];
const RACE_STYLES = ['ALL MOUNTAIN', 'ALL ROUND', 'RACE', 'CROSS', 'DOWNHILL'];


class ItemPropertyDefinitionsFields extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstColorWidth: 0,
      secondColorWidth: 0,
      genderWidth: 0,
      producerWidth: 0,
      raceStyleWidth: 0,
      firstColor: '',
      secondColor: '',
      gender: '',
      producer: '',
      raceStyle: '',
    };
  }

  componentDidMount = () => {
    this.setState({
      firstColorWidth: ReactDOM.findDOMNode(this.inputFirstColorLabel).offsetWidth,
      secondColorWidth: ReactDOM.findDOMNode(this.inputSecondColorLabel).offsetWidth,
      genderWidth: ReactDOM.findDOMNode(this.inputGenderLabel).offsetWidth,
      producerWidth: ReactDOM.findDOMNode(this.inputProducerLabel).offsetWidth,
      raceStyleWidth: ReactDOM.findDOMNode(this.inputRaceStyleLabel).offsetWidth,
    });
  };

  getColors = () => {
    const { firstColor, secondColor } = this.state;
    return COLORS
      .filter(color => color !== firstColor || secondColor)
      .map(color => <MenuItem value={color} key={color}>{color}</MenuItem>);
  };

  getGenders = () => GENDERS.map(gender => <MenuItem value={gender} key={gender}>{gender}</MenuItem>);

  getProducers = () => PRODUCERS.map(producer => <MenuItem value={producer} key={producer}>{producer}</MenuItem>);

  getRaceStyles = () => RACE_STYLES.map(raceStyle => <MenuItem value={raceStyle} key={raceStyle}>{raceStyle}</MenuItem>);

  handleSelectFirstColor = event => this.setState({ firstColor: event.target.value });

  handleSelectSecondColor = event => this.setState({ secondColor: event.target.value });

  handleSelectGender = event => this.setState({ gender: event.target.value });

  handleSelectProducer = event => this.setState({ producer: event.target.value });

    handleSelectRaceStyle = event => this.setState({ raceStyle: event.target.value });

    render() {
      const { classes, itemPropertyDefinitions, selectedItemType } = this.props;
      const {
        firstColorWidth,
        secondColorWidth,
        genderWidth,
        producerWidth,
        raceStyleWidth,
        firstColor,
        secondColor,
        gender,
        producer,
        raceStyle,
      } = this.state;

      return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
              {itemPropertyDefinitions
                .filter(propertyDefinition => propertyDefinition.itemType === selectedItemType)
                .filter(propertyDefinition => propertyDefinition.propertyName !== 'Color'
                    && propertyDefinition.propertyName !== 'Second color'
                    && propertyDefinition.propertyName !== 'Price'
                    && propertyDefinition.propertyName !== 'Length'
                    && propertyDefinition.propertyName !== 'Gender'
                    && propertyDefinition.propertyName !== 'Producer'
                    && propertyDefinition.propertyName !== 'Race style')
                .map((propertyDefinition, index) => <TextField
                  id="outlined-simple-start-adornment"
                  className={classNames(classes.margin)}
                  variant="outlined"
                  label={propertyDefinition.propertyName}
                  key={index}
              />)}

              <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-race-style-simple"
                              ref={(ref) => {
                                this.inputRaceStyleLabel = ref;
                              }}
                  >
                      Race style
                  </InputLabel>
                  <Select
                      value={raceStyle}
                      onChange={this.handleSelectRaceStyle}
                      input={
                          <OutlinedInput
                              name="race-style"
                              labelWidth={raceStyleWidth}
                              id="outlined-race-style-simple"
                          />
                      }
                  >
                      {this.getRaceStyles()}
                  </Select>
              </FormControl>

              <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-gender-simple"
                              ref={(ref) => {
                                this.inputGenderLabel = ref;
                              }}
                  >
                      Gender
                  </InputLabel>
                  <Select
                      value={gender}
                      onChange={this.handleSelectGender}
                      input={
                          <OutlinedInput
                              name="gender"
                              labelWidth={genderWidth}
                              id="outlined-gender-simple"
                          />
                      }
                  >
                      {this.getGenders()}
                  </Select>
              </FormControl>

              <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-producer-simple"
                              ref={(ref) => {
                                this.inputProducerLabel = ref;
                              }}
                  >
                      Producer
                  </InputLabel>
                  <Select
                      value={producer}
                      onChange={this.handleSelectProducer}
                      input={
                          <OutlinedInput
                              name="producer"
                              labelWidth={producerWidth}
                              id="outlined-producer-simple"
                          />
                      }
                  >
                      {this.getProducers()}
                  </Select>
              </FormControl>

              <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-color-simple"
                              ref={(ref) => {
                                this.inputFirstColorLabel = ref;
                              }}
                  >
                      Color
                  </InputLabel>
              <Select
                  value={firstColor}
                  onChange={this.handleSelectFirstColor}
                  input={
                      <OutlinedInput
                          name="color"
                          labelWidth={firstColorWidth}
                          id="outlined-color-simple"
                      />
                  }
              >
                  {this.getColors()}
              </Select>
              </FormControl>

              <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-second-color-simple"
                              ref={(ref) => {
                                this.inputSecondColorLabel = ref;
                              }}
                  >
                      Second color
                  </InputLabel>
                  <Select
                      value={secondColor}
                      onChange={this.handleSelectSecondColor}
                      input={
                          <OutlinedInput
                              name="color"
                              labelWidth={secondColorWidth}
                              id="outlined-second-color-simple"
                          />
                      }
                  >
                      {this.getColors()}
                  </Select>
              </FormControl>

              <TextField
                  id="length-textfield"
                  className={classNames(classes.margin)}
                  variant="outlined"
                  label={'Length'}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">CM</InputAdornment>,
                  }}
              />

              <TextField
                  id="price-textfield"
                  className={classNames(classes.margin)}
                  variant="outlined"
                  label={'Price'}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">PLN</InputAdornment>,
                  }}
              />
          </div>

      );
    }
}

ItemPropertyDefinitionsFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemPropertyDefinitionsFields);
