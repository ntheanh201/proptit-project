/* eslint-disable id-length */

import React from 'react'
import styled from 'styled-components'

import { SiteFooter } from './SiteFooter'
import { SiteNav } from './SiteNav'
import { SiteHeader } from './SiteHeader'

class SiteWrapper extends React.PureComponent {
  state = {
    collapseMobileMenu: true
  }

  handleCollapseMobileMenu = () => {
    this.setState(s => ({ collapseMobileMenu: !s.collapseMobileMenu }))
  }

  render() {
    const {
      headerProps,
      navProps,
      footerProps,
      children,
      routerContextComponentType
    } = this.props

    const headerPropsWithToggleClick = {
      ...headerProps,
      onMenuToggleClick: this.handleCollapseMobileMenu
    }
    const navPropsWithCollapse = {
      ...navProps,
      collapse: this.state.collapseMobileMenu,
      routerContextComponentType
    }

    return (
      <Wrapper>
        <SiteHeader {...headerPropsWithToggleClick} />
        <SiteNav {...navPropsWithCollapse} />
        {children}
        {/* <SiteFooter {...footerProps} /> */}
      </Wrapper>
    )
  }
}

export default SiteWrapper

const Wrapper = styled.div``
