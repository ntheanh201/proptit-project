import React from 'react'
import cn from 'classnames'

export function CardHeader({ className, children, backgroundURL = '' }) {
  const classes = cn('card-header', className)

  return (
    <div
      className={classes}
      style={
        backgroundURL
          ? Object.assign({
              backgroundImage: `url(${backgroundURL})`
            })
          : null
      }
    >
      {children}
    </div>
  )
}
