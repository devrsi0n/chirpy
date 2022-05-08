const isPlainObject = require('lodash/isPlainobject')

module.exports = {
  isUsableColor(color, values) {
    return isPlainObject(values) && color !== 'gray' && values[1000]
  },
}
