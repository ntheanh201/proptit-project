import React from 'react'
import { Icon } from 'ui'

export const SiteLogo = ({ source, height, width, fill }) => {
  return (
    <Icon source={require(source)} height={height} width={width} fill={fill} />
  )
}
