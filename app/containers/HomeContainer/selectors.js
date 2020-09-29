import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */

const selectHomeContainerDomain = state => state.homeContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeContainer
 */

export const selectHomeContainer = () =>
    createSelector(
        selectHomeContainerDomain,
        substate => substate
    );

export const selectTunesData = () =>
    createSelector(
        selectHomeContainerDomain,
        substate => get(substate, 'tunesData', null)
    );

export const selectTunesError = () =>
    createSelector(
        selectHomeContainerDomain,
        substate => get(substate, 'tunesError', null)
    );

export const selectKeyword = () =>
    createSelector(
        selectHomeContainerDomain,
        substate => get(substate, 'keyword', null)
    );

export default selectHomeContainer;
