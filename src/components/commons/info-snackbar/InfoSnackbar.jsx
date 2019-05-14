import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Snackbar, SnackbarContent, withStyles } from '@material-ui/core';
import * as SnackbarStatus from '../snackbar-statuses';
import * as OverviewSelectors from '../../../selectors/overview';
import * as OverviewActions from '../../../actions/overview';
import styles from './InfoSnackbar.style';

class InfoSnackbar extends React.Component {

  handleClose = () => {
    const { closeUserSnackbar } = this.props;
    closeUserSnackbar();
  };

  render() {
    const {
      classes, snackbarOpenStatus, snackbarInfoType, snackbarMessage,
    } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackbarOpenStatus}
        autoHideDuration={3000}
        onClose={this.handleClose}
      >
        <SnackbarContent
          classes={{
            root: snackbarInfoType === SnackbarStatus.INFO
              ? classes.snackbarSuccess : classes.snackbarError,
          }}
          message={<span>{snackbarMessage}</span>}
        />
      </Snackbar>
    );
  }
}

InfoSnackbar.propTypes = {
  classes: PropTypes.shape({}),
  closeUserSnackbar: PropTypes.func,
  snackbarInfoType: PropTypes.string,
  snackbarMessage: PropTypes.string,
  snackbarOpenStatus: PropTypes.bool,
};

InfoSnackbar.defaultProps = {
  classes: {},
  closeUserSnackbar: () => {},
  snackbarInfoType: '',
  snackbarMessage: '',
  snackbarOpenStatus: false,
};

const mapStateToProps = state => ({
  snackbarInfoType: OverviewSelectors.getSnackbarInfoType(state),
  snackbarMessage: OverviewSelectors.getSnackbarMessage(state),
  snackbarOpenStatus: OverviewSelectors.getSnackbarOpenStatus(state),
});

const mapDispatchToProps = dispatch => ({
  closeUserSnackbar: () => {
    dispatch(OverviewActions.closeSnackbar());
  },
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(InfoSnackbar));
