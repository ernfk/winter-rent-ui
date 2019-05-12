import UserService from '../services/user-service';
import makeActionCreator from '../utils/action-creator';
import * as SnackbarStatus from '../components/commons/snackbar-statuses';

const userService = new UserService();

export const SHOW_USER_SNACKBAR = 'SHOW_USER_SNACKBAR';
const showUserSnackbar = makeActionCreator(SHOW_USER_SNACKBAR, 'typeMessage', 'message');

export const CLOSE_USER_SNACKBAR = 'CLOSE_USER_SNACKBAR';
export const closeUserSnackbar = makeActionCreator(CLOSE_USER_SNACKBAR);

export const signUpUser = user => dispatch => userService.signUpUser(user)
  .then(() => {
    dispatch(showUserSnackbar(SnackbarStatus.INFO, 'User successfully added!'));
  })
  .catch(response => dispatch(showUserSnackbar(SnackbarStatus.ERROR, response.response.data.message)));
