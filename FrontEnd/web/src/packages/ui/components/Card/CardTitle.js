import React from 'react'
import cn from 'classnames'

export function CardTitle({ className, children, RootComponent }) {
  const classes = cn('card-title', className)
  const Component = RootComponent || 'h3'
  return <Component className={classes}>{children}</Component>
}
