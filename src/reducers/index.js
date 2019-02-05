// example
const initState = {
  user: null,
  resource: [],
}

const reducer = (state = initState, action) => {
  switch (action.type) {

    // current rout for header component.
    case 'UPDTE_CURRENTPATH':
      return { ...state, currentPath: action.path }

    // handle resources.
    case 'GET_RESOURCES':
      return { ...state, loading: true };
    case 'GET_RESOURCES_DONE':
      return { ...state, resources: action.resources, resourceReceived: true, loading: false };
    case 'GET_RESOURCES_FAILED':
      return { ...state, resourceReceived: false, loading: false };

    // handle user login.
    case 'USER_LOGIN':
      return { ...state, logedIn: false, loading: true };
    case 'USER_LOGIN_DONE':
      return { ...state, user: action.user, logedIn: true, loading: false };
    case 'USER_LOGIN_FAILED':
      return { ...state, logedIn: false, loginFailed: true, loading: false };

    // handle user logout.
    case 'USER_LOGOUT':
      return { ...state, logedOut: false, loading: true };
    case 'USER_LOGOUT_DONE':
      return {...state, logedOut: true, user: null, logedIn: false, resource: [], loading: false };
    case 'USER_LOGOUT_FAILED':
      return {...state, logedOut: false, loading: false}

    // handle user signup.
    case 'USER_SIGNUP':
      return { ...state, signedUp: false, loading: true };
    case 'USER_SIGNUP_DONE':
      return { ...state, user: action.user, signedUp: true, loading: false };
    case 'USER_SIGNUP_FAILED':
      return { ...state, signedUp: false, userSignupError: action.userSignupError, loading: false }
    case 'RESET_SIGNED_UP':
      return { ...state, signedUp: false };

    default:
      return state;
  }
}

export default reducer;