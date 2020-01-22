/* eslint-disable react/jsx-no-bind */
import React from 'react'
import styled from 'styled-components'
import { Paragraph } from 'base'

export const ToggleSwitch = ({
  checkedColor = 'rgb(39, 174, 96)',
  uncheckedColor = '#ccc',
  icons,
  disabled,
  onSwitch,
  value,
  name,
  checked,
  Inverted,
  ...props
}) => {
  const onSwitchToggle = () => {
    if (!disabled) {
      onSwitch && onSwitch(!checked)
    }
  }

  return (
    <Switch>
      {icons && checked ? (
        <CheckedIcon onClick={onSwitchToggle}>{icons.checked}</CheckedIcon>
      ) : (
        icons && (
          <UncheckedIcon onClick={onSwitchToggle}>
            {icons.unchecked}
          </UncheckedIcon>
        )
      )}
      <Slider
        checked={Inverted ? !checked : checked}
        disabled={disabled}
        checkedColor={checkedColor}
        uncheckedColor={uncheckedColor}
        onClick={onSwitchToggle}
      />
      {checked}
    </Switch>
  )
}

const CheckedIcon = styled.div`
  position: absolute;
  left: 5px;
  bottom: 2px;
  z-index: 2;
  cursor: pointer;
`

const UncheckedIcon = styled(CheckedIcon)`
  left: 25px;
`

export const ToggleWrapper = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
`

export const ToggleText = styled(Paragraph)`
  margin-right: 10px;
`

const Switch = styled.div`
  position: relative;
  display: inline-block;
  width: 54px;
  height: 27px;
`

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props =>
    props.disabled
      ? '#aaa'
      : props.checked
      ? props.checkedColor
      : props.uncheckedColor};
  border-radius: 34px;
  transition: 0.4s;
  &:before {
    position: absolute;
    content: '';
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 4px;
    background-color: ${props => (props.disabled ? '#ccc' : '#fff')};
    border-radius: 50%;
    transition: 0.4s;
    transform: ${props =>
      props.checked ? 'translateX(30px)' : 'translateX(0px)'};
  }
`
