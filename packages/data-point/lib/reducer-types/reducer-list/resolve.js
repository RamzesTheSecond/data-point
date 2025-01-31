const Promise = require('bluebird')

const utils = require('../../utils')

/**
 * @param {Object} manager
 * @param {Function} resolveReducer
 * @param {Accumulator} accumulator
 * @param {ReducerList} reducerList
 * @returns {Promise}
 */
function resolve (manager, resolveReducer, accumulator, reducerList) {
  const reducers = reducerList.reducers
  if (reducers.length === 0) {
    return Promise.resolve(undefined)
  }

  const result = Promise.reduce(
    reducers,
    (value, reducer) => {
      const itemContext = utils.set(accumulator, 'value', value)
      return resolveReducer(manager, itemContext, reducer)
    },
    accumulator.value
  )

  return result
}

module.exports.resolve = resolve
