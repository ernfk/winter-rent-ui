const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#f5f5f5',
    color: '#000000',
  },
  adminPanelToolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
  snackbarSuccess: {
    backgroundColor: '#1a600d',
  },
  snackbarError: {
    backgroundColor: '#a83434',
  },
  buildIcon: {
    color: '#36383a',
    margin: '3px 7px 0px 0px',
  },
  adminPanelTitleContainer: {
    display: 'flex',
  },
  adminPanelTitle: {
    color: '#36383a',
  },
});

export default styles;
