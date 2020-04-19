import React from 'react'
import cn from 'classnames'

export function CardOptions({ className, children }) {
  const classes = cn('card-options', className)
  return <div className={classes}>{children}</div>
}
