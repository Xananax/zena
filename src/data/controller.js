import { process as events } from './events'
import { process as press } from './press'
import { process as images } from './galleries'

const collections = {
  events,
  press,
  images
}

export const dispatch = ({ collection, ...command}) => new Promise((ok, no)=>{
  if(!collections[collection]){
    return no(new Error(`can't find ${collection}`))
  }
  collections[collection](command)
    .then( () => ok({collection,...command}))
    .catch(no)
})