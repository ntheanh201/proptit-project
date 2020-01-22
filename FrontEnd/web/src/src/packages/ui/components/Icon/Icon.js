import React from 'react'
import styled from 'styled-components'

export const Icon = ({
  source,
  height = '20px',
  fill,
  width = '20px',
  className,
  isImage = false,
  ...props
}) => {
  if (/.(jpe?g|png|gif|bmp)$/i.test(source) || isImage) {
    return (
      <IconImage
        className={className}
        src={source}
        height={height}
        width={width}
        {...props}
      />
    )
  }
  return (
    <IconSource
      className={className}
      fill={fill}
      height={height}
      width={width}
      dangerouslySetInnerHTML={{ __html: source }}
      {...props}
    />
  )
}

const IconImage = styled.img``

const IconSource = styled.div`
  svg {
    height: ${props => props.height};
    width: ${props => props.width};
  }
  path {
    ${props => props.fill && 'fill: ' + props.fill};
  }
`
