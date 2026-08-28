import { takeLatest, put } from 'redux-saga/effects';
import { login, logout } from '../slices/authSlice';

function* loginWorker() {
  yield put(login('Hari'));
}

function* authSaga() {
  yield takeLatest('auth/loginRequest', loginWorker);
}

export default authSaga;