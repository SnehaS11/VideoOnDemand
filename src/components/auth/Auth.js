import React, { useState } from 'react'
import BgImage from '../../assets/images/bg.png';
import Login from './Login';
import Register from './Register';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../common/TabPanel';
import { makeStyles } from '@material-ui/core/styles';

export default function Auth(props) {

    const classes = useStyles();
    const [tab, setTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTab(newValue)
    }

    return (
        <div className={classes.container}>
            <Paper className={classes.paper}>
                <Tabs
                    value={tab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleTabChange}
                >
                    <Tab label="Log In" />
                    <Tab label="Register" />
                </Tabs>
                <TabPanel value={tab} index={0}>
                    <Login afterLogin={props.afterLogin}/>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <Register afterLogin={props.afterLogin}/>
                </TabPanel>
            </Paper>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundImage: `url(${BgImage})`,
        height: '100vh',
        width: '100%',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        padding: 20,
        position: 'absolute',
        top: '30%',
    }
}));
