import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import Auth from './components/auth/Auth';
import Main from './components/Main';
import { initInterceptor } from './Interceptor';

const App = () => {

  const [token, setToken] = useState(null)

  useEffect(() => {
    initInterceptor(onLogout);
    initializeContext();
  }, [])

  const initializeContext = () => {
    setToken(localStorage.getItem('token'));
  }

  const onLogout = () => {
    localStorage.clear();
    setToken(null);
  }

  const afterLogin = () => {
    initializeContext();
  }

  return (
    <Fragment>
      {token ?
        <Main onLogout={onLogout}/>
        :
        <Auth afterLogin={afterLogin}/>
      }
    </Fragment>
  )
}



export default App;
