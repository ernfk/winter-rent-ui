import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

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

  handleSelectItemType = (event) => {
    this.setState({ itemType: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { itemType } = this.state;

    return (
        <div>
            <Typography> Add new item </Typography>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="itemType">Item type</InputLabel>
                <Select
                    value={itemType}
                    onChange={this.handleSelectItemType}
                    inputProps={{
                      name: 'itemType',
                      id: 'itemType',
                    }}
                >
                    <MenuItem value={'SKI'}>SKI</MenuItem>
                    <MenuItem value={'BOARD'}>BOARD</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
  }
}

export default withStyles(styles)(AddItem);
