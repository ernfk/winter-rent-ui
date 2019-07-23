import UserService from '../services/user-service';
import * as SnackbarStatus from '../components/commons/snackbar-statuses';
import { showSnackbar } from './overview';
import makeActionCreator from '../utils/action-creator';

const userService = new UserService();

export const signUpUser = (user, history) => dispatch => userService.signUpUser(user)
  .then(() => {
    dispatch(showSnackbar(SnackbarStatus.INFO, 'User successfully added!'));
    dispatch(setUserSuccessfullyRegisteredStatus(true));
    history.push('/');
  })
  .catch((response) => {
    const message = response.response ? getMessage(response.response) : 'Problem with connection!';
    dispatch(showSnackbar(SnackbarStatus.ERROR, message));
  });

const USER_SUCCESSFULLY_REGISTERED = 'USER_SUCCESSFULLY_REGISTERED';
export const setUserSuccessfullyRegisteredStatus = makeActionCreator(USER_SUCCESSFULLY_REGISTERED, 'status');

const getMessage = (response) => {
  if (response.data.status && response.data.status >= 400) {
    return 'Something went wrong... check the form!';
  }
  return response.response.data.message;
};

export const signIn = (user, history) => dispatch => userService.signIn(user)
  .then((response) => {
    const token = response.data.accessToken;

    dispatch(showSnackbar(SnackbarStatus.INFO, 'You are logged!'));
    window.localStorage.setItem('accessToken', token);
    window.localStorage.setItem('usernameOrEmail', user.usernameOrEmail);
    history.push('/');
  })
  .then(() => userService.isUserAdmin(user.usernameOrEmail))
  .then(response => response.data && window.localStorage.setItem('isAdmin', response.data))
  .catch((response) => {
    const message = response.response ? response.response.data.message : 'Problem with connection!';
    dispatch(showSnackbar(SnackbarStatus.ERROR, message));
  });

export const logout = history => (dispatch) => {
  window.localStorage.clear();
  history.push('/');
  dispatch(clearUserProfile());
  dispatch(showSnackbar(SnackbarStatus.INFO, 'You have successfully logged out!'));
};

export const CLEAR_USER_PROFILE = 'CLEAR_USER_PROFILE';
const clearUserProfile = makeActionCreator(CLEAR_USER_PROFILE);

export const SET_USER_PROFILE = 'SET_USER_PROFILE';
const setUserProfile = makeActionCreator(SET_USER_PROFILE, 'userProfile');

export const getUserProfile = username => (dispatch) => {
  userService.getUserProfile(username)
    .then((response) => {
      dispatch(setUserProfile({ ...response.data, username }));
    });
};

export const updateUserProfile = (username, userProfile) => (dispatch) => {
  userService.updateUserProfile(username, userProfile)
    .then((response) => {
      dispatch(setUserProfile(response.data));
      dispatch(showSnackbar(SnackbarStatus.INFO, 'Your profile updated successfully'));
    })
    .catch((err) => {
      dispatch(showSnackbar(SnackbarStatus.ERROR, 'Something went wrong'));
    });
};
