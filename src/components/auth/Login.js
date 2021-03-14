import React, { useState } from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { loginUser } from './Rest';
import FormHelperText from '@material-ui/core/FormHelperText';

export default function Login(props) {

  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null)

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const onLogin = async () => {
    const user = {
      email,
      password
    }
    try {
      let response = await loginUser(user);
      if(response) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user))
        props.afterLogin()
      }
    } catch(err) {
      if(err.response.status === 400) {
        setErrors(err.response.data.errors)
      }
    }
  }

  return (
    <div className={classes.root}>
      <TextField
        label="Email"
        value={email}
        placeholder={""}
        onChange={handleEmailChange}
        margin="dense"
        className={classes.textField}
        variant="outlined"
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        placeholder={""}
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
        onClick={onLogin}
        className={classes.button}
      >
        Log In
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
