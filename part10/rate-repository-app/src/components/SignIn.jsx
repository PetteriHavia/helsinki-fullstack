import { useFormik } from "formik"
import { TextInput, Pressable, View } from "react-native"
import Text from "./Text"
import * as yup from "yup"
import useSignIn from "./hooks/useSignIn"
import { useNavigate } from "react-router-native"
import { useState } from "react"
import formStyles from "./formStyles"
import { inputStyle } from "./utils/inputStyle"

const SignIn = () => {
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
    <View style={formStyles.form}>
      <TextInput
        style={inputStyle(formik, "username")}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text color="error">{formik.errors.username}</Text>
      )}
      <TextInput
        style={inputStyle(formik, "password")}
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
          style={formStyles.formSubmit}
          textBackground="blue"
        >Sign in
        </Text>
      </Pressable>
    </View>
  )
}

export default SignIn