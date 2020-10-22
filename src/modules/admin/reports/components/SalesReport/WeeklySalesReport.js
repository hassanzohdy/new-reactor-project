import React from 'react';
import Chart from 'reactor/components/Chart';
import Globals from 'reactor/globals';
import moment from 'moment';
import { If, ElseIf } from 'reactor/components/Condition';
import { trans } from 'reactor/localization';
import CircleProgress from 'reactor/components/Preloaders/CircleProgress';
import { salesWeekReport } from '../../services/reports-service';
import ReportHeading from '../ReportHeading';
import SelectInput from 'reactor/form/components/SelectInput';
import GridContainer from 'reactor/components/Grid/GridContainer';
import GridItem from 'reactor/components/Grid/GridItem';
import { currentYear, months, years } from './../../utils/helpers';

const monthsList = [].concat(months);

const weeks = [
    {
        label: trans('firstWeek'),
        value: 1,
    },
    {
        label: trans('secondWeek'),
        value: 8,
    },
    {
        label: trans('thirdWeek'),
        value: 15,
    },
    {
        label: trans('fourthWeek'),
        value: 22,
    },
];

const leapYearWeeks = [].concat(weeks);
leapYearWeeks.push({
    label: trans('fifthWeek'),
    value: 29,
});

const lastDayInMonth = Number(moment().endOf('month').format('DD'));

const getWeekNumberByDayNumber = () => {
    let dayNumberOfMonth = Number(moment().format('DD'));

    for (let week of weeks) {
        if (dayNumberOfMonth > week.value) continue;

        return week.value;
    }

    // return dayNumberOfMont/h % 7 == 0 ? dayNumberOfMonth / 7 : Math.floor(dayNumberOfMonth / 7) + 1;
};

export default function WeeklySalesReport() {
    const [isLoading, loading] = React.useState(true);
    const [response, setResponse] = React.useState();
    const [year, setYear] = React.useState(currentYear);
    const [month, setMonth] = React.useState(Number(moment().format('M')));
    const [week, setWeek] = React.useState(getWeekNumberByDayNumber());
    const [weeksList, setWeeksList] = React.useState(lastDayInMonth > 28 ? leapYearWeeks : weeks);

    /**
     * Update weeks based in current month 
     */
    const updateWeeks = (newMonth, newYear = year) => {
        const lastDayInMonth = Number(moment().set('year', newYear).set('month', newMonth - 1).endOf('month').format('DD'));

        if (lastDayInMonth === 28 && week === 29) {
            setWeek(1);
        }

        setWeeksList(lastDayInMonth > 28 ? leapYearWeeks : weeks);
    };

    const getReport = () => {
        loading(true);

        salesWeekReport({
            year,
            month,
            // i.e 2nd week => (2-1) * 7 + 1 = 8 >> Starting Day Of The Week
            day: week,
        }).then(response => {
            setResponse(response);
            loading(false);
        });
    };

    React.useEffect(() => {
        getReport();
    }, [year, month, week]);

    // const [response] = useRequest(() => getReport(), loading);

    const chartOptions = {
        yName: 'المبيعات',
        numberSuffix: ' رس',
        tooltip: `<div style="direction: ${Globals.direction}">أرباح يوم <strong>$label</strong> هي <strong>$dataValue</strong> </div>`,
    }

    if (response) {
        chartOptions.data = [];

        const report = response.data.report;

        let currentDate = report.from;

        let totalSales = 0;

        while (currentDate !== report.to) {
            let date = moment(currentDate, 'DD-MM-YYYY');

            let salesDay = report.sales.find(salesDate => {
                return salesDate.date.day === Number(date.format('DD'));
            }) || {};

            totalSales += salesDay.sales || 0;

            chartOptions.data.push({
                value: salesDay.sales || 0,
                label: trans(date.format('dddd')) + ' ' + date.format('DD'),
            });

            currentDate = date.add(1, 'days').format('DD-MM-YYYY');
        }

        chartOptions.caption = `مبيعات الأسبوع  ${totalSales.toLocaleString()} رس`;

        chartOptions.xName = `أرباح الإسبوع ${report.from} - ${report.to}`;
    }

    return (
        <>
            <ReportHeading>تقرير المبيعات الإسبوعي</ReportHeading>

            <GridContainer>
                <GridItem>
                    <SelectInput
                        placeholder="السنة"
                        value={year}
                        onChange={item => {setYear(item.value); updateWeeks(month, item.value); getReport()}}
                        items={years}
                    />
                </GridItem>

                <GridItem>
                    <SelectInput
                        placeholder="الشهر"
                        value={month}
                        onChange={item => { setMonth(item.value); updateWeeks(item.value); getReport() }}
                        items={monthsList}
                    />
                </GridItem>

                <GridItem>
                    <SelectInput
                        placeholder="الأسبوع"
                        value={week}
                        onChange={item => setWeek(item.value) && getReport()}
                        items={weeksList}
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