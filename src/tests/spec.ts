import deepEqual from 'fast-deep-equal'

function assert(state: any, assert: (state: any) => void) {
  assert(state)
  console.log("OK")
}

function assertEquals(expected: any, result: any) {
  if (!deepEqual(expected, result)) {
    throw new Error(`Expected ${JSON.stringify(result, null, 4)} to equal ${JSON.stringify(expected, null, 4)}`)
  }
}

function expect(result: any) {
  return {
    toEqual: (expected: any) => assertEquals(expected, result)
  }
}

type getStateFunc = (previousState?: any) => any
type assertFunc = (state: any) => void
type getResultFunc = (state: any) => any

function when(getState: getStateFunc, previousState?: any) {
  const state = getState(previousState)

  return {
    assert: (func: assertFunc) => assert(state, func),
    expect: (getResult: getResultFunc) => expect(getResult(state)),
    when: (getState: getStateFunc) => when(getState, state)
  }
}

export function spec(description: string) {
  console.log(description)
  return {
    when: when
  }
}
