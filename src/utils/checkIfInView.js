const buffer = 3000 // consider images in viewport before they actually scroll in

export const elementInViewport = (el) => {
  if(!el){ return false }
  const rect = el.getBoundingClientRect()
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight
  const top = (rect.top + buffer)
  const bottom = (rect.top - viewportHeight - buffer)
  const topPartAboveFold = - bottom >= 0
  const topPartScrolledInView =  top >= 0
  //const leftPartScrolledIntoView = ( rect.left + buffer ) >=0
  const isInView = (topPartAboveFold && topPartScrolledInView)
  return isInView
}

const listeners = []

export const listenToScroll = (listener) => {
  listeners.push(listener)
  startDocListening();

  const remove = () => {
    const index = listeners.indexOf(listener)
    if(index>=0){
      listeners.splice(index,1)
      if(!listeners.length){
        stopDocListening()
      }
    }
  }
  return remove
}

let scrollTimeout

let started = false

const whenDocScrolls = () => {
  clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(()=>{
    listeners.forEach(l=>l())
  },30)
}

export const startDocListening = () => {
  if(started){ return }
  started = 
  document.addEventListener('scroll',whenDocScrolls)
}

export const stopDocListening = () => {
  if(!started){ return }
  started = false
  document.removeEventListener('scroll',whenDocScrolls)
}

export const checkIfInView = ( getEl, whenViewChange, once=true ) => {
  let inView = false
  const onScroll = () => {
    const newInView = elementInViewport(getEl())

    if(inView !== newInView){
      inView = newInView
      whenViewChange(inView)
      if(once){
        stopListening()
      }
    }
  }
  const stopListening = listenToScroll(onScroll)
  onScroll()
  return stopListening
}

export default checkIfInView