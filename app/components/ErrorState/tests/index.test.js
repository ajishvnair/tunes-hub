import React from 'react';
import { renderProvider } from '@utils/testUtils';
import { ErrorState } from '../index';

describe('<ErrorState /> tests', () => {
    const keyword = 'test';

    it('should render and match the snapshot', () => {
        const { baseElement } = renderProvider(<ErrorState keyword={keyword} />);
        expect(baseElement).toMatchSnapshot();
    });
});
