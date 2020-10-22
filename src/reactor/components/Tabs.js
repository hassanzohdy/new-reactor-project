import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import MaterialTabs from '@material-ui/core/Tabs';
import MaterialTab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Is from '@flk/supportive-is';

export { MaterialTab as TabHead, TabPanel as TabBody };

function TabPanel(props) {
  const { children, value, lazy, index, ...other } = props;

  let tabContent;

  if (lazy) {
    tabContent = value === index && (<Typography component="div">{children}</Typography>);
  } else {
    tabContent = <Box p={3} children={children} />
  }

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {tabContent}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => {
  return {  
    root: {
      // flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    appBar: props => {
      return props.appBar;
    }
  };
});

export function Tab({ children, label, index }) {
  return {
    children,
    label,
    index,
  };
}

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  index: PropTypes.any,
}


export default function Tabs({ value: defaultValue = 0, barBackground = 'secondary', barTextColor, onChange, lazy, children }) {
  const styleSettings = {
    appBar: {},
  };

  if (! ['primary', 'secondary'].includes(barBackground)) {
    styleSettings.appBar.background = barBackground;
    barBackground = undefined; // disable the coloring
  } 

  if (barTextColor) {
    styleSettings.appBar.color = barTextColor;
  }

  const classes = useStyles(styleSettings);
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    onChange && onChange(newValue);
  };

  if (!Is.array(children)) {
    children = [children];
  }

  return (
    <div className={classes.root}>
      <AppBar classes={{root: classes.appBar}} color={barBackground} position="static">
        <MaterialTabs value={value} onChange={handleChange}>
          {children.map((tab, index) => (
            <MaterialTab value={tab.props.index || tab.props.value || index} key={index} label={tab.props.label} />
          ))}
        </MaterialTabs>
      </AppBar>
      {children.map((tab, index) => (
        <TabPanel key={index} lazy={lazy} value={value} index={tab.props.index || tab.props.value || index} children={tab.props.children} />
      ))}
    </div>
  );
}

Tabs.propTypes = {
  children: PropTypes.arrayOf(Tab).isRequired,
  value: PropTypes.any,
  barBackground: PropTypes.string, 
  barTextColor: PropTypes.string, 
  onChange: PropTypes.func, 
  lazy: PropTypes.bool, 
};

// export default function Tabss() {
//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <MaterialTabs value={value} onChange={handleChange}>
//           <Tab label="Item One" />
//           <Tab label="Item Two" />
//           <Tab label="Item Three" />
//         </MaterialTabs>
//       </AppBar>
//       <TabPanel value={value} index={0}>
//         Item One
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         Item Two
//       </TabPanel>
//       <TabPanel value={value} index={2}>
//         Item Three
//       </TabPanel>
//     </div>
//   );
// }