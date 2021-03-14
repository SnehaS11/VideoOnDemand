import React, { useState, useEffect } from 'react'
import VideoShowcase from './VideoShowcase';
import AddVideoForm from './AddVideoForm';
import { fetchSpeakers } from '../home/Rest';
import { createVideo } from '../Rest';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';

export default function AddVideoContainer() {
    const [video, setVideo] = useState({
        bannerImage: '',
        title: '',
        desc: '',
        link: '',
        speakers: [],
        tags: []
    })
    const [speakers, setSpeakers] = useState([])
    const [snack, setSnack] = useState({
        msg: '',
        show: false
    })
    const [errors, setErrors] = useState(null)

    const classes = useStyles();

    useEffect(() => {
        async function fetchData() {
            const resp = await fetchSpeakers();
            setSpeakers(resp.data)
        }
        fetchData();
    }, [])

    const handleVideoChange = (event) => {
        setVideo({
            ...video,
            [event.target.name]: event.target.value
        })
    }

    const handleSpeakerSelect = (value) => {
        let updatedVideo = {
            ...video,
            speakers: [
                ...video.speakers,
                value
            ]
        }
        setVideo(updatedVideo)
    }

    const handleTagSelect = (value) => {
        setVideo({
            ...video,
            tags: [
                ...video.tags,
                value
            ]
        })
    }

    const handleDeleteSpeaker = (id) => {
        let speakerIndex = video.speakers.findIndex(s => s === id);
        let speakers = [...video.speakers]
        speakers.splice(speakerIndex, 1)
        setVideo({
            ...video,
            speakers
        })
    }

    const handleDeleteTag = (name) => {
        let tagIndex = video.tags.findIndex(t => t === name);
        let tags = [...video.tags]
        tags.splice(tagIndex, 1)
        setVideo({
            ...video,
            tags
        })
    }

    const onClickChooseFile = (event) => {
        setVideo({
            ...video,
            bannerImage: event.target.files[0]
        })
    }

    const onSaveVideo = async () => {
        var data = new FormData();
        data.append('bannerImage', video.bannerImage)
        data.append('title', video.title)
        data.append('desc', video.desc)
        data.append('link', video.link)
        data.append('tags', video.tags.join(","))
        data.append('speakers', video.speakers.join(","))

        try {
            await createVideo(data);
            setSnack({
                msg: 'Video created successfully',
                show: true
            })
            clearFields();
        } catch(err) {
            console.log('error creating video', err.response.data)
            setErrors(err.response.data.errors)
        }
    }

    const clearFields = () => {
        setVideo({
            bannerImage: '',
            title: '',
            desc: '',
            link: '',
            speakers: [],
            tags: []
        })
        setErrors(null)
    }

    const closeSnackbar = () => {
        setSnack({
            msg: '',
            show: false
        })
    }

    return (
        <div className={classes.root}>
            <Button
                variant="contained"
                className={classes.button}
                onClick={onSaveVideo}
            >
                Save Video
            </Button>
            <br />

            <Grid container spacing={4}>
                <Grid item xs={12} sm={5}>
                    <AddVideoForm
                        video={video}
                        speakers={speakers}
                        errors={errors}
                        handleVideoChange={handleVideoChange}
                        onClickChooseFile={onClickChooseFile}
                        handleSpeakerSelect={handleSpeakerSelect}
                        handleTagSelect={handleTagSelect}
                        handleDeleteSpeaker={handleDeleteSpeaker}
                        handleDeleteTag={handleDeleteTag}
                    />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <VideoShowcase
                        video={video}
                        speakers={speakers}
                    />
                </Grid>
            </Grid>

            <Snackbar
                open={snack.show}
                message={snack.msg}
                autoHideDuration={2000}
                onClose={closeSnackbar}
            />
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
      padding: '20px 60px'
    },
    button: {
        float: 'right',
        backgroundColor: theme.palette.primary.dark,
        margin: 20,
        '&:hover': {
            backgroundColor: theme.palette.primary.main
        }
    }
}))
