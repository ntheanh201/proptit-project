import React from 'react'
import styled from 'styled-components'
import { Container, Notification } from 'tabler-react'
// import { SiteLogo } from './SiteLogo'

import Logo from '../../../assets/logo.svg'
import { AccountDropdown } from '../AccountDropdown/AccountDropdown'

export const SiteHeader = ({
  children,
  align,
  notificationsTray: notificationsTrayFromProps,
  accountDropdown: accountDropdownFromProps,
  navItems,
  onMenuToggleClick
}) => {
  const notificationsTray =
    notificationsTrayFromProps &&
    React.createElement(Notification.Tray, notificationsTrayFromProps)

  const accountDropdown =
    accountDropdownFromProps &&
    React.createElement(AccountDropdown, accountDropdownFromProps)

  return (
    <div className='header py-4'>
      <Container className={align}>
        <div className='d-flex'>
          {children || (
            <React.Fragment>
              <StyledLogo />
              <div className='d-flex order-lg-2 ml-auto'>
                {navItems}
                {notificationsTray}
                {accountDropdown}
              </div>
              <a
                className='header-toggler d-lg-none ml-3 ml-lg-0'
                onClick={onMenuToggleClick}
              >
                <span className='header-toggler-icon' />
              </a>
            </React.Fragment>
          )}
        </div>
      </Container>
    </div>
  )
}

const StyledLogo = styled(Logo)`
  width: 32px;
  height: 32px;
`
