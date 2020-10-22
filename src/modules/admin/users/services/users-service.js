import RestfulEndpoint from "reactor/http/restful-endpoint";

class UsersService extends RestfulEndpoint {
    route = '/users';
}

export default new UsersService();