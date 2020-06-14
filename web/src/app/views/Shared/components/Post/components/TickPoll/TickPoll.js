import React, { useState } from 'react'

import { Icon } from 'ui'
import { Checkbox } from '../../../Checkbox/Checkbox'

import './TickPoll.css'

export const TickPoll = ({ listPoll, postId, check = '', onCreatePoll }) => {
  const [state, setState] = useState({ value: '' })

  const onChangeValue = event => {
    setState({ value: event.target.value })
  }

  if (!listPoll) return null

  return (
    <div className='d-flex pt-5 mt-auto pl-5'>
      <div>
        {listPoll.map(({ id, text }) => (
          <Checkbox key={id} text={text} />
        ))}
        <div className='add'>
          <div
            className='add-icon'
            onClick={() => {
              if (state.value !== '') {
                onCreatePoll(
                  {
                    id: 5,
                    text: state.value
                  },
                  postId
                )
                setState({ value: '' })
              }
            }}
          >
            <Icon prefix='fa' name={'plus'} />
          </div>
          <textarea
            className='add-text'
            type='text'
            placeholder='Them lua chon'
            value={state.value}
            onChange={onChangeValue}
          />
        </div>
      </div>
    </div>
  )
}
