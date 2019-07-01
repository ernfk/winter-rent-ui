import UserService from '../services/user-service';
import * as SnackbarStatus from '../components/commons/snackbar-statuses';
import { showSnackbar } from './overview';
import makeActionCreator from '../utils/action-creator';

const userService = new UserService();

export const signUpUser = user => dispatch => userService.signUpUser(user)
  .then(() => {
    dispatch(showSnackbar(SnackbarStatus.INFO, 'User successfully added!'));
  })
  .catch((response) => {
    const message = response.response ? getMessage(response.response) : 'Problem with connection!';
    dispatch(showSnackbar(SnackbarStatus.ERROR, message));
  });

const getMessage = (response) => {
  if (response.data.status && response.data.status >= 400) {
    return 'Something went wrong... check the form!';
  }
  return response.response.data.message;
};

export const signIn = user => dispatch => userService.signIn(user)
  .then((response) => {
    const token = response.data.accessToken;

    dispatch(showSnackbar(SnackbarStatus.INFO, 'You are logged!'));
    dispatch(setUser(user.usernameOrEmail, token));
    window.localStorage.setItem('accessToken', token);
  })
  .catch((response) => {
    const message = response.response ? response.response.data.message : 'Problem with connection!';
    dispatch(showSnackbar(SnackbarStatus.ERROR, message));
  });

export const SET_USER = 'SET_USER';
const setUser = makeActionCreator(SET_USER, 'usernameOrEmail', 'accessToken');

export const logout = () => (dispatch) => {
  dispatch(setUser('', null));
  window.localStorage.removeItem('accessToken');
  dispatch(showSnackbar(SnackbarStatus.INFO, 'You have successfully logged out!'));
};

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
    .then(() => {
      dispatch(showSnackbar(SnackbarStatus.INFO, 'Your profile updated successfully'));
    })
    .catch((err) => {
      dispatch(showSnackbar(SnackbarStatus.ERROR, 'Something went wrong'));
    });
};
