import React from 'react'
import styled from 'styled-components'

import { useHistory } from 'react-router-dom'

import { Table, Icon } from 'tabler-react'

export const Groups = ({ groups }) => {
  const history = useHistory()

  const onClick = (id) => {
    history.push({ pathname: `/groups/${id}` })
  }

  return (
    <Table
      responsive
      highlightRowOnHover
      hasOutline
      verticalAlign='center'
      cards
      className='text-nowrap'
    >
      <Table.Body>
        {groups.map(({ id, name, description }) => (
          <TableRow key={id} onClick={() => onClick(id)}>
            <Table.Col>
              <div>
                <strong>{name}</strong>
              </div>
              <Description>{description}</Description>
            </Table.Col>
            <Table.Col alignContent='center'>
              <Icon link name='chevron-down' />
            </Table.Col>
          </TableRow>
        ))}
      </Table.Body>
    </Table>
  )
}

const Description = styled.div``

const TableRow = styled(Table.Row)`
  cursor: pointer;
`
