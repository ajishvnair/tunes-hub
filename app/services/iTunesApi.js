import { generateApiClient } from '@utils/apiUtils';
const iTunesApi = generateApiClient('iTunes');

export const getTunes = tunesKeyword => iTunesApi.get(`/search?term=${tunesKeyword}`);
