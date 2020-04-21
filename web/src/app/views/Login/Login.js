import React, { useState } from 'react'
import querystring from 'querystring'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { FormTextInput, StandaloneFormPage } from 'tabler-react'

import { withTouchedErrors } from 'helpers'
import { FormCard } from 'layout'
import environments from 'environments'

import * as Actions from '../../redux/action-creators/home'

import logo from '../../assets/ProPTIT.png'

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
    axios
      .get(`${environments.BASE_URL}auth/users/me/`, {
        headers: {
          Authorization: `Bearer ${accessKey}`
        }
      })
      .then((response) => {
        localStorage.setItem('userData', JSON.stringify(response.data))
        dispatch(Actions.updateUserInfo(response.data))
        history.push({ pathname: '/' })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onSubmit = async () => {
    await axios
      .post(`${environments.BASE_URL}auth/jwt/create/`, { username, password })
      .then((response) => {
        dispatch(Actions.updateLoginStatus(true))
        localStorage.setItem('authToken', JSON.stringify(response.data))
      })
      .catch((error) => {
        console.log(error)
      })
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
