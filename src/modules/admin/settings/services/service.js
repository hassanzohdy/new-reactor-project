import endpoint from "reactor/http/endpoint";
import RestfulEndpoint from "reactor/http/restful-endpoint";

function list() {
    return endpoint.get('/settings');
}


function update(form) {
    return endpoint.post('/settings', form);
}

export default {
    list,
    update
};