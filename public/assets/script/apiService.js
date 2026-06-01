const API_URL = 'http://localhost:8080';

export async function request(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : null
    };
    const response = await fetch(`${API_URL}${endpoint}`, options);
    return response.json();
}