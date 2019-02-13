(function () {
  // is keyboard last used input source?
  let wasKeyboardInput = false

  // list of modifier keys commonly used with the mouse and
  // can be safely ignored to prevent false keyboard detection
  const ignoreMap = [
    16, // shift
    17, // control
    18, // alt
    27, // esc
    91, // Windows key / left Apple cmd
    93 // Windows menu / right Apple cmd
  ]

  // check support for passive event listeners
  const supportsPassive = () => {
    let exist = false
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: () => {
          exist = true
        }
      })
      window.addEventListener('test', null, opts)
    } catch (e) {}
    return exist
  }

  const init = () => {
    // set useCapture to true to capture all events
    // some components like Boostrap Dropdown menu call stopPropagate()
    const useCapture = true
    const options = supportsPassive()
      ? { passive: true, capture: useCapture }
      : useCapture

    window.addEventListener('mousedown', onPointerDown, options)
    if ('ontouchstart' in window) {
      window.addEventListener('touchstart', onPointerDown, options)
    }
    window.addEventListener('keydown', onKeyDown, useCapture)
    window.addEventListener('focusin', updateDoc, useCapture)
  }

  const onPointerDown = () => {
    wasKeyboardInput = false
  }

  const onKeyDown = (event) => {
    if (ignoreMap.indexOf(event.which) > -1) return
    wasKeyboardInput = true
  }

  const updateDoc = () => {
    const { body } = document
    if (wasKeyboardInput) {
      body.dataset.keyFocus = ''
    } else {
      delete body.dataset.keyFocus
    }
    // add class that can not apply css with [data-key-focus] syntax
    // eg: input[type="range"]:focus::-webkit-slider-thumb
    const elements = document.querySelectorAll('[data-require-key-focus-class]')
    for (const element of elements) {
      if (wasKeyboardInput) {
        element.classList.add('key-focus')
      } else {
        element.classList.remove('key-focus')
      }
    }
  }

  init()
})()
