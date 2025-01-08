import formStyles from "../formStyles"

export const inputStyle = (formik, field) => {
  const isError = formik.touched[field] && formik.errors[field]
  return [formStyles.input, isError && formStyles.inputError]
}