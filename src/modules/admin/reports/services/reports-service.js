import endpoint from "reactor/http/endpoint";

const path = path => 'reports' + path;

export function salesReports() {
    return endpoint.get(path('/sales'));
}

export function salesWeekReport(data) {
    return endpoint.get(path('/sales/byWeek'), {
        params: data,
    });
}

export function salesMonthReport(data) {
    return endpoint.get(path('/sales/byMonth'), {
        params: data,
    });
}

export function salesYearReport(data) {
    return endpoint.get(path('/sales/byYear'), {
        params: data,
    });
}

export function ordersReports() {
    return endpoint.get(path('/orders'));
}
