import { serializeForm } from './serializeForm'
export const serializeAndValidate = ( validators, form, stopAtFirst ) => {
  const { fields, ...rest } = serializeForm(form)
  const validatedProps = validate(validators, fields, stopAtFirst)
  const final = { ...rest, ...validatedProps }
  return final;
}