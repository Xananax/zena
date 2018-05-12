export const validate = ( validator, value ) => {
  try{
    const newValue = validator(value)
    if(typeof newValue !== 'undefined' && newValue !== value){
      return { newValue}
    }
    return { value }
  }catch(error){
    return { value, error }
  }
}

export const validateSerializedForm = ( validators, values, stopAtFirst ) => {
  let hasErrors = false
  let hasNewValues = false
  const newValues = {}
  const errors = {}
  for (const [key, validator] of Object.entries(validators)) {
    const { newValue, error } = validate(validator,values[key])
    if(error){
      hasErrors = true
      errors[key] = error
      if(stopAtFirst){
        return { values, errors, hasErrors }
      }
    }
    if(typeof newValue !== 'undefined'){
      hasNewValues = true
      newValues[key] = newValue
    }
  }
  if(hasErrors || hasNewValues){
    return { values:{...values,...newValues}, errors, hasErrors, hasNewValues }
  }
  return { values, errors, hasErrors, hasNewValues }
}