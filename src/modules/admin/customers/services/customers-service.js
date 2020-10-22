import RestfulEndpoint from "reactor/http/restful-endpoint";

class CustomersService extends RestfulEndpoint {
    route = '/customers';
}

export default new CustomersService();