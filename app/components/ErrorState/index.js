import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import T from '@components/T';

const Container = styled.div`
    && {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 100px;
    }
`;
export function ErrorState({ keyword }) {
    return (
        <Container>
            <T id="error_message" values={{ keyword }} />
        </Container>
    );
}
ErrorState.propTypes = {
    keyword: PropTypes.string
};

export default ErrorState;
