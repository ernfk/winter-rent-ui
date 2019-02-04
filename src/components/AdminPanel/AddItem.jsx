/* eslint-disable no-shadow */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { connect } from 'react-redux';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ItemPropertyDefinitionsFields from './ItemPropertyDefinitionsFields.jsx';
import * as ItemSelectors from '../../selectors/items';
import { fetchItemsData } from '../../actions/items';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 150,
  },
});

class AddItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      itemType: '',
      itemPropertyDefinitionsFieldsOpen: false,
      labelWidth: 0,
    };
  }

  componentDidMount = () => {
    this.setState({ labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth });
    const { fetchItemsData } = this.props;
    fetchItemsData();
  };

  handleSelectItemType = (event) => {
    this.setState({ itemType: event.target.value, itemPropertyDefinitionsFieldsOpen: true });
  };

  getItemTypesMenuItems = () => {
    const { itemTypes } = this.props;
    return itemTypes
      .map(itemType => <MenuItem value={itemType} key={itemType}>{itemType}</MenuItem>);
  };

  render() {
    const { classes, itemPropertyDefinitions } = this.props;
    const { itemType, itemPropertyDefinitionsFieldsOpen, labelWidth } = this.state;

    return (
        <div>
            <Typography style={{ padding: '0 0 5px 9px', fontSize: '18px' }}> Add new item </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-itemType-simple"
                            ref={(ref) => {
                              this.InputLabelRef = ref;
                            }}
                >
                    Item type
                </InputLabel>
                <Select
                    value={itemType}
                    onChange={this.handleSelectItemType}
                    input={
                        <OutlinedInput
                            name="itemType"
                            labelWidth={labelWidth}
                            id="outlined-itemType-simple"
                        />
                    }
                >
                    {this.getItemTypesMenuItems()}
                </Select>
            </FormControl>
            {itemPropertyDefinitionsFieldsOpen
            && <ItemPropertyDefinitionsFields
                itemPropertyDefinitions={itemPropertyDefinitions}
                itemType={itemType}
            />}
        </div>
    );
  }
}

AddItem.propTypes = {
  classes: PropTypes.object.isRequired,
  itemTypes: PropTypes.array.isRequired,
  itemPropertyDefinitions: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  itemTypes: ItemSelectors.getItemTypes(state),
  itemPropertyDefinitions: ItemSelectors.getItemPropertyDefinitions(state),
});

const mapDispatchToProps = dispatch => ({
  fetchItemsData: () => {
    dispatch(fetchItemsData());
  },
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AddItem));
