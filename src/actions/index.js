// example
export const getResource = (data) => ({
  type: 'GET_RESOURCE', data,
});

export const updateCurrentPath = (path) => ({
  type: 'UPDTE_CURRENTPATH', path,
});


export const userLogin = (data) => ({
  type: 'USER_LOGIN', data
})

export const userLogout = () => ({
  type: 'USER_LOGOUT',
});

export const getResources = () => ({
  type: 'GET_RESOURCES',
})


export const userSignup = (data) => ({
  type: 'USER_SIGNUP', data,
})

export const resetSignedUp = () => ({
  type: 'RESET_SIGNED_UP',
});
