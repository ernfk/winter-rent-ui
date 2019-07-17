import React from 'react';
import {
  IconButton, Table, TableBody, TableCell,
  TableHead, TableRow, Tooltip, withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Delete, Edit } from '@material-ui/icons/';
import UpdateItem from '../update-item/UpdateItem';
import Title from '../../commons/title/Title';
import styles from './ItemList.style';
import * as ItemSelectors from '../../../selectors/items';
import * as ItemActions from '../../../actions/items';

class ItemList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      updateMode: false,
      item: {},
    };
  }

  componentDidMount() {
    const { fetchItems } = this.props;
    const accessToken = window.localStorage.getItem('accessToken');
    fetchItems(accessToken);
  }

  handleDeleteItem = (itemId) => {
    const { deleteItem, itemImage } = this.props;
    deleteItem(itemId, itemImage.id);
  };

  handleOpenUpdateItem = (item) => {
    const { getImageByItemId } = this.props;
    getImageByItemId(item.id)
      .then(() => {
        this.setState({ updateMode: true, item });
      });
  };

  handleCancelUpdate = () => {
    this.setState({ updateMode: false });
  };

  render() {
    const { classes, items, itemImage } = this.props;
    const { updateMode, item } = this.state;

    return (
      <div style={styles.container}>
        <div style={styles.leftSide}>
          <Title title="List of items" />
          <Table className={classes.table}>
            <TableHead>
              <TableRow className={classes.row}>
                <TableCell className={classes.headerCell}>Type</TableCell>
                <TableCell className={classes.headerCell}>Model</TableCell>
                <TableCell className={classes.headerCell}>Price</TableCell>
                <TableCell className={classes.headerCell}>Model no.</TableCell>
                <TableCell className={classes.headerCell} />
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(item => (
                <TableRow key={item.id}>
                  <TableCell className={classes.tableCell}>
                    {item.type}
                  </TableCell>
                  <TableCell className={classes.tableCell}>{item.model}</TableCell>
                  <TableCell className={classes.tableCell}>{item.price}</TableCell>
                  <TableCell className={classes.tableCell}>{item.modelNo}</TableCell>
                  <TableCell className={classes.tableActionCell}>
                    <div className={classes.buttonsContainer}>
                      <Tooltip title="Delete" placement="top">
                        <IconButton
                          color="primary"
                          className={classes.buttonDelete}
                          onClick={() => this.handleDeleteItem(item.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Update" placement="top">
                        <IconButton
                          color="primary"
                          className={classes.button}
                          onClick={() => this.handleOpenUpdateItem(item)}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {updateMode && (
        <UpdateItem
          item={item}
          handleCancelUpdate={this.handleCancelUpdate}
          itemImage={itemImage}
        />
        )}
      </div>
    );
  }
}

ItemList.propTypes = {
  classes: PropTypes.shape({}),
  fetchItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  getImageByItemId: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  itemImage: PropTypes.shape({}).isRequired,
};

ItemList.defaultProps = {
  classes: {},
};

const mapStateToProps = state => ({
  items: ItemSelectors.getItems(state),
  itemImage: ItemSelectors.getItemImage(state),
});

const mapDispatchToProps = dispatch => ({
  fetchItems: (accessToken) => {
    dispatch(ItemActions.fetchItems(accessToken));
  },
  deleteItem: (itemId, imageId) => {
    dispatch(ItemActions.deleteItem(itemId, imageId));
  },
  getImageByItemId: itemId => dispatch(ItemActions.getImageByItemId(itemId)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ItemList));
