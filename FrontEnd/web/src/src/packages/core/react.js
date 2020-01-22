import { useState as defaultUseState } from 'react'
import update from 'immutability-helper'

export const useState = (initialValue = {}) => {
  const [state, monkeyPatchSetState] = defaultUseState(initialValue)

  const setState = data => {
    let newState = null
    if (typeof data === 'object') {
      newState = update(state, {
        $merge: data
      })
    } else {
      newState = data
    }

    monkeyPatchSetState(newState)
  }

  return [state, setState]
}
