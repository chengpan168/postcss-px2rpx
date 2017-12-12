var postcss = require('postcss')

var DEFAULTS = {
  base: 1
}

function nonForcedNumericRegex (number) {
  return new RegExp(number + 'px(?!\\s*\\/\\*\\s*ignore\\s*\\*\\/)', 'g')
}

module.exports = postcss.plugin('postcss-px2rpx', function (opts) {
  opts = Object.assign({}, DEFAULTS, opts)
  
  var regex = /([\d\.]+)px(\s*\/\*\s*ignore\s*\*\/)?/g
  
  var convert = function (context) {
    var replaceable = context.match(regex)
    
    if (replaceable) {
      replaceable.forEach(function (value) {
        var matches = regex.exec(value)
        regex.lastIndex = 0
        
        if (!matches[2]) {
          context = context.replace(
            nonForcedNumericRegex(matches[1]), matches[1] / opts.base + 'rpx')
        }
      })
    }
    
    return context
  }
  
  return function (css) {
    css.eachInside(function (node) {
      if (node.type === 'decl') {
        node.value = convert(node._value ? node._value.raw : node.value)
      }
    })
  }
})
