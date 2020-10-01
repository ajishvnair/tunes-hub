import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getTunes } from '../iTunesApi';

describe('ITunes tests', () => {
    const keyword = 'fast';
    it('should make the api call to "/search?term="', async () => {
        const mock = new MockAdapter(getApiClient().axiosInstance);
        const data = [
            {
                resultCount: 1,
                results: [{ trackName: keyword }]
            }
        ];
        mock.onGet(`/search?term=${keyword}`).reply(200, data);
        const res = await getTunes(keyword);
        expect(res.data).toEqual(data);
    });
});
