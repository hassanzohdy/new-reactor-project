import RestfulEndpoint from "reactor/http/restful-endpoint";

class BranchesService extends RestfulEndpoint {
    route = '/branches';
}

export default new BranchesService();