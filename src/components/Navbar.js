import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import NotificationIcon from '@material-ui/icons/Notifications';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SettingsIcon from '@material-ui/icons/Settings';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

function Navbar(props) {
    const classes = useStyles();
    const [anchorEl1, setAnchorEl1] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'));
    const history = useHistory();

    const handleProfileClick = (event) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleProfileClose = () => {
        setAnchorEl1(null);
    };

    const handleSettingsClick = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleSettingsClose = () => {
        setAnchorEl2(null);
    };

    const openProfile = Boolean(anchorEl1);
    const openSettings = Boolean(anchorEl2);

    const onClickAddVideo = () => {
        //navigate to add video page
        setAnchorEl2(null)
        history.push('/add-video');
    }

    const onClickAddSpeaker = () => {
        //navigate to add speaker page
        setAnchorEl2(null)
        history.push('/add-speaker');
    }

    const navigateToHome = () => {
        history.push('/')
    }

    return (
        <div className={classes.root}>
            <div className={`${classes.logo} cursor`} onClick={navigateToHome}>
                <p className={classes.med}>med<span className={classes.x}>X</span></p>
            </div>
            <div className={classes.profile}>
                <div className={`${classes.icon} cursor`} onClick={handleSettingsClick}>
                    <SettingsIcon className={classes.notif} />
                </div>

                <div className={classes.icon}>
                    <NotificationIcon className={classes.notif} />
                </div>

                <div className="flex cursor" onClick={handleProfileClick}>
                    <div className={classes.icon}>
                        <img className={classes.profileImage} src={user ? user.avatar : "sample"} alt="user" />
                    </div>
                    <ArrowDropDownIcon />
                </div>
            </div>

            <Popover
                open={openProfile}
                anchorEl={anchorEl1}
                onClose={handleProfileClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div className={classes.popoverContent}>
                    <i className="cursor" onClick={props.onLogout}>Log Out</i>
                    <hr />
                </div>
            </Popover>

            <Popover
                open={openSettings}
                anchorEl={anchorEl2}
                onClose={handleSettingsClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div className={classes.popoverContent}>
                    <Typography color="primary" className="cursor" onClick={onClickAddVideo}>Add Video</Typography>
                    <hr />
                    <Typography color="primary" className="cursor" onClick={onClickAddSpeaker}>Add Speaker</Typography>
                </div>
            </Popover>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: 10
    },
    logo: {
        flex: 0.8,
    },
    med: {
        fontSize: 20,
        margin: 0,
        fontWeight: 'bold',
        letterSpacing: 1,
        color: theme.palette.primary.main
    },
    x: {
        fontSize: 26,
        color: theme.palette.primary.dark
    },
    profile: {
        display: 'flex',
        alignItems: 'center',
        flex: 0.2,
        justifyContent: 'flex-end'
    },
    icon: {
        width: 30,
        height: 30,
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '50%',
        cursor: 'pointer',
        marginLeft: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    notif: {
        color: theme.palette.primary.dark
    },
    logoutText: {
        cursor: 'pointer'
    },
    popoverContent: {
        padding: 15
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: '50%'
    }
}))

export default Navbar
