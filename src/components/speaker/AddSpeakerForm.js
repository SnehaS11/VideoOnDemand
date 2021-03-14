import React from 'react'

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { toBase64 } from '../../Utils';

function AddSpeakerForm(props) {
    const { speaker, errors } = props;
    const classes = useStyles();

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
            <Typography color="primary" className={classes.title}>Speaker Details</Typography>

            <div className={classes.banner}>
                <img src={speaker.image ? speaker.image.data ? `data:image/png;base64,${toBase64(speaker.image.data.data)}` : URL.createObjectURL(speaker.image) : null} alt="banner" className={classes.image} />
                <Typography color="secondary" style={{ marginLeft: 20 }}>Images should be in 1:1 ratio and 1mb in size.</Typography>
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
                            Choose Image
                        </Button>
                    </label>
                </div>
            </div>

            <TextField
                label="Name"
                value={speaker.name}
                name="name"
                onChange={props.handleSpeakerChange}
                variant="outlined"
                className={classes.textField}
            />
            {getErrorMessage('name') &&
                <FormHelperText error>{getErrorMessage('name')}</FormHelperText>
            }

            <TextField
                label="Highest Education Qualification"
                value={speaker.qualification}
                name="qualification"
                onChange={props.handleSpeakerChange}
                variant="outlined"
                className={classes.textField}
            />
            {getErrorMessage('qualification') &&
                <FormHelperText error>{getErrorMessage('qualification')}</FormHelperText>
            }

            <TextField
                label="Institute Name"
                value={speaker.institute}
                name="institute"
                onChange={props.handleSpeakerChange}
                variant="outlined"
                className={classes.textField}
            />
            {getErrorMessage('institute') &&
                <FormHelperText error>{getErrorMessage('institute')}</FormHelperText>
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
        width: 200,
        height: 200,
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


export default AddSpeakerForm
