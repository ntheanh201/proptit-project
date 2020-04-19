import React from 'react'

import { DefaultErrorPage } from 'tabler-react'

export const Error404Page = ({
  title = '404',
  subtitle = 'Oops... You just found an error page...',
  details = 'We are sorry but the page you have requested can not be found...',
  action
}) => {
  return (
    <DefaultErrorPage
      title={title}
      subtitle={subtitle}
      details={details}
      action={action}
    />
  )
}
