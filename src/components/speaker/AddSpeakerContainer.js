import React, { useState } from 'react'
import { createSpeaker } from '../Rest';
import AddSpeakerForm from './AddSpeakerForm';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';

function AddSpeakerContainer() {
    const classes = useStyles();
    const [speaker, setSpeaker] = useState({
        name: '',
        image: null,
        qualification: '',
        institute: ''
    })
    const [snack, setSnack] = useState({
        msg: '',
        show: false
    })
    const [errors, setErrors] = useState(null)

    const handleSpeakerChange = (event) => {
        setSpeaker({
            ...speaker,
            [event.target.name]: event.target.value
        })
    }

    const onClickChooseFile = (event) => {
        setSpeaker({
            ...speaker,
            image: event.target.files[0]
        })
    }

    const clearFields = () => {
        setSpeaker({
            name: '',
            image: null,
            qualification: '',
            institute: ''
        })
        setErrors(null)
    }

    const onSaveSpeaker = async () => {
        let data = new FormData();
        data.append('name', speaker.name)
        data.append('image', speaker.image)
        data.append('qualification', speaker.qualification)
        data.append('institute', speaker.institute)

        try{
            await createSpeaker(data);
            setSnack({
                msg: 'Speaker created successfully',
                show: true
            })
            clearFields()
        }catch(err) {
            console.log('error creating speaker', err)
            setErrors(err.response.data.errors)
        }
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
                onClick={onSaveSpeaker}
            >
                Save Speaker
            </Button>
            <AddSpeakerForm
                speaker={speaker}
                errors={errors}
                handleSpeakerChange={handleSpeakerChange}
                onClickChooseFile={onClickChooseFile}
            />

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
        padding: '20px 60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    button: {
        backgroundColor: theme.palette.primary.dark,
        margin: 20,
        '&:hover': {
            backgroundColor: theme.palette.primary.main
        }
    },
    [theme.breakpoints.down('sm')]: {
        root: {
            padding: '0 10px'
        }
    }
}))

export default AddSpeakerContainer
