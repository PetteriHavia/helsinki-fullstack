import { useFormik } from "formik"
import { TextInput, Pressable, View, StyleSheet } from "react-native"
import theme from "./theme"
import Text from "./Text"
import * as yup from "yup"
import useSignIn from "./hooks/useSignIn"
import { useNavigate } from "react-router-native"
import { useState } from "react"

const SignIn = () => {
  const styles = StyleSheet.create({
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

  const [signIn] = useSignIn()
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required!'),
    password: yup
      .string()
      .required('Password is required!')
  })

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      const { username, password } = values
      try {
        const response = await signIn({ username, password })
        if (response?.authenticate.accessToken) {
          setError(null)
          navigate("/")
        } else {
          setError("The sign-in details are incorrect.")
        }
      } catch (error) {
        console.log(error)
        setError("An unexpected error occurred. Please try again.")
      }
    }
  })

  return (
    <View style={styles.form}>
      <TextInput
        style={[styles.input, formik.errors.username && styles.inputError]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text color="error">{formik.errors.username}</Text>
      )}
      <TextInput
        style={[styles.input, formik.errors.password && styles.inputError]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text color="error">{formik.errors.password}</Text>
      )}
      {error && <Text color="error">{error}</Text>}
      <Pressable onPress={formik.handleSubmit}>
        <Text
          style={styles.formSubmit}
          textBackground="blue"
        >Sign in
        </Text>
      </Pressable>
    </View>
  )
}

export default SignIn