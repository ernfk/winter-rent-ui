import UserService from '../services/user-service';

const userService = new UserService();

export const signUpUser = user => dispatch => userService.signUpUser(user)
  .then((response) => {
    console.log(response);
  });
