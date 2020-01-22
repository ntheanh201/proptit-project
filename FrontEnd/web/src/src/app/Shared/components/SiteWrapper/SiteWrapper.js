/* eslint-disable id-length */
// @flow

import * as React from 'react'

import { Page } from 'tabler-react'
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
      <Page>
        <Page.Main>
          <SiteHeader {...headerPropsWithToggleClick} />
          <SiteNav {...navPropsWithCollapse} />
          {children}
        </Page.Main>
        <SiteFooter {...footerProps} />
      </Page>
    )
  }
}

export default SiteWrapper
