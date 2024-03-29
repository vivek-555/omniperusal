import 'whatwg-fetch';


async function request({url, data, params = {}}) {
    try {
        const authToken = localStorage.getItem("authToken");

        const response = await fetch(url, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': authToken ? 'Token ' + authToken : undefined
            },
            body: data ? ((data instanceof FormData) ? data : JSON.stringify(data)) : undefined,
            ...params
        });

        const contentType = response.headers.get('content-type');

        if(response.status < 200 || response.status >= 400) {
            const error = Error('API Error');
            error.response = response;
            throw error;
        }

        if([200, 201].indexOf(response.status) >= 0 && contentType.indexOf('application/json') !== -1) {
            return await response.json();
        }
    }
    catch(err) {
        console.error(JSON.stringify(await err.response.json())); // eslint-disable-line no-console
        throw err;
    }
}

export function get(url, data = {}, params = {}) {
    url = getCompleteURL(url, data);
    return request({
        url,
        params
    });
}

export function post(url, data, params = {}) {
    return request({
        url,
        data,
        params: {
            ...params,
            method: 'post'
        }
    });
}

export function del(url) {
    return request({
        url,
        params: {
            method: 'delete'
        }
    });
}

function getCompleteURL(url = '', urlParams = {}) {
    return url + '?' + $.param(urlParams);
}