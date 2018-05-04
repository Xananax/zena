const toArray = (thing) =>Array.prototype.slice.call(thing)

export const serializeForm = (form) => {
  const { elements, name, action:_action, method } = form;
  const action = _action.replace(window.location,'')
  const inputs = toArray(elements)
  const serialized = {}
  inputs.forEach( input =>{
    const { nodeName, name, type, value, checked } = input
    if(!name || nodeName === 'BUTTON'){ return; }
    if(type === 'checkbox'){
      serialized[name] = checked; return;
    }
    if(type === 'radio' && checked){
      serialized[name] = value; return;
    }
    if(type === 'number'){
      if(!value){
        serialized[name] = 0; return;  
      }
      serialized[name] = parseFloat(value); return;
    }
    if(type === 'date'){
      serialized[name] = new Date(value); return;
    }
    if( type === 'file' ){
      const files = toArray(input.files)
      if(input.multiple){
        serialized[name] = files; return
      }
      serialized[name] = files[0]; return
    }
    serialized[name] = value
  })
  return { name, action, method, fields:serialized }
}

export const processSubmit = (cb) => (evt) => {
  evt.preventDefault();
  const form = evt.target;
  const serialized = serializeForm(form)
  cb(serialized)
}