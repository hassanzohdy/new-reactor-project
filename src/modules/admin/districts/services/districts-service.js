import RestfulEndpoint from "reactor/http/restful-endpoint";

class DistrictsService extends RestfulEndpoint {
    route = '/districts';
}

export default new DistrictsService();