export const cleanObject = (obj) => {
  const ret = {}
  Object.keys(obj).forEach(k=>{
    if(typeof obj[k] !== 'undefined'){
      ret[k] = obj[k]
    }
  })
  return ret;
}