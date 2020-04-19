import React from 'react'
import styled from 'styled-components'
import cn from 'classnames'

// export const Icon = ({
//   source,
//   height = '20px',
//   fill,
//   width = '20px',
//   className,
//   isImage = false,
//   ...props
// }) => {
//   if (/.(jpe?g|png|gif|bmp)$/i.test(source) || isImage) {
//     return (
//       <IconImage
//         className={className}
//         src={source}
//         height={height}
//         width={width}
//         {...props}
//       />
//     )
//   }
//   return (
//     <IconSource
//       className={className}
//       fill={fill}
//       height={height}
//       width={width}
//       dangerouslySetInnerHTML={{ __html: source }}
//       {...props}
//     />
//   )
// }

// const IconImage = styled.img``

// const IconSource = styled.div`
//   svg {
//     height: ${props => props.height};
//     width: ${props => props.width};
//   }
//   path {
//     ${props => props.fill && 'fill: ' + props.fill};
//   }
// `

export const Icon = ({
  prefix: prefixFromProps = 'fe',
  name,
  className,
  link,
  isAriaHidden,
  payment,
  flag,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur
}) => {
  const prefix = (payment && 'payment') || (flag && 'flag') || prefixFromProps
  const classes = cn(
    {
      [prefix]: true,
      [`${prefix}-${name}`]: true
    },
    className
  )
  const extraProps = isAriaHidden
    ? {
        'aria-hidden': 'true'
      }
    : null

  const eventProps = {
    onClick,
    onMouseEnter,
    onMouseLeave,
    onPointerEnter,
    onPointerLeave,
    onFocus,
    onBlur
  }

  return !link ? (
    <I className={classes} {...eventProps} />
  ) : (
    <a className='icon' {...extraProps} {...eventProps}>
      <i className={classes} />
    </a>
  )
}

const I = styled.i`
  cursor: pointer;
`
