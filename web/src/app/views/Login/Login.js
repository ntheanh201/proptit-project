import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// import { FormTextInput, StandaloneFormPage } from 'tabler-react'

import { withTouchedErrors } from 'helpers'
// import { FormCard } from 'layout'
import './Login.css'

import logo from '../../assets/ProPTIT.png'
import * as Actions from '../../redux/action-creators/home'


const LoginPage = props => {
  const dispatch = useDispatch()

  const { isLogged } = useSelector(state => state.homeReducer)

  // const { onBlur, strings = {} } = props
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [errors, setErrors] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

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
    }
  }

  if (isLogged) {
    return <Redirect to='/' />
  }

  return (
    <div className="login">
      <img src={logo} />
      <h4>Đăng nhập</h4>
      <div className="form-group">
        <input
          type="text"
          className={username !== '' ? 'form-control' : 'form-control is-invalid'}
          placeholder="Username"
          value={username}
          onChange={onChangeUsername}
          required
          />
        <div className="invalid-feedback">
          Vui lòng điền Username
        </div>
      </div>
      <div className="form-group show-pass-form">
        <input
          type={showPassword ? 'text' : 'password'}
          className={password !== '' ? 'form-control' : 'form-control is-invalid'}
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
          required
          />
        <div className="invalid-feedback">
          Vui lòng điền mật khẩu
        </div>
        {showPassword ?
          <i className="fas fa-eye show-pass" aria-hidden="true"
            onClick={() => setShowPassword(false)}
          ></i>
          :
          <i className="fa fa-eye-slash show-pass" aria-hidden="true"
            onClick={() => setShowPassword(true)}
          ></i>
        }        
      </div>
      <button
        type="submit"
        className="login-system"
        onClick={onSubmit}
        onKeyDown={handleKeyDown}
      >
        Login
      </button>
      <small className="feedback-login">
          {errors}
      </small>
    </div>
  )
  //   <StandaloneFormPage imageURL={logo}>
  //     <FormCard
  //       buttonText={strings.buttonText || defaultStrings.buttonText}
  //       title={strings.title || defaultStrings.title}
  //       onSubmit={onSubmit}
  //       method='POST'
  //     >
  //       <FormTextInput
  //         name='username'
  //         label={strings.usernameLabel || defaultStrings.usernameLabel}
  //         placeholder={
  //           strings.usernamePlaceholder || defaultStrings.usernamePlaceholder
  //         }
  //         onChange={onChangeUsername}
  //         onBlur={onBlur}
  //         value={username}
  //         error={errors}
  //       />
  //       <FormTextInput
  //         name='password'
  //         type='password'
  //         label={strings.passwordLabel || defaultStrings.passwordLabel}
  //         placeholder={
  //           strings.passwordPlaceholder || defaultStrings.passwordPlaceholder
  //         }
  //         onChange={onChangePassword}
  //         onKeyDown={handleKeyDown}
  //         onBlur={onBlur}
  //         value={password}
  //         error={errors}
  //       />
  //     </FormCard>
  //   </StandaloneFormPage>
  // )
}

export const Login = withTouchedErrors(['username', 'password'])(LoginPage)
