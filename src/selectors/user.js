/* eslint-disable import/prefer-default-export */
export const getCurrentUsernameOrEmail = () => window.localStorage.getItem('usernameOrEmail');
export const getCurrentUserProfile = state => state.user.userProfile;
export const isUserSuccessfullyRegistered = state => state.isUserSuccessfullyRegisteredStatus;
