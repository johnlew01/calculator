import { handleActions, createAction } from 'redux-actions'
import R from 'ramda'

// ------------------------------------
// Constants
// ------------------------------------
export const actionTypes = {
  SET_SETTING: 'SET_SETTING'
}

// ------------------------------------
// Actions
// ------------------------------------
export const setSetting = createAction(actionTypes.SET_SETTING)

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [actionTypes.SET_SETTING]: (state, { payload }) => {
    return R.merge(state, payload)
  }
}, {})
