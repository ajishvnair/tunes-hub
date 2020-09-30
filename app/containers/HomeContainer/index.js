/* eslint-disable no-console */
import React, { memo, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Input, Card, Col, Row } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
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
import Mp3player from '@components/mp3';
import Mp3Player from '@app/components/mp3/index';

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
        margin: 10px;
    }
`;

const IconContainer = styled.div`
    && {
        position: absolute;
        right: 7px;
        bottom: 7px;
    }
`;

const Tune = styled(Col)`
    && {
        margin: 5px;
        padding: 10px;
        border-radius: 5px;
        color: white;
        height: 100px;
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

    const [selectedTune, setSelectedTune] = useState(null);
    const [mediaPlayerVisible, setMediaPlayerVisibility] = useState(false);

    const handleSearch = value => {
        if (!isEmpty(value)) {
            dispatchTunes(value);
        } else {
            dispatchClearTunes();
        }
    };

    const playMusic = (url, index) => {
        setSelectedTune({ url, index });
        setMediaPlayerVisibility(true);
    };

    const debouncedHandleSearch = debounce(handleSearch, 200);

    const renderTunesList = () => {
        const tunesList = get(tunesData, 'results', []);
        const totalCount = get(tunesData, 'resultCount', 0);
        return (
            <ListContainer justify="space-between">
                {tunesList.map((tune, index) => (
                    <Tune key={index} span={5}>
                        <T text={!isEmpty(tune.trackName) ? tune.trackName : tune.collectionName} />
                        <IconContainer>
                            {selectedTune?.index !== index ? (
                                <PlayCircleOutlined
                                    style={{ fontSize: 35 }}
                                    onClick={() => playMusic(tune.previewUrl, index)}
                                />
                            ) : (
                                <PauseCircleOutlined style={{ fontSize: 35 }} onClick={() => playMusic(null, null)} />
                            )}
                        </IconContainer>
                    </Tune>
                ))}
            </ListContainer>
        );
    };
    return (
        <>
            <Container>
                <SearchCard maxwidth={maxwidth}>
                    <Search
                        placeholder={intl.formatMessage({ id: 'search_artist' })}
                        defaultValue={keyword}
                        onChange={e => debouncedHandleSearch(e.target.value)}
                        onSearch={value => debouncedHandleSearch(value)}
                    />
                </SearchCard>
                {renderTunesList()}
            </Container>
            {mediaPlayerVisible && (
                <Mp3Player
                    visible={mediaPlayerVisible}
                    setVisible={setMediaPlayerVisibility}
                    currentElement={selectedTune}
                />
            )}
        </>
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
