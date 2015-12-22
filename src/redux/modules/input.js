import { handleActions } from 'redux-actions'
import R from 'ramda'
import { actionType, isNonPrintable, character } from '../helpers/key'

// ------------------------------------
// Constants
// ------------------------------------
export const actionTypes = {
  DIGITS: '0,1,2,3,4,5,6,7,8,9',
  OPERATIONS: '+,-,*,/',
  SPACE: '#32',
  BACKSPACE: '#8',
  ENTER: '#13'
}

// ------------------------------------
// Actions
// ------------------------------------

const _actionType = actionType(actionTypes)

const doHandleEvent = R.curry((dispatch, event) => {
  event.preventDefault()
  dispatch({
    type: _actionType(event),
    payload: character(event)
  })
})

const keyEventHandlers = (dispatch) => {
  const _doHandleEvent = doHandleEvent(dispatch)
  return {
    onKeyDown: R.when(isNonPrintable, _doHandleEvent),
    onKeyPress: _doHandleEvent
  }
}

export {
  keyEventHandlers
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [actionTypes.DIGITS]: (state, { payload }) => {
    return state + payload
  },

  [actionTypes.OPERATIONS]: (state, { payload }) => {
    return state + payload
  },

  [actionTypes.SPACE]: (state, { payload }) => {
    return state + payload
  },

  [actionTypes.BACKSPACE]: (state) => {
    return R.compose(R.join(''), R.dropLast(1), R.split(''))(state)
  },

  [actionTypes.ENTER]: (state) => {
    // remove all spaces
    return R.compose(R.join(''), R.split(' '))(state)
  }
}, '')
