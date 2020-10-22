import RestfulEndpoint from "reactor/http/restful-endpoint";

class WalletService extends RestfulEndpoint {
    route = '/wallet';
}

export default new WalletService();