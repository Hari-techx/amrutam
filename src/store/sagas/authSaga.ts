import { call, put, takeLatest } from "redux-saga/effects";
import { storage } from "../../services/storage/storage";
import {
  hydrate,
  hydrateRequest,
  loginFailure,
  loginRequest,
  loginSuccess,
  logout,
  logoutRequest,
} from "../slices/authSlice";
function* hydrateWorker() {
  const user: string | null = yield call(storage.get, "@amrutam/user", null);
  yield put(hydrate(user));
}
function* loginWorker(action: ReturnType<typeof loginRequest>) {
  try {
    const email = action.payload.email.trim();
    const password = action.payload.password;
    if (!email.includes("@") || password.length < 6)
      throw new Error(
        "Enter a valid email and a password of at least 6 characters.",
      );
    yield call(storage.set, "@amrutam/user", email);
    yield put(loginSuccess(email));
  } catch (e) {
    yield put(
      loginFailure(e instanceof Error ? e.message : "Unable to sign in."),
    );
  }
}
function* logoutWorker() {
  yield call(storage.remove, "@amrutam/user");
  yield put(logout());
}
export default function* authSaga() {
  yield takeLatest(hydrateRequest.type, hydrateWorker);
  yield takeLatest(loginRequest.type, loginWorker);
  yield takeLatest(logoutRequest.type, logoutWorker);
}
