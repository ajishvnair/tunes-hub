/* eslint-disable no-console */
import React, { useState, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Input, Card } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import T from '@components/T';
// import { getTunes } from '@services/iTunesApi';
import { selectHomeContainer, selectTunesData, selectTunesError, selectKeyword } from './selectors';
import { homeContainerCreators } from './reducer';
import saga from './saga';

const { Search } = Input;

const Container = styled.div`
    && {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
`;
const CustomCard = styled(Card)`
    && {
        margin-top: -10px;
        max-width: ${props => props.maxwidth};
        min-width: 400px;
        color: ${props => props.color};
        ${props => props.color && `color: ${props.color}`};
    }
`;

export function HomeContainer({
    dispatchTunes,
    dispatchClearTunes,
    intl,
    tunesData = {},
    tunesError = null,
    keyword,
    maxwidth,
    padding
}) {
    useInjectSaga({ key: 'homeContainer', saga });

    const handleSearch = key => {
        if (!isEmpty(key)) {
            dispatchTunes(key);
            // setLoading(true);
        } else {
            dispatchClearTunes();
        }
    };

    const debouncedHandleSerach = debounce(handleSearch, 200);
    return (
        <Container>
            <CustomCard maxwidth={maxwidth}>
                <Search
                    placeholder={intl.formatMessage({ id: 'search_artist' })}
                    value={keyword}
                    onChange={e => debouncedHandleSerach(e.target.value)}
                    onSearch={searchText => debouncedHandleSerach(searchText)}
                />
            </CustomCard>
            {JSON.stringify(tunesData)}
        </Container>
    );
}

HomeContainer.propTypes = {
    dispatchTunes: PropTypes.func,
    dispatchClearTunes: PropTypes.func,
    intl: PropTypes.object,
    tunesData: PropTypes.shape({
        totalCount: PropTypes.number,
        incompleteResults: PropTypes.bool,
        items: PropTypes.array
    }),
    tunesError: PropTypes.object,
    keyword: PropTypes.string,
    history: PropTypes.object,
    maxwidth: PropTypes.number,
    width: PropTypes.number,
    padding: PropTypes.number
};

HomeContainer.defaultProps = {
    maxwidth: 200,
    width: 800,
    padding: 20
};

const mapStateToProps = createStructuredSelector({
    homeContainer: selectHomeContainer(),
    tunesData: selectTunesData(),
    tunesError: selectTunesError(),
    keyword: selectKeyword()
});

function mapDispatchToProps(dispatch) {
    const { requestGetTunes, clearTunes } = homeContainerCreators;
    return {
        dispatchTunes: repoName => dispatch(requestGetTunes(repoName)),
        dispatchClearTunes: () => dispatch(clearTunes())
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(
    injectIntl,
    withConnect,
    memo
)(HomeContainer);

export const HomeContainerTest = compose(injectIntl)(HomeContainer);
