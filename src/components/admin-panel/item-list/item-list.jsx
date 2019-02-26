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


class ItemList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchItems } = this.props;
    fetchItems();
  }

  handleDeleteItem = (itemId) => {
    const { deleteItem } = this.props;
    deleteItem(itemId);
  };

  render() {
    const { classes, items } = this.props;


    return (
            <div>
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
                                    <TableCell component="th" scope="item">
                                        {item.type}
                                    </TableCell>
                                    <TableCell align="right">{item.model}</TableCell>
                                    <TableCell align="right">{item.price}</TableCell>
                                    <TableCell align="right">{item.modelNo}</TableCell>
                                    <TableCell align="right">
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
