import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { FormTextInput, StandaloneFormPage } from 'tabler-react'

import { withTouchedErrors } from 'helpers'
import { FormCard } from 'layout'
import { SignInService, fetchUserDataService } from 'services'

import logo from '../../assets/ProPTIT.png'
import * as Actions from '../../redux/action-creators/home'

const defaultStrings = {
  title: 'Login to your Account',
  buttonText: 'Login',
  usernameLabel: 'Username',
  usernamePlaceholder: 'Enter username',
  passwordLabel: 'Password',
  passwordPlaceholder: 'Password'
}

const LoginPage = (props) => {
  const dispatch = useDispatch()

  const { onBlur, strings = {} } = props
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [errors, setErrors] = useState(null)

  const onChangeUsername = (event) => {
    setUsername(event.target.value)
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value)
  }

  const history = useHistory()

  const fetchUserData = (accessKey) => {
    dispatch(Actions.updateUserInfo(fetchUserDataService(accessKey)))
    history.push({ pathname: '/' })
  }

  const onSubmit = async () => {
    // eslint-disable-next-line new-cap
    await SignInService(username, password)
    dispatch(Actions.updateLoginStatus(true))
    const authToken = JSON.parse(localStorage.getItem('authToken'))
    await fetchUserData(authToken.access)
  }

  return (
    <StandaloneFormPage imageURL={logo}>
      <FormCard
        buttonText={strings.buttonText || defaultStrings.buttonText}
        title={strings.title || defaultStrings.title}
        onSubmit={onSubmit}
        method='POST'
      >
        <FormTextInput
          name='username'
          label={strings.usernameLabel || defaultStrings.usernameLabel}
          placeholder={
            strings.usernamePlaceholder || defaultStrings.usernamePlaceholder
          }
          onChange={onChangeUsername}
          onBlur={onBlur}
          value={username}
          error={errors}
        />
        <FormTextInput
          name='password'
          type='password'
          label={strings.passwordLabel || defaultStrings.passwordLabel}
          placeholder={
            strings.passwordPlaceholder || defaultStrings.passwordPlaceholder
          }
          onChange={onChangePassword}
          onBlur={onBlur}
          value={password}
          error={errors}
        />
      </FormCard>
    </StandaloneFormPage>
  )
}

export const Login = withTouchedErrors(['username', 'password'])(LoginPage)
