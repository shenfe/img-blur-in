# img-blur-in

![gzip size](http://img.badgesize.io/https://raw.githubusercontent.com/shenfe/img-blur-in/master/dist/img-blur-in.min.js?compression=gzip)
<a href="https://www.npmjs.com/package/img-blur-in"><img src="https://img.shields.io/npm/v/img-blur-in.svg"></a>
![downloads](https://img.shields.io/npm/dm/img-blur-in.svg)
![license](https://img.shields.io/npm/l/img-blur-in.svg)

Make images load lazily, with a blur-in effect.

<p align="center"><img src="https://raw.githubusercontent.com/shenfe/img-blur-in/master/readme_assets/demo.png" alt="demo"></p>

## Usage

### Style

Add the default style below to your CSS.

```css
.img-blur-in {
    -webkit-filter: blur(32px);
    -moz-filter: blur(32px);
    -ms-filter: blur(32px);
    -o-filter: blur(32px);
    filter: blur(32px);
    -webkit-transition: all ease .2s;
    -moz-transition: all ease .2s;
    -ms-transition: all ease .2s;
    -o-transition: all ease .2s;
    transition: all ease .2s;
}
```

**Notice** If you need no CSS effects, just remove the properties. Lazy loading of images can be accomplished as well via this library.

### HTML

Give image tags the CSS class name. Here are three different choices:

```html
<img class="img-blur-in" src="large.jpg" alt="blur until the image is loaded">
<img class="img-blur-in" src="small.jpg" data-src="large.jpg" alt="blur until the large image is loaded">
<img class="img-blur-in" src="small.jpg" data-src="large.jpg" data-lazy="true" alt="blur until the image is into the viewport and the large image is loaded">
```

### JavaScript

Inject or import `img-blur-in`.

#### inject

```html
<script src="//path/to/img-blur-in.js"></script>
```

#### import

```bash
npm install --save img-blur-in
```

```js
/* index.js */
require('img-blur-in')
```

### Customization

If you have your own CSS class name for images, use it like this:

```js
window.ImgBlurIn.watch('your-class');
```

## Browser Compatibility

* IE10+
* Opera 12+
* Safari 5+
* Chrome
* Firefox
* iOS 6+
* Android 4.4+

## Thanks

* [sentineljs](https://github.com/muicss/sentineljs) -- Detect new DOM nodes using CSS selectors.

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright © 2017-present, [shenfe](https://github.com/shenfe)
