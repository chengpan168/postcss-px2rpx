# 小程序 px 2 rpx


## 使用方法

1. `npm install wx-px2rpx`  或者  `yarn install wx-px2rpx`
2. gulp 配置
3. 更多功能后续开发。。。 
  ```
let gulp = require('gulp')
let less = require('gulp-less')
let rename = require('gulp-rename')
let postcss = require('gulp-postcss')
let px2rpx = require('wx-px2rpx')

gulp.task('less', function () {
  var processors = [px2rpx()];
  //编译src目录下的所有less文件
  gulp.src(['pages/**/*.less']).pipe(less())
  .pipe(postcss(processors))
  .pipe(rename({
    extname: '.wxss'
  })).pipe(gulp.dest('pages/'))
})
```

css 源码
```
.page {
  padding: 0 30px;
  font-size: 0;
  color: #000;
}

.logo {
  display: block;
  margin: 0 auto 30px auto;
  width: 150px;
  height: 150px;
  border-radius: 75px;
}
```

编译结果
```

.page {
  padding: 0 30rpx;
  font-size: 0;
  color: #000;
}

.logo {
  display: block;
  margin: 0 auto 30rpx auto;
  width: 150rpx;
  height: 150rpx;
  border-radius: 75rpx;
}
```

## 配置参数
- proportion: 转换比例

## Created By

- [wangwang](https://github.com/chengpan168)
- [jinker](https://github.com/jinker)