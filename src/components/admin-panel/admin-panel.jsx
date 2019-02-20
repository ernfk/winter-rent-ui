import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  AppBar,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  SnackbarContent,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import {
  AddBox as AddIcon, ExitToApp as ExitIcon, ViewList, BuildOutlined,
} from '@material-ui/icons';
import { connect } from 'react-redux';
import AddItem from './add-item/add-item.jsx';
import styles from './admin-panel.style';
import ItemList from './item-list/item-list.jsx';
import * as SnackbarStatus from '../commons/snackbar-statuses';
import * as ItemActions from '../../actions/items';
import * as ItemSelectors from '../../selectors/items';


class AdminPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentOpenContent: '',
    };
  }

  handleBackToApp = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleOpenContent = (value) => {
    this.setState({ currentOpenContent: value });
  };

  getContent = () => {
    const { currentOpenContent } = this.state;
    if (currentOpenContent === 'addItem') {
      return <AddItem/>;
    } if (currentOpenContent === 'showAllItems') {
      return <ItemList />;
    }
    return <Typography variant="h5">Welcome to Admin Panel</Typography>;
  };

    handleCloseSnackbar = () => {
      const { closeSnackbar } = this.props;
      closeSnackbar();
    };

    render() {
      const {
        classes, snackbarOpenStatus, snackbarMessage, snackbarInfoType,
      } = this.props;

      return (
       <div className={classes.root}>
           <CssBaseline />
           <AppBar position="fixed" className={classes.appBar}>
               <Toolbar className={classes.adminPanelToolbar}>
                   <div className={classes.adminPanelTitleContainer}>
                       <BuildOutlined classes={{ root: classes.buildIcon }}/>
                       <Typography variant="h6" className={classes.adminPanelTitle}>
                           Admin Panel
                       </Typography>
                   </div>
                   <IconButton
                       onClick={this.handleBackToApp}
                       color="inherit"
                   >
                       <ExitIcon classes={{ root: classes.exitIcon }}/>
                   </IconButton>
               </Toolbar>
           </AppBar>
           <Drawer
               className={classes.drawer}
               variant="permanent"
               classes={{ paper: classes.drawerPaper }}
           >
               <div className={classes.toolbar} />
               <List>
                       <ListItem button onClick={() => this.handleOpenContent('addItem')}>
                           <ListItemText primary={'Add new item'} />
                           <ListItemIcon>
                               <AddIcon />
                           </ListItemIcon>
                       </ListItem>
                   <ListItem button onClick={() => this.handleOpenContent('showAllItems')}>
                       <ListItemText primary={'Show all items'} />
                       <ListItemIcon>
                           <ViewList />
                       </ListItemIcon>
                   </ListItem>
               </List>
           </Drawer>
           <main className={classes.content}>
               <div className={classes.toolbar} />
                   {this.getContent()}
           </main>
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
                   classes={{ root: snackbarInfoType === SnackbarStatus.INFO ? classes.snackbarSuccess : classes.snackbarError }}
                   message={<span>{snackbarMessage}</span>}
               />
           </Snackbar>
       </div>
      );
    }
}

AdminPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  closeSnackbar: PropTypes.func,
  snackbarInfoType: PropTypes.string,
  snackbarMessage: PropTypes.string,
  snackbarOpenStatus: PropTypes.bool,
};

const mapStateToProps = state => ({
  snackbarInfoType: ItemSelectors.getSnackbarInfoType(state),
  snackbarMessage: ItemSelectors.getSnackbarMessage(state),
  snackbarOpenStatus: ItemSelectors.getSnackbarOpenStatus(state),
});

const mapDispatchToProps = dispatch => ({
  closeSnackbar: () => {
    dispatch(ItemActions.closeSnackbar());
  },
});


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminPanel)));
