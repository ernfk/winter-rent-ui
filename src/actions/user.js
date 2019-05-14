import UserService from '../services/user-service';
import * as SnackbarStatus from '../components/commons/snackbar-statuses';
import { showSnackbar } from './overview';

const userService = new UserService();

export const signUpUser = user => dispatch => userService.signUpUser(user)
  .then(() => {
    dispatch(showSnackbar(SnackbarStatus.INFO, 'User successfully added!'));
  })
  .catch((response) => {
    const message = response.response ? response.response.data.message : 'Problem with connection!';
    dispatch(showSnackbar(SnackbarStatus.ERROR, message));
  });
