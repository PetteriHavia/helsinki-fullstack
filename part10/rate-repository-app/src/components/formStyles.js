import { StyleSheet } from "react-native"
import theme from "./theme"

const formStyles = StyleSheet.create({
  form: {
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  input: {
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    color: theme.colors.textSecondary
  },
  formSubmit: {
    color: "#fff",
    paddingVertical: 10,
    textAlign: "center"
  },
  inputError: {
    borderColor: theme.colors.error
  }
})

export default formStyles