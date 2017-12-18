const postcss = require('postcss')
const { expect } = require('chai')

const plugin = require('../')

const test = (input, output, opts, done) => {
  postcss([plugin(opts)])
    .process(input)
    .then((result) => {
      expect(result.css).to.eql(output);
      // eslint-disable-next-line no-unused-expressions
      expect(result.warnings()).to.be.empty;
      done();
    })
    .catch((error) => {
      done(error);
    })
}

describe('wx-px2rpx', () => {
  it('replaces pixel values', (done) => {
    test('a{padding: 200px 10px;}', 'a{padding: 200rpx 10rpx;}', {}, done)
  })
  it('replaces pixel values', (done) => {
    test('a{padding: 200px 10px 10px 10px;}', 'a{padding: 200rpx 10rpx 10rpx 10rpx;}', {}, done)
  })
  
  it('replaces pixel values', (done) => {
    test('a{width: 200px;}', 'a{width: 200rpx;}', {}, done)
  })

  it('rpx not be replaced', (done) => {
    test('a{width: 200rpx;}', 'a{width: 200rpx;}', {}, done)
  })

  it('set proportion: 2', (done) => {
    test('a{width: 200px;}', 'a{width: 400rpx;}', { proportion: 2 }, done)
  })

  it('work in media', (done) => {
    test(`@media screen and (max-width: 300px) {
    page{with:100px}
    body {
        width: 200px;
    }
}`, `@media screen and (max-width: 300px) {
    page{with:100rpx}
    body {
        width: 200rpx;
    }
}`, {}, done)
  })
})
