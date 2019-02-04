// Service for resource
import request from '../lib/request';


/**
 * Get a list of resources
 *
 * @returns
 */
const getAll = () => {
  return request({
    url: `/resource`,
    method: 'GET',
  })
}


const ResourcesService = {
  getAll,
}

export default ResourcesService;