import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import { toBase64 } from '../../../Utils';

function VideoCard(props) {
    const { video } = props;
    const classes = useStyles();

    return (
        <div key={video.id} className={`${classes.root} cursor`}
            style={{
                background: video.bannerImage ? `radial-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)), url('data:image/png;base64,${toBase64(video.bannerImage.data.data)}` : null
            }}
            onClick={() => props.onClickVideo(video)}
        >
            <Typography className={classes.text}>{video.title}</Typography>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: 300,
        height: 170,
        margin: '0px 30px 20px 0',
        position: 'relative',
        borderRadius: 10,
        backgroundSize: '100% 100% !important',
        backgroundRepeat: 'no-repeat !important',
    },
    image: {
        width: 300,
        height: 170,
        borderRadius: 10,
        opacity: 0.8
    },
    text: {
        position: 'absolute',
        bottom: 10,
        color: 'white',
        fontSize: 14,
        marginLeft: 20,
        fontWeight: 'bold'
    }
}))

export default VideoCard
