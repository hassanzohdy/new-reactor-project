import RestfulEndpoint from "reactor/http/restful-endpoint";

class Service extends RestfulEndpoint {
    route = '/pages';
}

const service = new Service();

export default service;