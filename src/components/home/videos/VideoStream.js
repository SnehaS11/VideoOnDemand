import React from 'react'
import ReactPlayer from 'react-player'

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import Speakers from '../../common/Speakers';
import VideoDetails from '../../common/VideoDetails';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function VideoStream(props) {
    const { open, video, relatedVideos } = props;
    const classes = useStyles();

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.handleClose}
            classes={{
                paperWidthSm: classes.dialog
            }}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <CloseIcon className={`cursor ${classes.closeIcon}`} onClick={props.handleClose} /><br /><br />
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <ReactPlayer
                        url={video.link}
                        controls
                    />
                    <div className={classes.content}>
                        <Typography className={classes.title} variant="h6">{video.title}</Typography>
                        <div className={classes.topic}>
                            Topic: {video.tags[0]}
                        </div>

                        <Typography color="secondary" variant="caption">{video.desc}</Typography>
                        <Speakers
                            speakers={video.speakers}
                        />
                        <br />

                        <Typography color="secondary" variant="caption"><b>More videos</b></Typography>
                        {relatedVideos.map((video) => (
                            <VideoDetails video={video} />
                        ))}
                    </div>

                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

const useStyles = makeStyles((theme) => ({
    closeIcon: {
        position: 'absolute',
        right: 10,
        top: 10
    },
    dialog: {
        height: '100vh',
        maxWidth: 700
    },
    title: {
        color: theme.palette.primary.dark,
        fontWeight: 'bold'
    },
    content: {
        padding: '10 20px'
    },
    topic: {
        border: `1px solid ${theme.palette.primary.dark}`,
        borderRadius: 5,
        padding: 3,
        color: theme.palette.primary.dark,
        width: 'fit-content',
        fontSize: 14
    }
}))

export default VideoStream
