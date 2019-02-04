import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
  },
});

const ItemPropertyDefinitionsFields = (props) => {
  console.log(props);
  const { classes } = props;
  return (
      <div>
          <TextField
              id="outlined-simple-start-adornment"
              className={classNames(classes.margin, classes.textField)}
              variant="outlined"
              label="With outlined TextField"
              InputProps={{
                startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
              }}
          />
      </div>
  );
};

ItemPropertyDefinitionsFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemPropertyDefinitionsFields);
