import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import styles from './edit-item.style';


class EditItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
        <Typography style={styles.editItemTypography}> Edit item </Typography>
        </div>
    );
  }
}

export default withStyles(styles)(EditItem);
