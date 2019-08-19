import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ItemPropertyDefinitionsFields from '../item-property-definitions-fields/ItemPropertyDefinitionsFields';
import Title from '../../commons/title/Title';
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
      itemPropertyDefinitions,
      item,
      handleCancelUpdate,
      updateItem,
      itemImage,
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
          itemImage={itemImage}
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
  itemImage: PropTypes.shape({}),
};

UpdateItem.defaultProps = {
  itemPropertyDefinitions: [],
  fetchItemsData: () => {},
  item: {},
  handleCancelUpdate: () => {},
  updateItem: () => {},
  itemImage: {},
};

const mapStateToProps = state => ({
  itemPropertyDefinitions: ItemSelectors.getItemPropertyDefinitions(state),
});

const mapDispatchToProps = dispatch => ({
  fetchItemsData: () => {
    dispatch(ItemActions.fetchItemsData());
  },
  updateItem: (item, file, imageId) => {
    dispatch(ItemActions.updateItem(item, file, imageId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateItem);
