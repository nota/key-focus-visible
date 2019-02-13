(function () {
  // is keyboard last used input source?
  let wasKeyboardInput = false

  const modifierKeys = [
    16, // shift
    17, // control
    18, // alt
    27, // esc
    91, // Windows key / left Apple cmd
    93 // Windows menu / right Apple cmd
  ]

  function supportsPassiveEvent () {
    let exist = false
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: function () { exist = true }
      })
      window.addEventListener('test', null, opts)
    } catch (e) {}
    return exist
  }

  function init () {
    // set useCapture to true to capture all events
    // some components like Boostrap Dropdown menu call stopPropagate()
    const useCapture = true
    const options = supportsPassiveEvent()
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
    const body = document.body
    if (wasKeyboardInput) {
      body.dataset.focusVisible = ''
    } else {
      delete body.dataset.focusVisible
    }
    // add class that can not apply css with [data-focus-visible] selector
    // eg: input[type="range"]:focus::-webkit-slider-thumb
    const elements = document.querySelectorAll('[data-require-focus-visible-class]')
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]
      if (wasKeyboardInput) {
        element.classList.add('focus-visible')
      } else {
        element.classList.remove('focus-visible')
      }
    }
  }

  init()
})()
