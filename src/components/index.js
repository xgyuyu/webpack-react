import { put, fork, call, take, all } from 'redux-saga/effects';
import { push, routerReducer } from 'react-router-redux';
import assign from 'object-assign';

const UPDATE_SAGA = '@@INNER/UPDATE_SAGA';

export default assign({
  routing: routerReducer,
}, __ROOT_REDUCER__);
const runningSaga = [];

function* waitingAwakeSaga(saga) {
  while (!saga) {
    const action = yield take(UPDATE_SAGA);
    if (runningSaga.indexOf(action.saga) === -1) {
      runningSaga.push(action.saga);
      saga = action.saga;
      break;
    }
  }
  for (let i = 0; i < 100; i++) {
    try {
      yield call(saga);
    } catch (e) {
      if (e.message === '请重新登录') {
        yield put(push('/login'));
      } else if (process.env.NODE_ENV === 'production') {
        // console.log(e.message);
        // continue;
      } else {
        throw e;
      }
    }
  }
}

export function* rootSaga() {
  const sagas = __ROOT_SAGA__.map(saga => fork(waitingAwakeSaga, saga));
  yield all(sagas);
}
