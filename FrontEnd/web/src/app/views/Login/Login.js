import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { FormTextInput, StandaloneFormPage } from 'tabler-react'

import { withTouchedErrors } from '../../Shared/helpers/withTouchedErrors'
import { FormCard } from '../../Shared/components/Form/FormCard'

import logo from '../../assets/ProPTIT.png'
import { PreloaderContext } from '../../Preloader'

const defaultStrings = {
  title: 'Login to your Account',
  buttonText: 'Login',
  usernameLabel: 'Username',
  usernamePlaceholder: 'Enter username',
  passwordLabel: 'Password',
  passwordPlaceholder: 'Password'
}

const LoginPage = props => {
  const { setState: setPreloaderState } = useContext(PreloaderContext)
  const {
    action,
    method,
    onChange,
    onBlur,
    values,
    strings = {},
    errors,
    history
  } = props

  const onSubmit = async () => {
    //todo: check Login successfully
    await setPreloaderState({ isLoggedIn: true })
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

export const Login = withRouter(
  withTouchedErrors(['username', 'password'])(LoginPage)
)

// export const Login = LoginPage
