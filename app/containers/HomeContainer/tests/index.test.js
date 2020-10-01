/**
 *
 * Tests for HomeContainer
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { HomeContainerTest as HomeContainer } from '../index';

describe('<HomeContainer /> tests', () => {
    let submitSpy;

    beforeEach(() => {
        submitSpy = jest.fn();
    });
    it('should render and match the snapshot', () => {
        const { baseElement } = renderProvider(<HomeContainer dispatchGetTunes={submitSpy} />);
        expect(baseElement).toMatchSnapshot();
    });

    it('should call dispatch get tunes and clear tunes on empty change', async () => {
        const getTunesSpy = jest.fn();
        const clearTunesSpy = jest.fn();
        const { getByTestId } = renderProvider(
            <HomeContainer dispatchClearTunes={clearTunesSpy} dispatchGetTunes={getTunesSpy} />
        );
        fireEvent.change(getByTestId('search-bar'), {
            target: { value: 'a' }
        });
        await timeout(500);
        expect(getTunesSpy).toBeCalled();

        fireEvent.change(getByTestId('search-bar'), {
            target: { value: '' }
        });
        await timeout(500);
        expect(clearTunesSpy).toBeCalled();
    });

    it('should call dispatchTunes on change', async () => {
        const { getByTestId } = renderProvider(<HomeContainer dispatchGetTunes={submitSpy} />);
        fireEvent.change(getByTestId('search-bar'), {
            target: { value: 'some tunes' }
        });
        await timeout(500);
        expect(submitSpy).toBeCalled();
    });
});
