/* eslint-disable space-before-function-paren */
import React from 'react'
import 'react-toastify/dist/ReactToastify.css'

import { toast } from 'react-toastify'

/*
 * Adapter for react-toastify
 * https://github.com/fkhadra/react-toastify
 **/

const ToastMessage = ({ message }) => {
  return <p>{message.replace('GraphQL error:', '')} </p>
}

export const ToastService = {
  notify(message, options) {
    return toast(<ToastMessage message={message} />, {
      position: ToastService.Position.BOTTOM_LEFT,
      ...options
    })
  },
  info(message, options) {
    return ToastService.notify(message, {
      type: ToastService.Type.INFO,
      ...options
    })
  },
  error(message, options) {
    return ToastService.notify(message, {
      type: ToastService.Type.ERROR,
      ...options
    })
  },
  warning(message, options) {
    return ToastService.notify(message, {
      type: ToastService.Type.WARNING,
      ...options
    })
  },
  success(message, options) {
    return ToastService.notify(message, {
      type: ToastService.Type.SUCCESS,
      ...options
    })
  },
  Position: toast.POSITION,
  Type: toast.TYPE
}
