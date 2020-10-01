import React from 'react';
import { renderProvider } from '@utils/testUtils';
import { Mp3Player } from '../index';

describe('<Mp3Player /> tests', () => {
    const visible = true;
    const currentElement = { url: 'https://tunes-hub.com' };
    let submitSpy;

    beforeEach(() => {
        submitSpy = jest.fn();
    });

    it('should render and match the snapshot', () => {
        const { baseElement } = renderProvider(
            <Mp3Player visible={visible} setVisible={submitSpy} currentElement={currentElement} />
        );
        expect(baseElement).toMatchSnapshot();
    });
});
