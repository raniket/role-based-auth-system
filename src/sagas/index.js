import { put, takeLatest, all } from 'redux-saga/effects/';
import UserService from '../services/api/UserService';
import ResourcesService from '../services/api/ResourcesService'


function* userLogin(payload) {
  const response = yield UserService.userLogin(payload);
  console.log('response form axiso wareper : ', response);
  if (response.status === 200) {
    yield put({ type: 'USER_LOGIN_DONE', user: response.data });
  } else {
    yield put({ type: 'USER_LOGIN_FAILED', resource: response.status });
  }
}

function* getResources() {
  const response = yield ResourcesService.getAll();
  console.log('response form axiso wareper : ', response);
  if (response.status === 200) {
    yield put({ type: 'GET_RESOURCES_DONE', resources: response.data });
  } else {
    yield put({ type: 'GET_RESOURCES_FAILED', resources: response.status });
  }
}

function* actionWatcher() {
  yield takeLatest('USER_LOGIN', userLogin);
  yield takeLatest('GET_RESOURCES', getResources);
}


export default function* rootSage() {
  yield all([
    actionWatcher(),
  ]);
}