import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FormTextInput, StandaloneFormPage } from 'tabler-react'

import { withTouchedErrors } from 'helpers'
import { FormCard } from 'layout'
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

  const {
    action,
    method,
    onChange,
    onBlur,
    values,
    strings = {},
    errors
  } = props
  const history = useHistory()

  const onSubmit = async () => {
    //todo: check Login successfully
    await dispatch(Actions.updateLoginStatus(true))
    await history.push({ pathname: '/' })
  }

  return (
    <StandaloneFormPage imageURL={logo}>
      <FormCard
        buttonText={strings.buttonText || defaultStrings.buttonText}
        title={strings.title || defaultStrings.title}
        onSubmit={onSubmit}
        action={action}
        method={method}
      >
        <FormTextInput
          name='username'
          label={strings.usernameLabel || defaultStrings.usernameLabel}
          placeholder={
            strings.usernamePlaceholder || defaultStrings.usernamePlaceholder
          }
          onChange={onChange}
          onBlur={onBlur}
          value={values && values.username}
          error={errors && errors.username}
        />
        <FormTextInput
          name='password'
          type='password'
          label={strings.passwordLabel || defaultStrings.passwordLabel}
          placeholder={
            strings.passwordPlaceholder || defaultStrings.passwordPlaceholder
          }
          onChange={onChange}
          onBlur={onBlur}
          value={values && values.password}
          error={errors && errors.password}
        />
      </FormCard>
    </StandaloneFormPage>
  )
}

export const Login = withTouchedErrors(['username', 'password'])(LoginPage)
