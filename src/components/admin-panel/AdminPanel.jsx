import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import {
  AddBox as AddIcon,
  BuildOutlined as LogoIcon,
  Storage as ReservationIcon,
  ViewList as ViewListIcon,
} from '@material-ui/icons';
import AddItem from './add-item/AddItem';
import ItemList from './item-list/ItemList';
import Reservations from './reservations/Reservations';
import styles from './AdminPanel.style';
import ExitButton from '../commons/exit-button/ExitButton';
import Info, { InfoTypes } from '../commons/info/Info';
import InfoSnackbar from '../commons/info-snackbar/InfoSnackbar';

class AdminPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentOpenContent: '',
    };
  }

  handleOpenContent = (value) => {
    this.setState({ currentOpenContent: value });
  };

  getContent = () => {
    const { currentOpenContent } = this.state;
    if (currentOpenContent === 'addItem') {
      return <AddItem />;
    } if (currentOpenContent === 'showAllItems') {
      return <ItemList />;
    } if (currentOpenContent === 'showReservations') {
      return <Reservations />;
    }
    return <Typography variant="h5">Welcome to Admin Panel</Typography>;
  };

  render() {
    const { classes, history } = this.props;
    const isUserLogged = window.localStorage.getItem('accessToken');

    return (
      !isUserLogged ? (
        <Info
          title="Unauthorized"
          history={history}
          type={InfoTypes.UNAUTHORIZED}
        />
      )
        : (
          <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar className={classes.adminPanelToolbar}>
                <div className={classes.adminPanelTitleContainer}>
                  <LogoIcon classes={{ root: classes.buildIcon }} />
                  <Typography variant="h6" className={classes.adminPanelTitle}>
                    {'Admin Panel'}
                  </Typography>
                </div>
                <ExitButton history={history} />
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
                  <ListItemText primary="Add new item" />
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                </ListItem>
                <ListItem button onClick={() => this.handleOpenContent('showAllItems')}>
                  <ListItemText primary="Items" />
                  <ListItemIcon>
                    <ViewListIcon />
                  </ListItemIcon>
                </ListItem>
                <Divider />
                <ListItem button onClick={() => this.handleOpenContent('showReservations')} disabled>
                  <ListItemText primary="Reservations" />
                  <ListItemIcon>
                    <ReservationIcon />
                  </ListItemIcon>
                </ListItem>
              </List>
            </Drawer>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              {this.getContent()}
            </main>
            <InfoSnackbar />
          </div>
        )
    );
  }
}

AdminPanel.propTypes = {
  classes: PropTypes.shape({}),
  history: PropTypes.shape({}),
};

AdminPanel.defaultProps = {
  classes: {},
  history: {},
};

export default withStyles(styles)((withRouter(AdminPanel)));
