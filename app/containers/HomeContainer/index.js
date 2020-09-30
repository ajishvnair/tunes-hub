/* eslint-disable no-console */
import React, { useState, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Input, Card, Col, Row } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { colors } from '@themes';
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

const ListContainer = styled(Row)`
    && {
        padding: 20px;
    }
`;

const Tune = styled(Col)`
    && {
        margin: 5px;
        padding: 10px;
        border-radius: 5px;
        color: white;
        background: ${colors.primary};
        background: -webkit-linear-gradient(to right, ${colors.primary}, ${colors.secondary});
        background: linear-gradient(to right, ${colors.primary}, ${colors.secondary});
    }
`;

const SearchCard = styled(Card)`
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
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        if (!isEmpty(searchText)) {
            dispatchTunes(searchText);
            // setLoading(true);
        } else {
            dispatchClearTunes();
        }
    };

    const debouncedHandleSearch = value => {
        setSearchText(value);
        const search = debounce(() => {
            handleSearch();
        }, 800);

        search();
    };

    const renderTunesList = () => {
        const tunesList = get(tunesData, 'results', []);
        const totalCount = get(tunesData, 'resultCount', 0);
        return (
            <ListContainer justify="space-between">
                {tunesList.map((tune, index) => (
                    <Tune key={index}>
                        <T text={tune.trackName} />
                    </Tune>
                ))}
            </ListContainer>
        );
    };
    return (
        <Container>
            <SearchCard maxwidth={maxwidth}>
                <Search
                    placeholder={intl.formatMessage({ id: 'search_artist' })}
                    value={searchText}
                    onChange={e => debouncedHandleSearch(e.target.value)}
                    onSearch={handleSearch}
                />
            </SearchCard>
            {renderTunesList()}
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
