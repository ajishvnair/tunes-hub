/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const { Types: homeContainerTypes, Creators: homeContainerCreators } = createActions({
    requestGetTunes: ['keyword'],
    successGetTunes: ['data'],
    failureGetTunes: ['error'],
    clearTunes: []
});
export const initialState = { keyword: null, tunesData: [], tunesError: null };

/* eslint-disable default-case, no-param-reassign */
export const homeContainerReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case homeContainerTypes.REQUEST_GET_TUNES:
                draft.keyword = action.keyword;
                break;
            case homeContainerTypes.CLEAR_TUNES:
                return initialState;
            case homeContainerTypes.SUCCESS_GET_TUNES:
                draft.tunesData = action.data.results;
                break;
            case homeContainerTypes.FAILURE_GET_GITHUB_REPOS:
                draft.tunesError = get(action.error, 'message', 'something_went_wrong');
                break;
        }
    });

export default homeContainerReducer;
