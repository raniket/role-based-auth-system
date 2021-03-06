import { put, takeLatest, all } from 'redux-saga/effects/';
import UserService from '../services/api/UserService';
import ResourcesService from '../services/api/ResourcesService';


function* userLogin(payload) {
  const response = yield UserService.userLogin(payload);
  console.log('response form axiso wareper : ', response);
  if (response.status === 200) {
    yield put({ type: 'USER_LOGIN_DONE', user: response.data });
  } else {
    yield put({ type: 'USER_LOGIN_FAILED', resource: response.status });
  }
}

function* userLogout() {
  const response = yield UserService.userLogout();
  console.log('response form axiso wareper : ', response);
  if (response.status === 200) {
    yield put({ type: 'USER_LOGOUT_DONE', user: response.data });
  } else {
    yield put({ type: 'USER_LOGOUT_FAILED', resource: response.status });
  }
}

function* getUsers() {
  const response = yield UserService.getUsers();
  console.log('response form axiso wareper : ', response);
  if (response.status === 200) {
    yield put({ type: 'GET_USERS_DONE', users: response.data });
  } else {
    yield put({ type: 'GET_USERS_FAILED', resource: response.status });
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

function* userSignup(payload) {
  console.log('payload in SAGA userSignup ::: ', payload);
  const response = yield UserService.create(payload);
  console.log('response form axiso wareper : ', response);
  if (response.status === 201) {
    yield put({ type: 'USER_SIGNUP_DONE', user: payload.data });
  } else {
    yield put({ type: 'USER_SIGNUP_FAILED', userSignupError: response.data.error });
  }
}

function* actionWatcher() {
  yield takeLatest('USER_LOGIN', userLogin);
  yield takeLatest('GET_RESOURCES', getResources);
  yield takeLatest('USER_SIGNUP', userSignup);
  yield takeLatest('USER_LOGOUT', userLogout);
  yield takeLatest('GET_USERS', getUsers);
}


export default function* rootSage() {
  yield all([
    actionWatcher(),
  ]);
}