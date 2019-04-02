/* eslint-disable no-shadow */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  FormControl, InputLabel, MenuItem, OutlinedInput, Select, withStyles,
} from '@material-ui/core';
import ItemPropertyDefinitionsFields from '../item-property-definitions-fields/ItemPropertyDefinitionsFields';
import Title from '../../commons/title/Title';
import * as ItemSelectors from '../../../selectors/items';
import * as ItemActions from '../../../actions/items';
import styles from './AddItem.style';

class AddItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemType: 'SKI',
      itemPropertyDefinitionsFieldsOpen: true,
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
        <Title title="Add new item" />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            htmlFor="outlined-itemType-simple"
            ref={(ref) => {
              this.InputLabelRef = ref;
            }}
          >
            {'Item type'}
          </InputLabel>
          <Select
            value={selectedItemType}
            onChange={this.handleSelectItemType}
            input={(
              <OutlinedInput
                name="itemType"
                labelWidth={labelWidth}
                id="outlined-itemType-simple"
              />
            )}
          >
            {this.getItemTypesMenuItems()}
          </Select>
        </FormControl>
        {itemPropertyDefinitionsFieldsOpen
            && (
            <ItemPropertyDefinitionsFields
              itemPropertyDefinitions={itemPropertyDefinitions}
              selectedItemType={selectedItemType}
              addOrUpdateItem={addItem}
              updateMode={false}
            />
            )}
      </div>
    );
  }
}

AddItem.propTypes = {
  classes: PropTypes.shape({}),
  itemTypes: PropTypes.arrayOf(PropTypes.string),
  itemPropertyDefinitions: PropTypes.arrayOf(PropTypes.shape({})),
  fetchItemsData: PropTypes.func,
  addItem: PropTypes.func,
};

AddItem.defaultProps = {
  classes: {},
  itemTypes: [],
  itemPropertyDefinitions: [],
  fetchItemsData: () => {},
  addItem: () => {},
};

const mapStateToProps = state => ({
  itemTypes: ItemSelectors.getItemTypes(state),
  itemPropertyDefinitions: ItemSelectors.getItemPropertyDefinitions(state),
});

const mapDispatchToProps = dispatch => ({
  fetchItemsData: () => {
    dispatch(ItemActions.fetchItemsData());
  },
  addItem: (item, file) => {
    dispatch(ItemActions.addItem(item, file));
  },
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AddItem));
