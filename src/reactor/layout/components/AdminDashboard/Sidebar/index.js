import React from 'react';
import config from 'reactor/config';
import { Box } from '@material-ui/core';
import List from '@material-ui/core/List';
import { trans } from 'reactor/localization';
import Drawer from '@material-ui/core/Drawer';
import SidebarContext from './SidebarContext';
import Divider from '@material-ui/core/Divider';
import SidebarListItem from './SidebarListItem';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import layoutClasses from 'reactor/layout/utils/style';
import { currentRoute } from 'reactor/router/navigator';
import SidebarListItemGroup from './SidebarListItemGroup';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import sidebarItems from 'reactor/layout/utils/admin/sidebar-items-list';
import permissionsObserver from 'reactor/layout/utils/admin/permissionsObserver';

export default function Sidebar(props) {
    let { onClose, open } = props;
    const theme = useTheme();
    const classes = layoutClasses();
    const route = currentRoute();

    const Heading = config.get('dashboard.sidebar.heading', props => <h1 {...props}>{trans('appName')}</h1>);

    const sidebarContextValue = {
        currentRoute: route,
    };

    let itemsList = sidebarItems.getItems().filter(item => {
        if (item.role) {
            return permissionsObserver.isGranted(item.role);
        }

        if (item.items) {
            item.items = item.items.filter(item => {
                if (item.role) {
                    return permissionsObserver.isGranted(item.role);
                }

                return true;
            });

            return item.items.length > 0;
        }

        return true;
    }).map((item, index) => {
        // in this case, we'll return itemGroup
        if (item.items) {
            return <SidebarListItemGroup
                key={index}
                text={item.text}
                onClick={onClose}
                icon={item.icon}
                items={item.items}
            />;
        }

        // otherwise, we'll just return a list item
        return <SidebarListItem
            key={index}
            text={item.text}
            icon={item.icon}
            onClick={onClose}
            route={item.route} />;
    });
    return (
        <SidebarContext.Provider value={sidebarContextValue}>
            <Drawer
                className={classes.drawer}
                variant="temporary"
                anchor="left"
                open={open}
                onClose={onClose}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <Box flexGrow={1}>
                        <Heading onClick={onClose} />
                    </Box>
                    <Box>
                        <IconButton onClick={onClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </Box>
                </div>
                <Divider />

                <List
                    component="nav"
                    className={classes.sidebar}
                >
                    {itemsList}
                </List>
            </Drawer>
        </SidebarContext.Provider>
    );
}