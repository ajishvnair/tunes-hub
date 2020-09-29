import { put, call, takeLatest } from 'redux-saga/effects';
import { getTunes } from '@services/iTunesApi';
import { homeContainerTypes, homeContainerCreators } from './reducer';

const { REQUEST_GET_TUNES } = homeContainerTypes;
const { successGetTunes, failureGetTunes } = homeContainerCreators;
export function* getGithubRepos(action) {
    const response = yield call(getTunes, action.keyword);
    const { data, ok } = response;
    if (ok) {
        yield put(successGetTunes(data));
    } else {
        yield put(failureGetTunes(data));
    }
}
// Individual exports for testing
export default function* homeContainerSaga() {
    yield takeLatest(REQUEST_GET_TUNES, getGithubRepos);
}
