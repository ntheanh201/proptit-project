import React from 'react'

export const SiteLogo = ({ src, alt, href }) => {
  return (
    <a className='header-brand' href={href}>
      <img src={src} className='header-brand-img' alt={alt} />
    </a>
  )
}
