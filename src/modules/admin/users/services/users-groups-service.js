import RestfulEndpoint from "reactor/http/restful-endpoint";

class UsersGroupsService extends RestfulEndpoint {
    route = '/users/groups';
}

export default new UsersGroupsService();