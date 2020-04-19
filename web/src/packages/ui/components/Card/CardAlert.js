import React from 'react'
import cn from 'classnames'

export function CardAlert({ className, children, color }) {
  const classes = cn(`card-alert alert alert-${color} mb-0`, className)
  return <div className={classes}>{children}</div>
}
