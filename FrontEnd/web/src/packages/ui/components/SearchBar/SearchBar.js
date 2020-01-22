import React from 'react'
import styled from 'styled-components'

import StandardSearchIcon from './search.svg'

export const SearchBar = ({
  defaultValue,
  onFilterChange,
  placeholder,
  noLabel = false,
  label = 'Search for ...',
  ...restProps
}) => (
  <Wrapper {...restProps}>
    {!noLabel && <Label>{label}</Label>}
    <InputWrapper>
      <Input
        onChange={event => onFilterChange(event.target.value)}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      <SearchIcon />
    </InputWrapper>
  </Wrapper>
)

export const SearchBarRow = styled(SearchBar)`
  flex: 0 0 auto;
  margin-bottom: 26px;
`

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 16px;
`

const Label = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #666;
  padding: 4px 0;
`

const InputWrapper = styled.div`
  position: relative;
`

const Input = styled.input.attrs({
  type: 'text'
})`
  color: #333;
  width: 100%;
  padding: 16px;
  padding-right: 50px;
  font-size: 14px;
  font-weight: 300;

  border: 1px solid #ddd;
  border-radius: 0px;

  &:focus {
    outline: none;
  }
`

const SearchIcon = styled(StandardSearchIcon).attrs({
  fill: '#666',
  width: 20,
  height: 20
})`
  position: absolute;
  right: 16px;
  top: 16px;
`
