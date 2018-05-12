import { serializeForm } from './serializeForm'
import { validateSerializedForm } from './validateSerializedForm'

export const serializeAndValidate = ( validators, form, stopAtFirst ) => {
  const { values, ...rest } = serializeForm(form)
  const validatedProps = validateSerializedForm(validators, values, stopAtFirst)
  const final = { ...rest, ...validatedProps }
  return final;
}