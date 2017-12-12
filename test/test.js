var postcss = require('postcss')
var expect = require('chai').expect

var plugin = require('../')

var test = function (input, output, opts, done) {
  postcss([plugin(opts)]).process(input).then(function (result) {
    expect(result.css).to.eql(output)
    expect(result.warnings()).to.be.empty
    done()
  }).catch(function (error) {
    done(error)
  })
}

describe('wx-px2rpx', function () {
  
  it('replaces pixel values', function (done) {
    test('a{width: 200px;}', 'a{width: 200rpx;}', {}, done)
  })
  
})
