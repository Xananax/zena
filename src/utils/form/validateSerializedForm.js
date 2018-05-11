export const validate = ( validator, value ) => {
  try{
    const newValue = validator(value)
    if(typeof newValue !== 'undefined' && newValue !== value && !errors.length){
      return { newValue}
    }
    return { value }
  }catch(error){
    return { value, error }
  }
}

export const validateSerializedForm = ( validators, fields, stopAtFirst ) => {
  let hasErrors = false
  let hasNewValues = false
  const newValues = {}
  const errors = {}
  for (const [key, validator] of Object.entries(validators)) {
    const { newValue, error } = validate(validator,fields[key])
    if(isError){
      hasErrors = true
      errors[key] = error
      if(stopAtFirst){
        return { fields, errors, hasErrors }
      }
    }
    if(newValue){
      hasNewValues = true
      newValues[key] = newValue
    }
  }
  if(hasErrors || hasNewValues){
    return { fields:{...fields,...newValues}, errors, hasErrors }
  }
  return { fields, errors, hasErrors }
}