import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { FormTextInput, StandaloneFormPage } from 'tabler-react'

import { withTouchedErrors } from 'helpers'
import { FormCard } from 'layout'

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

const LoginPage = props => {
  const dispatch = useDispatch()

  const { isLogged } = useSelector(state => state.homeReducer)

  const { onBlur, strings = {} } = props
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [errors, setErrors] = useState(null)

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onSubmit = () => {
    dispatch(Actions.updateLogin({ username, password })).then(result => {
      if (result === 401) {
        setErrors('Wrong username or password')
      }
    })
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      onSubmit()
      window.location.reload()
    }
  }

  if (isLogged) {
    return <Redirect to='/' />
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
          onKeyDown={handleKeyDown}
          onBlur={onBlur}
          value={password}
          error={errors}
        />
      </FormCard>
    </StandaloneFormPage>
  )
}

export const Login = withTouchedErrors(['username', 'password'])(LoginPage)
