import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, withStyles } from '@material-ui/core';
import styles from './update-item.style';
import ItemPropertyDefinitionsFields from '../item-property-definitions-fields/item-property-definitions-fields';
import * as ItemSelectors from '../../../selectors/items';
import * as ItemActions from '../../../actions/items';

class UpdateItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const { fetchItemsData } = this.props;
    fetchItemsData();
  };

  render() {
    const {
      itemPropertyDefinitions, item, handleCancelUpdate, updateItem,
    } = this.props;

    return (
      <div>
        <Typography style={styles.editItemTypography}> Update item </Typography>
        <ItemPropertyDefinitionsFields
          itemPropertyDefinitions={itemPropertyDefinitions}
          selectedItemType={item.type}
          addOrUpdateItem={updateItem}
          updateMode
          handleCancelUpdate={handleCancelUpdate}
          item={item}
        />
      </div>
    );
  }
}

UpdateItem.propTypes = {
  itemPropertyDefinitions: PropTypes.arrayOf(PropTypes.shape({})),
  fetchItemsData: PropTypes.func,
  item: PropTypes.shape({}),
  handleCancelUpdate: PropTypes.func,
  updateItem: PropTypes.func,
};

UpdateItem.defaultProps = {
  itemPropertyDefinitions: [],
  fetchItemsData: () => {},
  item: {},
  handleCancelUpdate: () => {},
  updateItem: () => {},
};

const mapStateToProps = state => ({
  itemPropertyDefinitions: ItemSelectors.getItemPropertyDefinitions(state),
});

const mapDispatchToProps = dispatch => ({
  fetchItemsData: () => {
    dispatch(ItemActions.fetchItemsData());
  },
  updateItem: (item) => {
    dispatch(ItemActions.updateItem(item));
  },
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UpdateItem));
