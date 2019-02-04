/* eslint-disable no-shadow */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { connect } from 'react-redux';
import { getItemTypes } from '../../selectors/items';
import { fetchItemsData } from '../../actions/items';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 150,
  },
});

class AddItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      itemType: '',
    };
  }

  componentDidMount = () => {
    const { fetchItemsData } = this.props;
    fetchItemsData();
  };

  handleSelectItemType = (event) => {
    this.setState({ itemType: event.target.value });
  };

  getItemTypesMenuItems = () => {
    const { itemTypes } = this.props;
    return itemTypes
      .map((itemType, index) => <MenuItem value={index} key={itemType}>{itemType}</MenuItem>);
  };

  render() {
    const { classes } = this.props;
    const { itemType } = this.state;

    return (
        <div>
            <Typography style={{ paddingLeft: '9px', fontSize: '18px' }}> Add new item </Typography>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="itemType">Item type</InputLabel>
                <Select
                    value={itemType}
                    onChange={this.handleSelectItemType}
                    inputProps={{ name: 'itemType', id: 'itemType' }}
                >
                    {this.getItemTypesMenuItems()}
                </Select>
            </FormControl>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  itemTypes: getItemTypes(state),
});

const mapDispatchToProps = dispatch => ({
  fetchItemsData: () => {
    dispatch(fetchItemsData());
  },
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AddItem));
