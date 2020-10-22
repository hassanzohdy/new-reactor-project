import React from 'react';
import Chart from 'reactor/components/Chart';
import Globals from 'reactor/globals';
import { If, ElseIf } from 'reactor/components/Condition';
import CircleProgress from 'reactor/components/Preloaders/CircleProgress';
import { salesYearReport } from '../../services/reports-service';
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

    const getReport = () => {
        loading(true);

        salesYearReport({
            year,
        }).then(response => {
            setResponse(response);
            loading(false);
        });
    };

    React.useEffect(() => {
        getReport();
    }, [year]);

    const chartOptions = {
        yName: 'الأرباح',
        numberSuffix: ' رس',
        tooltip: `<div style="direction: ${Globals.direction}">أرباح  <strong>$label</strong> هي <strong>$dataValue</strong> </div>`,
    }

    if (response) {
        chartOptions.data = [];

        const report = response.data.report;

        let totalSales = 0;

        for (let month = 1; month <= 12; month++) {
            let yearReport = report.sales.find(yearReport => yearReport.date.month === month) || {};
            chartOptions.data.push({
                value: yearReport.sales || 0,
                // label: trans(date.format('dddd')) + ' ' + date.format('DD'),
                label: monthsList[month - 1].label,
            });

            totalSales += yearReport.sales || 0;
        }

        chartOptions.caption = `الأرباح - ${totalSales.toLocaleString()} رس`;

        chartOptions.xName = `أرباح  سنة ${year}`;
    }

    return (
        <>
            <ReportHeading>تقرير المبيعات السنوي</ReportHeading>

            <GridContainer>
                <GridItem>
                    <SelectInput
                        placeholder="السنة"
                        value={year}
                        onChange={item => setYear(item.value) && getReport()}
                        items={years}
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