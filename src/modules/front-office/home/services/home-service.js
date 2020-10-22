import endpoint from "reactor/http/endpoint";

export function homeData() {
    return endpoint.get('/home');
}