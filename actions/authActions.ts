// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const ONBOARD = 'ONBOARD'; // Thêm action type này

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

export const editProfile = (userData: any) => {
  return {
    type: EDIT_PROFILE,
    payload: userData
  };
};

export const onBoard = (onBoard: boolean) => {
  return {
    type: ONBOARD,
    payload: onBoard
  }
}