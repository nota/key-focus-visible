(function () {
  // is keyboard last used input source?
  var wasKeyboardInput = false

  var modifierKeys = [
    16, // shift
    17, // control
    18, // alt
    27, // esc
    91, // Windows key / left Apple cmd
    93 // Windows menu / right Apple cmd
  ]

  function supportsPassiveEvent () {
    var exist = false
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function () { exist = true }
      })
      window.addEventListener('test', null, opts)
    } catch (e) {}
    return exist
  }

  function init () {
    // set useCapture to true to capture all events
    // some components like Boostrap Dropdown menu call stopPropagate()
    var useCapture = true
    var options = supportsPassiveEvent()
      ? { passive: true, capture: useCapture }
      : useCapture

    window.addEventListener('mousedown', onPointerDown, options)
    if ('ontouchstart' in window) {
      window.addEventListener('touchstart', onPointerDown, options)
    }
    window.addEventListener('keydown', onKeyDown, useCapture)
    window.addEventListener('focusin', updateDoc, useCapture)
  }

  function onPointerDown () {
    wasKeyboardInput = false
  }

  function onKeyDown (event) {
    if (modifierKeys.indexOf(event.which) > -1) return
    wasKeyboardInput = true
  }

  function updateDoc () {
    var body = document.body
    if (wasKeyboardInput) {
      body.dataset.focusVisible = ''
    } else {
      delete body.dataset.focusVisible
    }
    // add class that can not apply css with [data-focus-visible] selector
    // eg: input[type="range"]:focus::-webkit-slider-thumb
    var elements = document.querySelectorAll('[data-require-focus-visible-class]')
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i]
      if (wasKeyboardInput) {
        element.classList.add('focus-visible')
      } else {
        element.classList.remove('focus-visible')
      }
    }
  }
  if (document.readyState === 'interactive') {
    init()
  } else {
    document.addEventListener('DOMContentLoaded', init)
  }
})()
