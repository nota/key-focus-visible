# Key focus visible

This library allows you to show CSS `:focus` pseudo-class only when triggered by the keyboard.

Alternatively, `:focus-visible` [polyfill](https://www.npmjs.com/package/focus-visible) is available.
Here are advantages compared to the polifill:

- Easy to debug the stylesheets on Chrome.
- Works well with React or Vue since it doesn't change the DOM of each element.
- Code is simpler.

Detailed behavior:

- Works well when the focus is returned after you close the modal/dropdown by the mouse or keyboard.
- Works well when the focus is given programmatically.

In both cases, we remember the last used input device to focus, and if it was a keyboard, focus is shown, if it was a pointing device, focus is not shown.

### Install

`$ npm install key-focus-visible`

### How to use

Just import/require this library to your project.

```js
import 'key-focus-visible'
```

It sets `data-focus-visible` attribute on `body` element when the focus is given by the keyboard.
So you can apply the style as follows:

```css
*:focus {
  outline: none;
}

[data-focus-visible] *:focus {
  box-shadow: 0 0 0px 4px rgba(64, 167, 255, 0.6);
}
```

You can also use it in Sass:

```scss
.foo-component {
  background-color: #fff;

  &:active,
  &:hover,
  [data-focus-visible] &:focus {
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
