import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, withStyles } from '@material-ui/core';
import styles from './update-item.style';
import ItemPropertyDefinitionsFields from '../add-item/item-property-definitions-fields.jsx';
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
      const { itemPropertyDefinitions, item, handleCancelUpdate } = this.props;

      return (
            <div>
                <Typography style={styles.editItemTypography}> Update item </Typography>
                <ItemPropertyDefinitionsFields
                    itemPropertyDefinitions={itemPropertyDefinitions}
                    selectedItemType={item.type}
                    addOrUpdateItem={() => {
                    }}
                    updateMode
                    handleCancelUpdate={handleCancelUpdate}
                    item={item}
                />
            </div>
      );
    }
}

UpdateItem.propTypes = {
  itemPropertyDefinitions: PropTypes.array.isRequired,
  fetchItemsData: PropTypes.func,
  item: PropTypes.shape({}),
  handleCancelUpdate: PropTypes.func,
};

const mapStateToProps = state => ({
  itemPropertyDefinitions: ItemSelectors.getItemPropertyDefinitions(state),
});

const mapDispatchToProps = dispatch => ({
  fetchItemsData: () => {
    dispatch(ItemActions.fetchItemsData());
  },
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UpdateItem));
