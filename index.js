const postcss = require('postcss')

module.exports = postcss.plugin('wx-px2rpx', (opts = {}) => {
  const {proportion = 1} = opts
  
  const pxRegExp = /\b(\d+(\.\d+)?)px\b/g
  
  return (root) => {
    root.replaceValues(pxRegExp, {fast: 'px'}, string => {
      return `${proportion * parseInt(string)}rpx`
    })
  }
})
