import RestfulEndpoint from "reactor/http/restful-endpoint";

class CategoriesService extends RestfulEndpoint {
    route = '/categories';
}

export default new CategoriesService();