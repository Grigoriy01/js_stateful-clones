'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const history = [];
  let lastState = state;

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;
    let nextState = {};

    if (type === 'addProperties') {
      nextState = {
        ...lastState,
        ...extraData,
      };
      history.push(nextState);
      lastState = nextState;
    }

    if (type === 'removeProperties') {
      for (const key in lastState) {
        if (!keysToRemove.includes(key)) {
          nextState[key] = lastState[key];
        }
      }
      history.push(nextState);
      lastState = nextState;
    }

    if (type === 'clear') {
      nextState = {};
      history.push(nextState);
      lastState = nextState;
    }
  }

  return history;
}

module.exports = transformStateWithClones;
