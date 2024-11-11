import { useFormik } from "formik"
import { TextInput, Pressable, View, StyleSheet } from "react-native"
import theme from "./theme"
import Text from "./Text"
import * as yup from "yup"

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
    onSubmit: (values, { setSubmitting }) => {
      console.log(values)
      setSubmitting(false)
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