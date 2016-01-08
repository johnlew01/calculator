import R from 'ramda'
import { keyCode } from 'redux/helpers/pureFunctions'
import { actionTypes as eventsActionTypes } from 'redux/modules/events'
import { keysSelector } from 'redux/selectors'

// ------------------------------------
// Pure Functions
// ------------------------------------

// event :: Action -> Event
const event = R.prop('payload')

// isKeyPressEvent :: Action -> Boolean
const isKeyPressEvent = R.converge(R.and, [
  R.compose(R.equals(eventsActionTypes.KEY_PRESSED), R.prop('type')),
  R.compose(R.is(Object), event)
])

// allowedKeys :: Store -> Array
const allowedKeys = R.compose(keysSelector, R.invoker(0, 'getState'))

// keyCodeMatcher :: Event -> AllowedKey -> Boolean
const keyCodeMatcher = R.compose(R.propEq('keyCode'), keyCode)

// findAllowedKey :: AllowedKey[] -> Event -> AllowedKey
const findAllowedKey = R.useWith(R.flip(R.find), [
  R.identity,
  keyCodeMatcher
])

// preventDefault :: Event -> undefined
const preventDefault = R.invoker(0, 'preventDefault')

// isKeyAllowed :: Store -> Action -> Event|undefined
const isKeyAllowed = R.curry((store, action) => {
  return R.unless(
    findAllowedKey(allowedKeys(store)),
    preventDefault
  )(event(action))
})

// handleKeyPressEvent :: Store -> Function -> Action -> Action|undefined
export default R.curry((store, next, action) => {
  if (!isKeyPressEvent(action) || isKeyAllowed(store)(action)) {
    return next(action)
  }
})
