/* eslint-disable no-shadow */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  FormControl, InputLabel, MenuItem, OutlinedInput, Select, Typography, withStyles,
} from '@material-ui/core';
import ItemPropertyDefinitionsFields from './item-property-definitions-fields.jsx';
import * as ItemSelectors from '../../../selectors/items';
import * as ItemActions from '../../../actions/items';
import styles from './add-item.style';


class AddItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemType: '',
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
    this.setState({
      selectedItemType: event.target.value,
      itemPropertyDefinitionsFieldsOpen: true,
    });
  };

  getItemTypesMenuItems = () => {
    const { itemTypes } = this.props;
    return itemTypes
      .map(itemType => <MenuItem value={itemType} key={itemType}>{itemType}</MenuItem>);
  };


  render() {
    const { classes, itemPropertyDefinitions, addItem } = this.props;
    const { selectedItemType, itemPropertyDefinitionsFieldsOpen, labelWidth } = this.state;

    return (
        <div>
            <Typography style={styles.addItemTypography}> Add new item </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-itemType-simple"
                            ref={(ref) => {
                              this.InputLabelRef = ref;
                            }}
                >
                    Item type
                </InputLabel>
                <Select
                    value={selectedItemType}
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
                selectedItemType={selectedItemType}
                addOrUpdateItem={addItem}
            />}
        </div>
    );
  }
}

AddItem.propTypes = {
  classes: PropTypes.object.isRequired,
  itemTypes: PropTypes.array.isRequired,
  itemPropertyDefinitions: PropTypes.array.isRequired,
  fetchItemsData: PropTypes.func,
  addItem: PropTypes.func,
};

const mapStateToProps = state => ({
  itemTypes: ItemSelectors.getItemTypes(state),
  itemPropertyDefinitions: ItemSelectors.getItemPropertyDefinitions(state),
});

const mapDispatchToProps = dispatch => ({
  fetchItemsData: () => {
    dispatch(ItemActions.fetchItemsData());
  },
  addItem: (item) => {
    dispatch(ItemActions.addItem(item));
  },
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AddItem));
