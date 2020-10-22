import RestfulEndpoint from "reactor/http/restful-endpoint";

class Service extends RestfulEndpoint {
    route = '/newsletter';
}

const service = new Service();

export default service;