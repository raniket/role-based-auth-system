// example
export const getResource = (data) => ({
  type: 'GET_RESOURCE', data,
});

export const userLogin = (data) => ({
  type: 'USER_LOGIN', data
})

export const getResources = () => ({
  type: 'GET_RESOURCES',
})