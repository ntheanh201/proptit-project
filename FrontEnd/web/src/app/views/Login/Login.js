import React from 'react'

import { FormTextInput, StandaloneFormPage } from 'tabler-react'

import { withTouchedErrors } from '../../Shared/helpers/withTouchedErrors'
import { FormCard } from '../../Shared/components/Form/FormCard'

const defaultStrings = {
  title: 'Login to your Account',
  buttonText: 'Login',
  usernameLabel: 'Username',
  usernamePlaceholder: 'Enter username',
  passwordLabel: 'Password',
  passwordPlaceholder: 'Password'
}

const LoginPage = props => {
  const {
    action,
    method,
    onSubmit,
    onChange,
    onBlur,
    values,
    strings = {},
    errors
  } = props

  return (
    <StandaloneFormPage imageURL={'./demo/logo.svg'}>
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

// export const Login = LoginPage
