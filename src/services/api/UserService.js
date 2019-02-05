// Service for resource
import request from '../lib/request';

/**
 * Get a particular resource
 *
 * @param {*} id
 * @returns object for a resource
 */
const get = (id) => {
  return request({
    url: `/resource/api/${id}`,
    method: 'GET',
  });
}

/**
 * Get a list of teachers
 *
 * @returns
 */
const getAll = () => {
  return request({
    url: `/resource/api`,
    method: 'GET',
  })
}

/**
 * Create a resource
 *
 * @param {*} params payload for creating resource
 * @returns success
 */
const create = (params) => {
  return request({
    url: `/signup`,
    method: 'POST',
    data: params.data
  });
}


const userLogin = (params) => {
  return request({
    url: `/login`,
    method: 'POST',
    data: params.data
  })
}

const userLogout = () => {
  return request({
    url: `/logout`,
    method: 'GET',
  })
}

const getUsers = () => {
  return request({
    url: `/user`,
    method: 'GET',
  })
}

/**
 * Update a paritcular resource
 *
 * @param {*} params payload to update a resource
 * @returns success
 */
const update = (params) => {
  console.log('update resource called in resource service with params.resource : ', params.resource);
  return request({
    url: `/resource/api`,
    method: 'PUT',
    data: params.resource,
  })
}

/**
 * Delete a particular resource
 *
 * @param {*} id id of a resource to delete
 * @returns success
 */
const remove = (id) => {
  return request({
    url: `/url/to/delete/${id}`,
    method: 'DELETE',
  })
}

const UserService = {
  get, getAll, create, update, remove, userLogin, userLogout, getUsers,
}

export default UserService;