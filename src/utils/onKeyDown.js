
let hasBeenSetup = false;
const listeners = {}

const onDocKeyDown = ({keyCode}) => {
  listeners[keyCode] && listeners[keyCode].forEach(listener=>listener(keyCode));
}

const countListeners = () =>
Object.keys(listeners).reduce((n,_listeners)=>_listeners.length+n,0)

const cleanUpIfNoListeners = () => 
{ const count = countListeners()
; if(!count)
  { document.removeEventListener('keydown',onDocKeyDown)
  ; hasBeenSetup = false
  }
}

const removeListener = (key, listener) => {
  if(!listeners[key]){ return; }
  const index = listeners[key].indexOf(listener)
  if(index>=0){ listeners[key].splice( index,1 )}
  if(!listeners[key].length)
  { cleanUpIfNoListeners()
  }
}

const startIfNotStarted = () => 
{ if(!hasBeenSetup)
  { hasBeenSetup = true
  ; document.addEventListener('keydown',onDocKeyDown)
  }
}

const onKeyDown = (key) => (listener) => {
  startIfNotStarted()
  listeners[key] = listeners[key] || []
  listeners[key].push(listener)
  return removeListener.bind(null,key,listener)
}


export const onEscape = onKeyDown(27)
export const onEnter = onKeyDown(13)