import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Obj } from 'reinforcements';
import { getSettings } from '../services/misc';
import SettingsContext from '../context/SettingsContext';
import MainLayout from 'reactor/layout/components/Layout';

export default function Layout(props) {
    const [settingsData, setSettings] = React.useState();

    function getSetting(key, defaultValue) {
        return Obj.get(settingsData, key, defaultValue);
    }

    React.useEffect(() => {
        getSettings().then(response => {
            const { settings } = response.data;

            setSettings(settings);
        });
    }, []);

    return (
        <SettingsContext.Provider value={getSetting}>
            <MainLayout>
                <Header />
                <main children={props.children} />
                <Footer />
            </MainLayout>
        </SettingsContext.Provider>
    )
}