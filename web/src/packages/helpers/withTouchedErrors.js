import React from 'react'

const touchedErrors = (touched = {}, errors = {}, fields = []) => {
  return fields.reduce(
    (acc, cur) =>
      Object.assign(acc, {
        [cur]: touched && touched[cur] && errors ? errors[cur] : ''
      }),
    {}
  )
}

export const withTouchedErrors = (fields = []) => {
  return function withComponent(Component) {
    return function WithTouchedErrors(props) {
      const errors = touchedErrors(props.touched, props.errors, fields)
      return <Component {...props} errors={errors} />
    }
  }
}
