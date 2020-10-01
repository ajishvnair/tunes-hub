import React from 'react';
import styled from 'styled-components';
import T from '@components/T';
import { fonts } from '@themes';

const Container = styled.div`
    && {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 100px;
    }
`;
export function EmptyState() {
    return (
        <Container>
            <T id="search_artist" />
        </Container>
    );
}

export default EmptyState;
