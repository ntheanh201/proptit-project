import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { RingLoader as Ring } from 'ui'

export const ModalContext = createContext()

export const asModal = (options = {}) => WrappedComponent => props => {
  const { isVisible = true } = options
  if (!isVisible) {
    return null
  }
  return (
    <ModalEnhancer
      {...props}
      options={options}
      wrappedComponent={WrappedComponent}
    />
  )
}

const ModalEnhancer = ({
  wrappedComponent: WrappedComponent,
  options,
  className,
  ...restProps
}) => {
  const entrypoint = document.querySelector('body')
  const {
    closeButton = true,
    maxWidth = 'inherit',
    maxHeight = 'inherit',
    width = '100%',
    height = 'max-content',
    flexDirection = 'column',
    type
  } = options
  const onClose = restProps.onClose
  return ReactDOM.createPortal(
    <ModalWrapper className={className}>
      <ModalOverlay />
      <ModalContainer
        width={width}
        height={height}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        flexDirection={flexDirection}
      >
        {closeButton && onClose && (
          <CloseButton type={type} onClick={onClose} />
        )}
        <ModalContext.Provider value={{ onClose }}>
          <WrappedComponent {...restProps} />
        </ModalContext.Provider>
      </ModalContainer>
    </ModalWrapper>,
    entrypoint
  )
}

const CloseButton = styled.div`
  position: absolute;
  z-index: 3;
  right: 12px;
  top: 12px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  &:before,
  &:after {
    position: absolute;
    content: '';
    width: 1px;
    top: 8px;
    right: 16px;
    background: #666;
    ${props => props.type && 'background: #fff;'} height: 16px;
  }
  &:after {
    transform: rotate(45deg);
  }
  &:before {
    transform: rotate(-45deg);
  }
`

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 1000;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ModalContainer = styled.div`
  z-index: 1002;
  position: relative;
  max-width: ${props => props.maxWidth};
  max-height: ${props => props.maxHeight};
  height: ${props => props.height};
  width: ${props => props.width};
  background-color: #fff;
  box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.1412);
  display: flex;
  flex-direction: ${props => props.flexDirection};
`

const ModalOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 1001;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 300;
  text-align: center;
  margin: 0;
  padding-bottom: 16px;
  ${props => props.type && 'padding-left: 10px;'};
`

export const ModalHeader = styled.div`
  padding: 24px;
  padding-bottom: 0px;
  border-bottom: 1px solid #ddd;
  flex: 0 0 auto;
`

export const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  flex: 0 0 auto;
`

export const ModalContent = styled.div`
  padding: 24px;
  flex: 0 1 auto;
  overflow: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const ButtonWrapper = styled.div`
  display: flex;
  flex: 0 0 auto;
`

export const Button = styled.button`
  position: relative;
  flex: 0 1 100%;
  border: 0;
  height: 60px;
  font-size: 16px;
  text-transform: uppercase;
  padding: 14px;
  cursor: pointer;
  outline: none;
  background: #f8f8f8;
  color: #999;
  ${props =>
    props.template === 'warning' &&
    `
    background: #ffa502;
    color: #fff;
  `} ${props =>
    props.template === 'primary' &&
    `
    background: #12B1CF;
    color: #fff;
  `}
  &:hover:not(:disabled) {
    ${props =>
      props.template === 'warning' &&
      `
      color: #ffa502;
      background: #F8F8F8;
    `};
    ${props =>
      props.template === 'primary' &&
      `
      color: #12B1CF;
      background: #F8F8F8;
    `};
  }

  letter-spacing: 0.05em;
  border-radius: 0px;
  &:first-child:last-child {
    text-align: center;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  transition: all 0.1412s ease-in-out;
`

export const SecondaryButton = styled(Button)`
  background: #ddd;
  color: #666;
  &:hover {
    background: #999;
  }
`

export const SuccessButton = styled(Button)`
  background: #2ecc71;
  color: #fff;
  &:hover {
    background: #3edc81;
  }
`

export const DangerButton = styled(Button)`
  background: #ec644b;
  color: #fff;
`

export const PrimaryButton = styled(Button)`
  background: #12b1cf;
  color: #fff;

  &:hover:not(:disabled) {
    color: #12b1cf;
    background: #f8f8f8;
  }
`

export const ActionButtons = ({
  onSubmit,
  onClose,
  loading,
  disabled,
  submitButtonText = 'Save'
}) => (
  <ButtonPane>
    <SuccessButton onClick={onSubmit} disabled={loading || disabled}>
      {submitButtonText}
      {loading && <RingLoader small />}
    </SuccessButton>
    <SecondaryButton onClick={onClose} disabled={loading}>
      Abbrechen
    </SecondaryButton>
  </ButtonPane>
)

const ButtonPane = styled(ButtonWrapper)`
  margin-top: 15px;
  width: inherit;
`

const RingLoader = styled(Ring)`
  position: absolute;
  right: 30px;
  top: 10px;
`
