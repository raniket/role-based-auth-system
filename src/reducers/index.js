// example
const initState = {
  user: null,
  resource: [],
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_RESOURCES':
      return { ...state, loading: true };
    case 'GET_RESOURCES_DONE':
      return { ...state, resources: action.resources, resourceReceived: true, loading: false };
    case 'GET_RESOURCES_FAILED':
      return { ...state, resourceReceived: false, loading: false };

    case 'USER_LOGIN':
      return { ...state, logedIn: false, loading: true };
    case 'USER_LOGIN_DONE':
      return { ...state, user: action.user, logedIn: true, loading: false };
    case 'USER_LOGIN_FAILED':
      return { ...state, logedIn: false, loading: false };

    default:
      return state;
  }
}

export default reducer;