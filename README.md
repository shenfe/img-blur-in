# img-blur-in

Make images loading lazily with a blur effect.

<p align="center"><img src="https://raw.githubusercontent.com/shenfe/img-blur-in/master/readme_assets/demo.png" alt="demo"></p>

## Usage

### style

```css
.img-blur-in {
    -webkit-filter: blur(15px);
    -moz-filter: blur(15px);
    -ms-filter: blur(15px);
    -o-filter: blur(15px);
    filter: blur(15px);
    -webkit-transition: all ease .2s;
    -moz-transition: all ease .2s;
    -ms-transition: all ease .2s;
    -o-transition: all ease .2s;
    transition: all ease .2s;
}
```

### script

```html
<script src="//path/to/img-blur-in.js"></script>
```

### html

```html
<img class="img-blur-in" src="small.jpg" alt="blur until the image is loaded">
<img class="img-blur-in" src="small.jpg" data-src="large.jpg" alt="blur until the large image is loaded">
<img class="img-blur-in" src="small.jpg" data-src="large.jpg" data-lazy="true" alt="blur until the image is into the viewport and the large image is loaded">
```

### customization

If you have your own CSS class name for images, use it like this:

```js
window.ImgBlurIn.watch('.your-class');
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017-present, [shenfe](https://github.com/shenfe)
