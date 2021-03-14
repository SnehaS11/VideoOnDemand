import React from 'react'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { toBase64 } from '../../Utils';
import Speakers from '../common/Speakers';

function VideoShowcase(props) {
    const { video, speakers } = props;
    const classes = useStyles();

    const getSpeakerObject = (id) => {
        let speaker = speakers.find(s => s._id === id)
        return speaker ? speaker : {}
    }

    const getVideoSpeakers = () => {
        let videoSpeakers = [];
        video.speakers.forEach(s => {
            videoSpeakers.push(getSpeakerObject(s))
        })
        return videoSpeakers;
    }

    return (
        <Paper className={classes.paper}>
            <Typography color="primary" className={classes.title}>Video Showcase</Typography><br />
            <Grid container spacing={3}>
                <Grid item xs={5}>
                    <img
                        src={video.bannerImage ? video.bannerImage.data ? `data:image/png;base64,${toBase64(video.bannerImage.data.data)}` : URL.createObjectURL(video.bannerImage) : null}
                        alt="banner"
                        className={classes.image}
                    />
                </Grid>

                <Grid item xs={6}>
                    <b style={{ fontSize: 14 }}>{video.title}</b>
                    <p style={{ fontSize: 14 }}>{video.desc}</p>

                    <Speakers speakers={getVideoSpeakers()} />
                </Grid>
            </Grid>
        </Paper>
    )
}

const useStyles = makeStyles(theme => ({
    paper: {
        padding: 30,
    },
    image: {
        width: 300,
        height: 150,
        border: theme.palette.secondary.light
    }
}))

export default VideoShowcase
