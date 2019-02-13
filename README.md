# Key focus visible

This small library enables you to show CSS `:focus` pseudo-class only when triggered by the keyboard.

Alternatively, `:focus-visible` [polyfill](https://www.npmjs.com/package/focus-visible) is available, but ours is easier to debug on Chrome.
Since it doesn't change the DOM of each element, it works well with React or Vue.

### Install

`$ npm install key-focus-visible`

### How to use

Just import/require this library to your project.

```js
import 'key-focus-visible'
```

It sets `data-key-focus` attribute on `body` element when the focus is given by the keyboard.
So you can apply the style as follows:

```css
*:focus {
  outline: none;
}

[data-key-focus] *:focus {
  box-shadow: 0 0 0px 4px rgba(64, 167, 255, 0.6);
}
```

You can also use it in Sass:

```scss
.foo-component {
  background-color: #fff;

  &:active,
  &:hover,
  [data-key-focus] &:focus {
    background-color: #ccc;
  }
}
```

### Demo

See the live demo [here](https://nota.github.io/key-focus-visible/demo.html)

### Compatibility

Suports ordinary modern dekstop browsers (Chrome, Firefox, Safari, Opera, Edge) and mobile browsers (Chrome for Android, iOS Safari)

Does not throw error on IE.

### License

This software is released under the MIT License, see LICENSE.
