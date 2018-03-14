# babel-plugin-ng-template-url-absolutify

Transform AngularJS templateUrl relative paths to absolute URLs.

```
$ npm install babel-plugin-ng-template-url-absolutify --save-dev
```

## Usage

Use in either package.json or with gulp:

### a) Package.json

Add the transform in package.json:

#### Babel
```json
{
  "babel": {
      "presets": ["env"],
      "extensions": [".es6"],
      "plugins": [
        ["babel-plugin-ng-template-url-absolutify", {"baseDir": "./app", "baseUrl": "http://mysite.com/"}]
      ]
  }
  
}
```

#### Browserify with Babelify
```json
{
  "browserify": {
    "transform": [
      ["babelify", {
          "presets": ["env"],
          "extensions": [".es6"],
          "plugins": [
            ["babel-plugin-ng-template-url-absolutify", {"baseDir": "./app", "baseUrl": "http://mysite.com/"}]
          ]
        }
      ]
    ]
  }
}
```

### b) With Gulp + Browserify with Babelify

Add it to the babelify object and specify a `baseDir` and `baseUrl`.

```js
var gulp  = require('gulp'),
    browserify = require('browserify');

gulp.task('scripts', function() {
  return browserify('./src/app.js')
    .transform("babelify", {
                presets: ["env"],
                extensions: [".es6"],
                plugins: [[
                  "babel-plugin-ng-template-url-absolutify",
                  {baseDir: "./app", baseUrl: "http://mysite.com/"}
                ]]
            })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist'));
});
```

## Example

#### Before:
```js
'use strict';

angular.module('app').component('cmp', {
    controller: function () {/* ... */},
    templateUrl: './template.html'
});
```

#### After:
```js
'use strict';

angular.module('app').component('cmp', {
    controller: function () {/* ... */},
    templateUrl: 'http://mysite.com/app/template.html'
});
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
