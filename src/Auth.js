import React, { useState, useEffect } from 'react'

import { Button } from '@material-ui/core'

import { auth, googleProvider } from './firebaseConf'

const Auth = (props) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(
      (user) => {
        setUser(user)
      }
    )
  }, [])

  const onLogInClick = () => auth.signInWithPopup(googleProvider)

  return (
    user ?
      props.children
      :
      <Button
        onClick={onLogInClick}
      >
        LOG IN BY GOOGLE
      </Button>
  )
}

Auth.propTypes = {}

export default Auth