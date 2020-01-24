import React from 'react'
import cn from 'classnames'

export function CardFooter({ className, children }) {
  const classes = cn('card-footer', className)
  return <div className={classes}>{children}</div>
}
