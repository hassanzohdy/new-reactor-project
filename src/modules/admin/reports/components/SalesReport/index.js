import React from 'react';
import Helmet from 'reactor/components/Helmet';
import Tabs, { Tab } from 'reactor/components/Tabs';
import WeeklySalesReport from './WeeklySalesReport';
import MonthlySalesReport from './MonthlySalesReport';
import YearlySalesReport from './YearlySalesReport';

export default function SalesReport() {
    return (
        <>
            <Helmet title="salesReports" />
            <Tabs lazy>
                <Tab label="تقرير إسبوعي">
                    <WeeklySalesReport />
                </Tab>
                <Tab label="تقرير شهري">
                    <MonthlySalesReport />
                </Tab>
                <Tab label="تقرير سنوي">
                    <YearlySalesReport />
                </Tab>
            </Tabs>
        </>
    );
}   