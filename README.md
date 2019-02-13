# Key focus visible

This small library enables you to show `:focus` pseudo-class style when only triggered by the keyboard.

focus-visible wrapper is more famous, but this one is easier to debug on Chrome.
Also this one does not change the each elements's DOM, so it works well with React or Vue.

### Install

`$ install npm key-focus-visible`

### How to use

Just import this library to your project.

```js
import 'key-focus-stylist'
```

It sets `data-key-focus` attribute on `body` element when the focus has been given by the keyboard.

So you can apply the style as follows:


```css
*:focus {
  outline: none;
}

[data-key-focus] *:focus {
  box-shadow: 0 0 0px 4px rgba(64, 167, 255, 0.6);
}

```

### Demo

See the live demo [here](./demo.html)
