import { selectHomeContainer, selectKeyword, selectTunesData, selectTunesError } from '../selectors';

describe('HomeContainer selector tests', () => {
    let mockedState;
    let keyword;
    let tunesData;
    let tunesError;

    beforeEach(() => {
        keyword = 'malayalam';
        tunesData = { resultCount: 1, results: [{ trackName: keyword }] };
        tunesError = 'There was some error while fetching the tunes';

        mockedState = {
            homeContainer: {
                keyword,
                tunesData,
                tunesError
            }
        };
    });
    it('should select the homeContainer state', () => {
        const homeContainerSelector = selectHomeContainer();
        expect(homeContainerSelector(mockedState)).toEqual(mockedState.homeContainer);
    });
    it('should select the keyword', () => {
        const keywordSelector = selectKeyword();
        expect(keywordSelector(mockedState)).toEqual(keyword);
    });

    it('should select tunesData', () => {
        const tunesDataSelector = selectTunesData();
        expect(tunesDataSelector(mockedState)).toEqual(tunesData);
    });

    it('should select the tunesError', () => {
        const tunesErrorSelector = selectTunesError();
        expect(tunesErrorSelector(mockedState)).toEqual(tunesError);
    });
});
