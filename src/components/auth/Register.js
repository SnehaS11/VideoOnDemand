import React, { useState } from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import { registerUser } from './Rest';

export default function Register(props) {

    const classes = useStyles();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(null);

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const onRegister = async () => {
        const user = {
            name,
            email,
            password
        }

        try {
            const response = await registerUser(user);
            if (response) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                props.afterLogin()
            }
        } catch (err) {
            if (err.response.status === 400) {
                setErrors(err.response.data.errors)
            }
        }


    }

    return (
        <div className={classes.root}>
            <TextField
                label="Name"
                value={name}
                onChange={handleNameChange}
                margin="dense"
                className={classes.textField}
                variant="outlined"
            />

            <TextField
                label="Email"
                value={email}
                onChange={handleEmailChange}
                margin="dense"
                className={classes.textField}
                variant="outlined"
            />

            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                margin="dense"
                className={classes.textField}
                variant="outlined"
            />

            {errors && errors.map(err => (
        <FormHelperText error>{err.msg}</FormHelperText>
      ))}

            <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={onRegister}
                className={classes.button}
            >
                Register
            </Button>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    textField: {
        width: 300,
        margin: 10
    },
    button: {
        marginTop: 20
    }
}));
