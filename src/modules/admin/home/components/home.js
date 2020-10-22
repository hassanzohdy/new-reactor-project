import React from 'react';
import Helmet from 'reactor/components/Helmet';
import GridItem from 'reactor/components/Grid/GridItem';
import GridContainer from 'reactor/components/Grid/GridContainer';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import { RedCard, BlueCard, GreenCard, OrangeCard } from 'reactor/layout/components/AdminDashboard/Card';
import useRequest from 'reactor/hooks/useRequest';
import endpoint from 'reactor/http/endpoint';
import { If, ElseIf } from 'reactor/components/Condition';
import CircleProgress from 'reactor/components/Preloaders/CircleProgress';
import Chart from 'reactor/components/Chart';
import Globals from 'reactor/globals';
import moment from 'moment';
import { trans } from 'reactor/localization';

export default function Home() {
    const [isLoading, loading] = React.useState(true);
    const [response] = useRequest(() => endpoint.get('/'), loading);

    const chartOptions = {
        yName: 'المبيعات',
        numberSuffix: ' رس',
        tooltip: `<div style="direction: ${Globals.direction}">أرباح يوم <strong>$label</strong> هي <strong>$dataValue</strong> </div>`,
    }

    if (response) {
        chartOptions.data = [];

        let currentDate = response.data.currentWeek.from;

        let totalSales = 0;

        while (currentDate !== response.data.currentWeek.to) {
            let date = moment(currentDate, 'DD-MM-YYYY');

            let salesDay = response.data.currentWeek.sales.find(salesDate => {
                return salesDate.date.day === Number(date.format('DD'));
            }) || {};

            totalSales += salesDay.sales || 0;

            chartOptions.data.push({
                value: salesDay.sales || 0,
                label: trans(date.format('dddd')) + ' ' + date.format('DD'),
            });

            currentDate = date.add(1, 'days').format('DD-MM-YYYY');
        }

        chartOptions.caption = `مبيعات الأسبوع الحالي ${totalSales.toLocaleString()} رس`;

        chartOptions.xName = `أرباح الإسبوع ${response.data.currentWeek.from} - ${response.data.currentWeek.to}`;
    }

    return (
        <>
            <Helmet title="dashboard" description="myDescription" />
            <If condition={isLoading}>
                <CircleProgress />
            </If>
            <ElseIf condition={!isLoading} render={() => (
                <>
                    <GridContainer>
                        <GridItem>
                            <GreenCard to="/reports/sales" text="مبيعات اليوم" number={response.data.total.sales} icon={MonetizationOnIcon} />
                        </GridItem>
                        <GridItem>
                            <BlueCard to="/orders" text="طلبات اليوم" number={response.data.total.orders} icon={RestaurantIcon} />
                        </GridItem>
                        <GridItem>
                            <OrangeCard to="/orders?status=pending" text="وجبات قيد الإنتظار" number={response.data.total.pendingOrders} icon={HourglassFullIcon} />
                        </GridItem>
                        <GridItem>
                            <RedCard to="/customers" text="المسجلين اليوم" number={response.data.total.customers} icon={PersonAddIcon} />
                        </GridItem>
                    </GridContainer>
                    <Chart {...chartOptions} />
                </>
            )} />
        </>
    );
} 