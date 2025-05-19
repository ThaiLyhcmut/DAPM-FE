// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

// Action Creators
export const loginSuccess = (userData: any) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userData
  };
};

export const loginFail = (error: string) => {
  return {
    type: LOGIN_FAIL,
    payload: error
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};
