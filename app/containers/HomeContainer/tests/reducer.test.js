import { homeContainerReducer, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('HomContainer reducer tests', () => {
    let state;
    beforeEach(() => {
        state = initialState;
    });

    it('should return the initial state', () => {
        expect(homeContainerReducer(undefined, {})).toEqual(state);
    });
});
