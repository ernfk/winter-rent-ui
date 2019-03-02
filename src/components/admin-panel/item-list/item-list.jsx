import React from 'react';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Delete, Edit } from '@material-ui/icons/';
import styles from './item-list.style';
import * as ItemSelectors from '../../../selectors/items';
import * as ItemActions from '../../../actions/items';
import EditItem from '../edit-item/edit-item.jsx';


class ItemList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
  }

  componentDidMount() {
    const { fetchItems } = this.props;
    fetchItems();
  }

  handleDeleteItem = (itemId) => {
    // const { deleteItem } = this.props;
    // deleteItem(itemId);
  };

  handleOpenEditForm = (item) => {
    this.setState({ editMode: true, item });
  };

  render() {
    const { classes, items } = this.props;
    const { editMode, item } = this.state;

    return (
            <div style={styles.container}>
                <div style={styles.leftSide}>
                <Typography className={classes.listItemsTypography}> List of items </Typography>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow className={classes.row}>
                                <TableCell className={classes.headerCell}>Type</TableCell>
                                <TableCell className={classes.headerCell}>Model</TableCell>
                                <TableCell className={classes.headerCell}>Price</TableCell>
                                <TableCell className={classes.headerCell}>Model no.</TableCell>
                                <TableCell className={classes.headerCell}/>
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
                                                    <Delete/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Edit" placement="top">
                                                <IconButton color="primary"
                                                            className={classes.button}
                                                            onClick={() => this.handleOpenEditForm(item)}
                                                >
                                                    <Edit/>
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                {editMode && <EditItem item={item}/>}
            </div>
    );
  }
}

ItemList.propTypes = {
  classes: PropTypes.shape({}),
  fetchItems: PropTypes.func,
  deleteItem: PropTypes.func,
  items: PropTypes.array,
};

ItemList.defaultProps = {
  classes: {},
  items: [],
  fetchItems: () => {},
  deleteItem: () => {},
};

const mapStateToProps = state => ({
  items: ItemSelectors.getItems(state),
});

const mapDispatchToProps = dispatch => ({
  fetchItems: () => {
    dispatch(ItemActions.fetchItems());
  },
  deleteItem: (itemId) => {
    dispatch(ItemActions.deleteItem(itemId));
  },
});


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ItemList));
