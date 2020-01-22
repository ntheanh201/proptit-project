import React from 'react'
import styled from 'styled-components'
import { Dropdown, Avatar } from 'tabler-react'

const defaultOptions = {
  profile: { icon: 'user', value: 'Profile', to: '/profile' },
  settings: { icon: 'settings', value: 'Settings', to: '/settings' },
  mail: { icon: 'mail', value: 'Inbox', to: '/mail' },
  message: { icon: 'send', value: 'Message', to: '/message' },
  help: { icon: 'help-circle', value: 'Need help?', to: '/help' },
  logout: { icon: 'log-out', value: 'Sign out', to: '/logout' },
  divider: { isDivider: true }
}

const itemsFromDefaultOptions = options =>
  options.map(opt => (typeof opt === 'string' ? defaultOptions[opt] : opt))

export const AccountDropdown = ({
  avatarURL,
  avatarLogo,
  avatarOptions,
  name,
  description,
  options = [],
  optionsRootComponent
}) => {
  const itemsObjects = itemsFromDefaultOptions(options)

  return (
    <Dropdown
      isNavLink
      triggerClassName='pr-0 leading-none'
      triggerContent={
        <React.Fragment>
          {avatarURL && <Avatar imageURL={avatarURL} />}
          {React.createElement(avatarLogo, avatarOptions)}
          <span className='ml-2 d-none d-lg-block'>
            <span className='text-default'>{name}</span>
            <small className='text-muted d-block mt-1'>{description}</small>
          </span>
        </React.Fragment>
      }
      position='bottom-end'
      arrow
      arrowPosition='right'
      toggle={false}
      itemsObject={itemsObjects}
      itemsRootComponent={optionsRootComponent}
    />
  )
}
