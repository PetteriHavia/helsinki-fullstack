import { View, TextInput, Pressable } from 'react-native'
import Text from './Text'
import { useFormik } from "formik"
import * as yup from "yup"
import { useMutation } from '@apollo/client'
import useSignIn from './hooks/useSignIn'
import { useNavigate } from 'react-router-native'
import { CREATE_USER } from '../../graphql/mutations'
import formStyles from './formStyles'
import { inputStyle } from './utils/inputStyle'

const SignUp = () => {

  const [createUser] = useMutation(CREATE_USER)
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  validationSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(5, "Username can only be between 5 - 30 characters")
      .max(30, "Username can only be between 5 - 30 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(5, "Password needs to be between 5 - 50 characters")
      .max(50, "Password needs to be between 5 - 50 characters"),
    repassword: yup
      .string()
      .required("Please retype your password")
      .oneOf([yup.ref('password')], "Your password does not match")

  })


  const formik = useFormik({
    initialValues: { username: "", password: "", repassword: "" },
    validationSchema,
    onSubmit: async (values) => {
      const { password, username } = values
      try {
        const { data } = await createUser({ variables: { user: { username, password } } })
        if (data) {
          await signIn({ username, password })
          navigate("/")
        }
      } catch (error) {
        console.log(error)
        formik.setFieldError("general", error.message)
      }
    }
  })

  return (
    <View style={formStyles.form}>
      {formik.errors.general && <Text color="error">{formik.errors.general}</Text>}
      <TextInput
        style={inputStyle(formik, "username")}
        placeholder='Username'
        onChangeText={formik.handleChange("username")}
        value={formik.values.username}
      />
      {formik.touched.username && formik.errors.username && (
        <Text color="error">{formik.errors.username}</Text>
      )}
      <TextInput
        style={inputStyle(formik, "password")}
        placeholder='Password'
        onChangeText={formik.handleChange("password")}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password && (
        <Text color="error">{formik.errors.password}</Text>
      )}
      <TextInput
        style={inputStyle(formik, "repassword")}
        placeholder='Confirm password'
        onChangeText={formik.handleChange("repassword")}
        value={formik.values.repassword}
      />
      {formik.touched.repassword && formik.errors.repassword && (
        <Text color="error">{formik.errors.repassword}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text
          style={formStyles.formSubmit}
          fontWeight="bold"
          textBackground="blue"
        >Sign up
        </Text>
      </Pressable>
    </View>
  )
}

export default SignUp