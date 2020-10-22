import React from 'react';
import Chart from 'reactor/components/Chart';
import Globals from 'reactor/globals';
import moment from 'moment';
import { If, ElseIf } from 'reactor/components/Condition';
import { trans } from 'reactor/localization';
import CircleProgress from 'reactor/components/Preloaders/CircleProgress';
import { salesMonthReport } from '../../services/reports-service';
import ReportHeading from '../ReportHeading';
import SelectInput from 'reactor/form/components/SelectInput';
import GridContainer from 'reactor/components/Grid/GridContainer';
import GridItem from 'reactor/components/Grid/GridItem';
import { currentYear, months, years } from './../../utils/helpers';

const monthsList = [].concat(months);

export default function MonthlySalesReport() {
    const [isLoading, loading] = React.useState(true);
    const [response, setResponse] = React.useState();
    const [year, setYear] = React.useState(currentYear);
    const [month, setMonth] = React.useState(Number(moment().format('M')));

    const getReport = () => {
        loading(true);

        salesMonthReport({
            year,
            month,
        }).then(response => {
            setResponse(response);
            loading(false);
        });
    };

    React.useEffect(() => {
        getReport();
    }, [year, month]);

    // const [response] = useRequest(() => getReport(), loading);

    const chartOptions = {
        yName: 'الأرباح',
        numberSuffix: ' رس',
        tooltip: `<div style="direction: ${Globals.direction}">أرباح يوم <strong>$label</strong> هي <strong>$dataValue</strong> </div>`,
    }

    if (response) {
        chartOptions.data = [];

        const report = response.data.report;

        let currentDate = report.from;

        let [day] = currentDate.split('-');

        let [lastDay] = report.to.split('-');

        let totalSales = 0;

        day = Number(day);

        lastDay = Number(lastDay);

        while (day <= lastDay) {
            let salesDay = report.sales.find(salesDate => {
                return salesDate.date.day === Number(day);
            }) || {};

            totalSales += salesDay.sales || 0;

            chartOptions.data.push({
                value: salesDay.sales || 0,
                // label: trans(date.format('dddd')) + ' ' + date.format('DD'),
                label: String(day),
            });

            day++;
        }

        chartOptions.caption = `الأرباح - ${totalSales.toLocaleString()} رس`;

        chartOptions.xName = `أرباح شهر ${trans(monthsList[month - 1].label)}  ${year}  `;
    }

    return (
        <>
            <ReportHeading>تقرير المبيعات الشهري</ReportHeading>

            <GridContainer>
                <GridItem>
                    <SelectInput
                        placeholder="السنة"
                        value={year}
                        onChange={item => setYear(item.value) && getReport()}
                        items={years}
                    />
                </GridItem>

                <GridItem>
                    <SelectInput
                        placeholder="الشهر"
                        value={month}
                        onChange={item => setMonth(item.value) && getReport()}
                        items={months}
                    />
                </GridItem>
            </GridContainer>

            <If condition={isLoading}>
                <CircleProgress />
            </If>
            <ElseIf condition={!isLoading} render={() => (
                <>
                    <Chart {...chartOptions} />
                </>
            )} />
        </>
    );
}   