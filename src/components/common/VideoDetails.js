import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import { toBase64 } from '../../Utils';

function VideoDetails({ video }) {
    const classes = useStyles();

    return (
        <div className={classes.card} key={video._id} >
            <div style={{width: 250, height: 150}}>
            <img
                src={video.bannerImage ? `data:image/png;base64,${toBase64(video.bannerImage.data.data)}` : null}
                className={classes.image}
                alt={video.title}
                width={250}
                height={150}
            />
            </div>

            <div style={{marginLeft: 20}}>
                <b>{video.title}</b>
                <br />
                <Typography variant="caption" color="secondary">{video.desc}</Typography>
            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    image: {
        // width: '300px !important',
        // height: '150px !important',
        borderRadius: 10
    },
    card: {
        display: 'flex',
        alignItems: 'center',
        width: 500
    }
}))

export default VideoDetails
