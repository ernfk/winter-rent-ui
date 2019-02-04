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


class ItemPropertyDefinitionsFields extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstColorWidth: 0,
      secondColorWidth: 0,
      selectedFirstColor: '',
      selectedSecondColor: '',
    };
  }

  componentDidMount = () => {
    this.setState({
      firstColorWidth: ReactDOM.findDOMNode(this.inputFirstColorLabel).offsetWidth,
      secondColorWidth: ReactDOM.findDOMNode(this.inputSecondColorLabel).offsetWidth,
    });
  };

  getColors = () => COLORS
    .filter(color => color !== this.state.selectedFirstColor || this.state.selectedSecondColor)
    .map(color => <MenuItem value={color} key={color}>{color}</MenuItem>);

  handleSelectFirstColor = event => this.setState({ selectedFirstColor: event.target.value });

  handleSelectSecondColor = event => this.setState({ selectedSecondColor: event.target.value });

  render() {
    const { classes, itemPropertyDefinitions, selectedItemType } = this.props;
    const {
      firstColorWidth,
      secondColorWidth,
      selectedFirstColor,
      selectedSecondColor,
    } = this.state;

    return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
              {itemPropertyDefinitions
                .filter(propertyDefinition => propertyDefinition.itemType === selectedItemType)
                .filter(propertyDefinition => propertyDefinition.propertyName !== 'Color'
                    && propertyDefinition.propertyName !== 'Second color'
                    && propertyDefinition.propertyName !== 'Price'
                    && propertyDefinition.propertyName !== 'Length')
                .map((propertyDefinition, index) => <TextField
                  id="outlined-simple-start-adornment"
                  className={classNames(classes.margin)}
                  variant="outlined"
                  label={propertyDefinition.propertyName}
                  key={index}
              />)}

              <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-color-simple"
                              ref={(ref) => {
                                this.inputFirstColorLabel = ref;
                              }}
                  >
                      Color
                  </InputLabel>
              <Select
                  value={selectedFirstColor}
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
                      value={selectedSecondColor}
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
