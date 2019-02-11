/* eslint-disable no-shadow */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { connect } from 'react-redux';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ItemPropertyDefinitionsFields from './item-property-definitions-fields.jsx';
import * as ItemSelectors from '../../selectors/items';
import { addItem, closeSnackbar, fetchItemsData } from '../../actions/items';
import styles from './add-item.style';


class AddItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemType: '',
      itemPropertyDefinitionsFieldsOpen: false,
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

  handleCloseSnackbar = () => {
    const { closeSnackbar } = this.props;
    closeSnackbar();
  };

  render() {
    const {
      classes, itemPropertyDefinitions, snackbarOpenStatus, snackbarMessage, addItem, snackbarInfoType,
    } = this.props;
    const { selectedItemType, itemPropertyDefinitionsFieldsOpen, labelWidth } = this.state;

    return (
        <div>
            <Typography style={styles.addItemTypography}> Add new item </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-itemType-simple"
                            ref={(ref) => {
                              this.InputLabelRef = ref;
                            }}
                >
                    Item type
                </InputLabel>
                <Select
                    value={selectedItemType}
                    onChange={this.handleSelectItemType}
                    input={
                        <OutlinedInput
                            name="itemType"
                            labelWidth={labelWidth}
                            id="outlined-itemType-simple"
                        />
                    }
                >
                    {this.getItemTypesMenuItems()}
                </Select>
            </FormControl>
            {itemPropertyDefinitionsFieldsOpen
            && <ItemPropertyDefinitionsFields
                itemPropertyDefinitions={itemPropertyDefinitions}
                selectedItemType={selectedItemType}
                addItem={addItem}
            />}
            <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                open={snackbarOpenStatus}
                autoHideDuration={3000}
                onClose={this.handleCloseSnackbar}
            >
                <SnackbarContent
                    classes={{ root: snackbarInfoType === 'info' ? classes.snackbarSuccess : classes.snackbarError }}
                    message={<span>{snackbarMessage}</span>}
                />
            </Snackbar>
        </div>
    );
  }
}

AddItem.propTypes = {
  classes: PropTypes.object.isRequired,
  itemTypes: PropTypes.array.isRequired,
  itemPropertyDefinitions: PropTypes.array.isRequired,
  fetchItemsData: PropTypes.func,
  addItem: PropTypes.func,
  closeSnackbar: PropTypes.func,
  snackbarInfoType: PropTypes.string,
  snackbarMessage: PropTypes.string,
  snackbarOpenStatus: PropTypes.bool,
};

const mapStateToProps = state => ({
  itemTypes: ItemSelectors.getItemTypes(state),
  itemPropertyDefinitions: ItemSelectors.getItemPropertyDefinitions(state),
  snackbarInfoType: ItemSelectors.getSnackbarInfoType(state),
  snackbarMessage: ItemSelectors.getSnackbarMessage(state),
  snackbarOpenStatus: ItemSelectors.getSnackbarOpenStatus(state),
});

const mapDispatchToProps = dispatch => ({
  fetchItemsData: () => {
    dispatch(fetchItemsData());
  },
  addItem: (item) => {
    dispatch(addItem(item));
  },
  closeSnackbar: () => {
    dispatch(closeSnackbar());
  },
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AddItem));
