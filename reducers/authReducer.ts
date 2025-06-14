import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, EDIT_PROFILE } from '../actions/authActions';

interface AuthState {
  isSignedIn: boolean;
  isOnBoard: boolean;
  user: any | null;
  error: string | null;
  
}

const initialState: AuthState = {
  isSignedIn: false,
  isOnBoard: false,
  user: null,
  error: null,
};

export default function authReducer(state = initialState, action: any) {
  console.log(state)
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isSignedIn: true,
        user: action.payload,
        error: null
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isSignedIn: false,
        user: null,
        error: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        isSignedIn: false,
        user: null,
        error: null
      };
    case 'EDIT_PROFILE':
      console.log('user: ', {
          ...state.user,
          ...action.payload
        });
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    case 'ONBOARD':
      return {
        ...state,
        isOnBoard: action.payload
      }
    default:
      return state;
  }
}
