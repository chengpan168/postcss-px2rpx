var postcss = require('postcss')
var css = require('css')

module.exports = postcss.plugin('wx-px2rpx', function (opts) {
  
  var pxRegExp = /\b(\d+(\.\d+)?)px\b/
  var rpxRegExp = /\b(\d+(\.\d+)?)rpx\b/
  
  function processRules (rules) {
    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i]
      if (rule.type === 'media') {
        processRules(rule.rules) // recursive invocation while dealing with media queries
        continue
      } else if (rule.type === 'keyframes') {
        processRules(rule.keyframes) // recursive invocation while dealing with keyframes
        continue
      } else if (rule.type !== 'rule' && rule.type !== 'keyframe') {
        continue
      }
      
      var declarations = rule.declarations
      for (var j = 0; j < declarations.length; j++) {
        var declaration = declarations[j]
        if (declaration.type !== 'declaration') {
          continue
        }
        // rpx, 不需要处理
        if (rpxRegExp.test(declaration.value)) {
          continue
        }
        // px 2 rpx
        if (pxRegExp.test(declaration.value)) {
          declaration.value = declaration.value.replace('px', 'rpx') // common transform
        }
      }
      
      // if the origin rule has no declarations, delete it
      if (!rules[i].declarations.length) {
        rules.splice(i, 1)
        i--
      }
    }
    
  }
  
  return function (cssText, result) {
    var oldCssText = cssText.toString()
    
    var astObj = css.parse(oldCssText)
    processRules(astObj.stylesheet.rules)
    
    newCssText = css.stringify(astObj)
    var newCssObj = postcss.parse(newCssText)
    result.root = newCssObj
  }
  
})
