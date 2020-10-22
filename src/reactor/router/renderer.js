import React from 'react';
import config from 'reactor/config';
import Middleware from './middleware';
import history from './router-history';
import modulesList from './modules-list';
import { Route } from 'react-router-dom';
import { layoutsList } from './routes-list';
import { concatRoute } from "reactor/router";
import { getCurrentBseAppPath } from './apps-list';
import ProgressBar from 'reactor/components/Preloaders/ProgressBar';
import { firstSegmentOfRoute, isPartOfLazyModules } from './renderer-helpers';
// import stackBuilder from './stackBuilder';
// import ltrim from 'reinforcements/src/utilities/str/ltrim';

const forceRefresh = config.get('router.forceRefresh', true);

const renderRoute = (routeData, route) => {
    // const { location } = routeData;
    // const { pathname } = location;

    // const givenRoute = ltrim(pathname, getCurrentBseAppPath()) || '/';

    // if (stackBuilder.has(givenRoute)) {
    //     return stackBuilder.get(givenRoute);
    // }

    // timestamp
    // When forceRefresh flag is set to true
    // then the route component will be re-rendered every time
    // the user clicks on the same route
    // otherwise, the user will still in the same page without re-rendering
    const middlewareKey = forceRefresh ? Date.now() : null;
    return <Middleware key={middlewareKey} match={routeData.match} location={routeData.location} route={route} history={history} />;
};

export default function Renderer(props) {
    const { location } = props;

    let firstSegment = firstSegmentOfRoute(location);

    const currentBasePath = getCurrentBseAppPath();

    firstSegment = concatRoute(currentBasePath, firstSegment);

    const [loadedModules, loadModule] = React.useState([]);

    // check if module is loaded
    const moduleIsLoaded = loadedModules.includes(firstSegment);

    React.useEffect(() => {
        const moduleInfo = modulesList[firstSegment];

        if (!moduleIsLoaded && moduleInfo) {
            const loadingModulePaths = [];

            // load main app provider file
            if (moduleInfo.appProvider) {
                loadingModulePaths.push(moduleInfo.appProvider());
            }

            // load module provider
            loadingModulePaths.push(moduleInfo.load());

            Promise.all(loadingModulePaths).then(e => {
                loadModule(loadedModules.concat(moduleInfo.entry));
            });
        }

    }, [firstSegment, moduleIsLoaded, loadedModules]);

    // Display the progress bar
    // if the first segment is not in the 
    // loadedModules and
    // the first segment is part of modules list that will be loaded
    if (!moduleIsLoaded && isPartOfLazyModules(firstSegment)) {
        return <ProgressBar />
    }

    return layoutsList.map(layout => {
        const { LayoutComponent, routes, routesList } = layout;

        // list of routes
        let layoutRoutes = routes.map(route => {
            return (
                <Route path={route.path}
                    exact
                    key={route.path}
                    render={props => renderRoute(props, route)}
                />
            );
        });

        return (
            <Route key={LayoutComponent} exact path={routesList} render={props => (
                <LayoutComponent {...props}>
                    {layoutRoutes}
                </LayoutComponent>
            )} />
        )
    });
}
