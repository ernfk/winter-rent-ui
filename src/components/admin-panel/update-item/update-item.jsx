import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ItemPropertyDefinitionsFields from '../item-property-definitions-fields/item-property-definitions-fields';
import Title from '../../commons/title';
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
        <Title title="Update item" />
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateItem);
