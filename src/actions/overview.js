import makeActionCreator from '../utils/action-creator';

export const SHOW_SNACKBAR = 'SHOW_SNACKBAR';
export const showSnackbar = makeActionCreator(SHOW_SNACKBAR, 'typeMessage', 'message');

export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const closeSnackbar = makeActionCreator(CLOSE_SNACKBAR);
