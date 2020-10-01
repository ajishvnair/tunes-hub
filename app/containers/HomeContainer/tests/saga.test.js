/**
 * Test homeContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getTunes } from '@services/iTunesApi';
import { apiResponseGenerator } from '@utils/testUtils';
import homeContainerSaga, { getTunesFromApi } from '../saga';
import { homeContainerTypes } from '../reducer';

describe('HomeContainer saga tests', () => {
    const generator = homeContainerSaga();
    const keyword = 'ma';
    let getTunesGenerator = getTunesFromApi({ keyword });

    it('should start task to watch for REQUEST_GET_TUNES action', () => {
        expect(generator.next().value).toEqual(takeLatest(homeContainerTypes.REQUEST_GET_TUNES, getTunesFromApi));
    });

    it('should ensure that the action FAILURE_GET_TUNES is dispatched when the api call fails', () => {
        const res = getTunesGenerator.next().value;
        expect(res).toEqual(call(getTunes, keyword));
        const errorResponse = {
            errorMessage: 'There was an error while fetching tunes'
        };
        expect(getTunesGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
            put({
                type: homeContainerTypes.FAILURE_GET_TUNES,
                error: errorResponse
            })
        );
    });

    it('should ensure that the action SUCCESS_GET_TUNES is dispatched when the api call succeeds', () => {
        getTunesGenerator = getTunesFromApi({ keyword });
        const res = getTunesGenerator.next().value;
        expect(res).toEqual(call(getTunes, keyword));
        const tunesResponse = {
            resultCount: 1,
            results: [{ trackName: keyword }]
        };
        expect(getTunesGenerator.next(apiResponseGenerator(true, tunesResponse)).value).toEqual(
            put({
                type: homeContainerTypes.SUCCESS_GET_TUNES,
                data: tunesResponse
            })
        );
    });
});
