import React from 'react'
import cn from 'classnames'

export function CardBody({ className, children }) {
  const classes = cn('card-body', className)
  return <div className={classes}>{children}</div>
}
