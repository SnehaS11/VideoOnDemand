import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Home from './home/Home';
import Navbar from './Navbar';
import { makeStyles } from '@material-ui/core/styles';
import AddVideoContainer from './video/AddVideoContainer';
import AddSpeakerContainer from './speaker/AddSpeakerContainer';

export default function Main(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Navbar onLogout={props.onLogout}/>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/add-video' component={AddVideoContainer} />
                <Route exact path='/add-speaker' component={AddSpeakerContainer} />
            </Switch>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `linear-gradient(#8fc6f5, #f7fbff)`,
        width: '100%',
        height: '70vh'
    }
}))
