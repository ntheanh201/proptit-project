import React from 'react'
import cn from 'classnames'

import { CardOptions } from './CardOptions'
import { CardOptionsItem } from './CardOptionsItem'
import { CardStatus } from './CardStatus'
import { CardAlert } from './CardAlert'
import { CardHeader } from './CardHeader'
import { CardBody } from './CardBody'
import { CardFooter } from './CardFooter'

export class Card extends React.PureComponent {
  state = {
    isClosed: this.props.isClosed || false,
    isCollapsed: this.props.isCollapsed || false,
    isFullscreen: false
  }

  handleCloseOnClick = () => {
    this.setState(s => ({
      isClosed: !s.isClosed
    }))
  }

  handleCollapseOnClick = () => {
    this.setState(s => ({
      isCollapsed: !s.isCollapsed
    }))
  }

  handleFullscreenOnClick = () => {
    this.setState(s => ({
      isFullscreen: !s.isFullscreen
    }))
  }

  render() {
    const {
      className,
      children,
      RootComponent,
      title,
      body,
      options,
      isCollapsible,
      isClosable,
      isFullscreenable,
      aside,
      statusColor,
      statusSide,
      alert,
      alertColor,
      footer
    } = this.props
    const { isClosed, isCollapsed, isFullscreen } = this.state
    if (isClosed) {
      return null
    }
    const classes = cn(
      {
        card: true,
        aside: aside,
        'card-collapsed': isCollapsed,
        'card-fullscreen': isFullscreen
      },
      className
    )
    const Component = RootComponent || 'div'

    const card_options = (options || isCollapsible || isClosable) && (
      <CardOptions>
        {options}
        {isCollapsible && (
          <CardOptionsItem
            onClick={this.handleCollapseOnClick}
            type='collapse'
          />
        )}
        {isFullscreenable && (
          <CardOptionsItem
            type='fullscreen'
            onClick={this.handleFullscreenOnClick}
          />
        )}
        {isClosable && (
          <CardOptionsItem type='close' onClick={this.handleCloseOnClick} />
        )}
      </CardOptions>
    )

    const card_status = statusColor && (
      <CardStatus color={statusColor} side={statusSide} />
    )

    const card_alert = alert && alertColor && (
      <CardAlert color={alertColor}>{alert}</CardAlert>
    )

    const card_header = title && (
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {card_options}
      </CardHeader>
    )

    const card_body = body && <CardBody>{body}</CardBody>

    const card_footer = footer && <CardFooter>{footer}</CardFooter>

    if (card_header !== null || card_body !== null) {
      return (
        <Component className={classes}>
          {card_status}
          {card_header}
          {card_alert}
          {card_body || children}
          {card_footer}
        </Component>
      )
    } else {
      return <Component className={classes}>{children}</Component>
    }
  }
}
