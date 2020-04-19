import React from 'react'
import cn from 'classnames'
import { Icon } from 'ui'

export function CardOptionsItem({ className, children, icon, type, onClick }) {
  const classes = cn(
    {
      'card-options-collapse': type === 'collapse',
      'card-options-remove': type === 'close',
      'card-options-fullscreen': type === 'fullscreen'
    },
    className
  )

  const dataToggle = (() => {
    switch (type) {
      case 'collapse':
        return 'card-collapse'
      case 'close':
        return 'card-remove'
      case 'fullscreen':
        return 'card-remove'
      default:
        return ''
    }
  })()

  const iconName = (() => {
    if (icon) {
      return icon
    }
    switch (type) {
      case 'collapse':
        return 'chevron-up'
      case 'close':
        return 'x'
      case 'fullscreen':
        return 'maximize'
      default:
        return ''
    }
  })()

  return (
    <a className={classes} data-toggle={dataToggle} onClick={onClick}>
      <Icon source={iconName} />
    </a>
  )
}
