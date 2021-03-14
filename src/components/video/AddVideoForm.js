import React, { useState } from 'react'

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FormHelperText from '@material-ui/core/FormHelperText';
import { toBase64 } from '../../Utils';

function AddVideoForm(props) {
    const [showSpeakerField, setShowSpeakerField] = useState(false)
    const [showTagField, setShowTagField] = useState(false)
    const [tag, setTag] = useState('');
    const classes = useStyles();
    const { video, speakers, errors } = props;

    const handleSpeakerSelect = (event, value) => {
        props.handleSpeakerSelect(value._id)
        setShowSpeakerField(false)
    }

    const handleTagSelect = (event) => {
        setTag(event.target.value)
    }

    const handleEnterTag = event => {
        if (event.key === "Enter") {
            props.handleTagSelect(tag);
            setShowTagField(false)
            setTag('')
        }
    }

    const getSpeakerObject = (id) => {
        let speaker = speakers.find(s => s._id === id)
        return speaker ? speaker : {}
    }

    const handleDeleteSpeaker = (id) => {
        props.handleDeleteSpeaker(id)
    }

    const handleDeleteTag = (name) => {
        props.handleDeleteTag(name)
    }

    const getErrorMessage = (param) => {
        let err = null;
        if(errors) {
            err = errors.find(e => e.param === param)
            err = err ? err.msg : null;
        }
        return err
    }

    return (
        <Paper className={classes.paper}>
            <Typography color="primary" className={classes.title}>Video Details</Typography>

            <div className={classes.banner}>
                <img src={video.bannerImage ? video.bannerImage.data ? `data:image/png;base64,${toBase64(video.bannerImage.data.data)}` : URL.createObjectURL(video.bannerImage) : null} alt="banner" className={classes.image} />
                <Typography color="secondary" style={{ marginLeft: 20 }}>Images should be in 2:1 ratio and 1mb in size.</Typography>
                <div className={classes.bannerButton}>
                    <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="import-file"
                        type="file"
                        onChange={props.onClickChooseFile}
                    />
                    <label htmlFor="import-file">
                        <Button
                            variant="outlined"
                            color="secondary"
                            component="span"
                            classes={{
                                root: classes.bannerBtn,
                                label: classes.bannerLabel,
                            }}
                        >
                            Change Banner
                        </Button>
                    </label>
                </div>
            </div>
            {getErrorMessage('bannerImage') &&
                <FormHelperText error>{getErrorMessage('bannerImage')}</FormHelperText>
            }

            <TextField
                label="Video Name"
                value={video.title}
                name="title"
                onChange={props.handleVideoChange}
                variant="outlined"
                className={classes.textField}
            />
            {getErrorMessage('title') &&
                <FormHelperText error>{getErrorMessage('title')}</FormHelperText>
            }


            <TextField
                label="Video Description"
                value={video.desc}
                name="desc"
                onChange={props.handleVideoChange}
                variant="outlined"
                multiline
                rows={4}
                className={classes.textField}
            />
            {getErrorMessage('desc') &&
                <FormHelperText error>{getErrorMessage('desc')}</FormHelperText>
            }


            <TextField
                label="Video Link"
                value={video.link}
                name="link"
                onChange={props.handleVideoChange}
                variant="outlined"
                className={classes.textField}
            />
            {getErrorMessage('link') &&
                <FormHelperText error>{getErrorMessage('link')}</FormHelperText>
            }


            <Typography>Add Speakers</Typography>
            <div className="flex">
                {video.speakers.map((id, index) => (
                    <Chip
                        key={index}
                        avatar={<Avatar alt={getSpeakerObject(id).name} src={getSpeakerObject(id).image ? `data:image/png;base64,${toBase64(getSpeakerObject(id).image.data.data)}` : null} />}
                        label={getSpeakerObject(id).name}
                        onDelete={() => handleDeleteSpeaker(id)}
                        variant="outlined"
                        className={classes.item}
                    />
                ))}

                {showSpeakerField ?
                    speakers.length > 0 &&
                    <Autocomplete
                        id="combo-box-demo"
                        autoFocus
                        options={speakers}
                        getOptionLabel={(option) => option.name}
                        style={{ width: 200 }}
                        onChange={handleSpeakerSelect}
                        className={classes.item}
                        renderInput={(params) => <TextField {...params} label="Speaker" variant="outlined" margin="dense" />}
                    />
                    :
                    <IconButton onClick={() => setShowSpeakerField(true)} className={classes.item}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                }


            </div>
            <br />

            <Typography>Add Tags</Typography>
            {video.tags.map((tag, index) => (
                <Chip
                    key={index}
                    label={tag}
                    onDelete={() => handleDeleteTag(tag)}
                    variant="outlined"
                    className={classes.item}
                />
            ))}
            {showTagField ?
                <TextField
                    value={tag}
                    options={speakers}
                    autoFocus
                    getOptionLabel={(option) => option.name}
                    style={{ width: 200 }}
                    variant="outlined"
                    margin="dense"
                    onChange={handleTagSelect}
                    className={classes.item}
                    onKeyPress={handleEnterTag}
                    renderInput={(params) => <TextField {...params} label="Speaker" variant="outlined" margin="dense" />}
                />
                :
                <IconButton onClick={() => setShowTagField(true)} className={classes.item}>
                    <AddCircleOutlineIcon />
                </IconButton>
            }
        </Paper>
    )
}

const useStyles = makeStyles(theme => ({
    paper: {
        padding: 20
    },
    banner: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    image: {
        width: 300,
        height: 150,
        border: `1px solid ${theme.palette.secondary.light}`
    },
    bannerBtn: {
        textTransform: 'none',
    },
    bannerButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    textField: {
        width: '100%',
        margin: '10px 0',
    },
    title: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center'
    },
    item: {
        marginRight: 20
    },
    bannerLabel: {
        color: theme.palette.secondary.main
    }
}))

export default AddVideoForm
