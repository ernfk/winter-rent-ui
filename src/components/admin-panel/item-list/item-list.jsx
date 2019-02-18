import React from 'react';
import {
  Typography, withStyles, Paper, Table, TableBody, TableHead, TableRow, TableCell,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

  render() {
    const { classes, items } = this.props;


    return (
            <div>
                <Typography className={classes.listItemsTypography}> List of items </Typography>
                <Paper className={classes.paperRoot}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell align="right">Model</TableCell>
                                <TableCell align="right">Price</TableCell>
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
    );
  }
}

ItemList.propTypes = {
  classes: PropTypes.shape({}),
  fetchItems: PropTypes.func,
  items: PropTypes.array,
};

ItemList.defaultProps = {
  classes: {},
  items: [],
  fetchItems: () => {},
};

const mapStateToProps = state => ({
  items: ItemSelectors.getItems(state),
});

const mapDispatchToProps = dispatch => ({
  fetchItems: () => {
    dispatch(ItemActions.fetchItems());
  },
});


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ItemList));
