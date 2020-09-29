import { create } from 'apisauce';

const { ITUNES_URL } = process.env;
const apiClients = {
    iTunes: null,
    default: null
};
export const getApiClient = (type = 'iTunes') => apiClients[type];

export const generateApiClient = (type = 'iTunes') => {
    switch (type) {
        case 'iTunes':
            apiClients[type] = createApiClientWithTransForm(ITUNES_URL);
            return apiClients[type];
        default:
            apiClients.default = createApiClientWithTransForm(ITUNES_URL);
            return apiClients.default;
    }
};

export const createApiClientWithTransForm = baseURL => {
    const api = create({
        baseURL,
        headers: { 'Content-Type': 'application/json' }
    });
    return api;
};
