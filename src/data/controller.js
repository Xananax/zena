import { process as events } from './events'

const collections = {
  events
}

export const dispatch = ({ collection, ...command}) => new Promise((ok, no)=>{
  if(!collections[collection]){
    return no(new Error(`can't find ${collection}`))
  }
  collections[collection](command)
    .then( () => ok({collection,...command}))
    .catch(no)
})