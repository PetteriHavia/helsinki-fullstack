import React from 'react'
import { View, TextInput, Pressable } from 'react-native'
import Text from './Text'
import { useFormik } from "formik"
import * as yup from "yup"
import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../../graphql/mutations'
import { useNavigate } from 'react-router-native'
import formStyles from "./formStyles"
import { inputStyle } from './utils/inputStyle'

const ReviewForm = () => {

  const [createReview] = useMutation(CREATE_REVIEW)
  const navigate = useNavigate()

  const validationSchema = yup.object().shape({
    ownerName: yup
      .string()
      .required("Repository owner is required!"),
    repositoryName: yup
      .string()
      .required("Repository name is required!"),
    rating: yup
      .number()
      .min(1, "Rating can only be between 1 - 100")
      .max(100, "Rating can only be between 1 - 100")
      .required("Rating is required"),
    text: yup
      .string()
      .max(500, 'Review cannot be longer than 500 characters')
      .notRequired(),
  })

  const formik = useFormik({
    initialValues: { repositoryName: "", ownerName: "", rating: 0, text: "" },
    validationSchema,
    onSubmit: async (values) => {
      const { repositoryName, ownerName, rating, text } = values
      try {
        const { data } = await createReview({
          variables: { review: { ownerName, repositoryName, rating: Number(rating), text } }
        })
        navigate(`/${data.createReview.repositoryId}`)
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
        style={inputStyle(formik, "ownerName")}
        placeholder='Repository owner name'
        onChangeText={formik.handleChange("ownerName")}
        value={formik.values.ownerName}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text color="error">{formik.errors.ownerName}</Text>
      )}
      <TextInput
        style={inputStyle(formik, "repositoryName")}
        placeholder='Repository name'
        onChangeText={formik.handleChange("repositoryName")}
        value={formik.values.repositoryName}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text color="error">{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        style={inputStyle(formik, "rating")}
        placeholder='Rating between 1 and 100'
        onChangeText={formik.handleChange("rating")}
        value={formik.values.rating}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text color="error">{formik.errors.rating}</Text>
      )}
      <TextInput
        style={inputStyle(formik, "text")}
        placeholder='Review'
        onChangeText={formik.handleChange("text")}
        value={formik.values.text}
      />
      {formik.touched.text && formik.errors.text && (
        <Text color="error">{formik.errors.text}</Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text
          style={formStyles.formSubmit}
          fontWeight="bold"
          textBackground="blue"
        >Create a text</Text>
      </Pressable>
    </View>
  )
}

export default ReviewForm