export const SET_EMAIL = 'SET_EMAIL';

// Action creators
export const setEmail = (email) => {
  return {
    type: SET_EMAIL,
    payload: email
  };
};