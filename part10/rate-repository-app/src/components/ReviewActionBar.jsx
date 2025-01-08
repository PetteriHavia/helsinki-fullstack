import React from 'react'
import Text from "./Text"
import { View, Alert, Pressable } from "react-native"
import { StyleSheet } from "react-native"
import theme from "./theme"
import { Link } from 'react-router-native'
import { useMutation } from '@apollo/client'
import { DELETE_REVIEW } from '../../graphql/mutations'
import { ME } from '../../graphql/queries'

const styles = StyleSheet.create({
  reviewActionbar: {
    backgroundColor: theme.colors.white,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 10
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",

  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
  },
})

const ReviewActionBar = ({ id, reviewId }) => {
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    update: (cache) => {
      //Read ME cache data
      const existingReviews = cache.readQuery({
        query: ME,
        variables: { includeReviews: true }
      })
      //Filter deleted id
      const newReviews = existingReviews.me.reviews.edges.filter(
        edge => edge.node.id !== reviewId
      )

      //Write updated data manually to cache
      cache.writeQuery({
        query: ME,
        variables: { includeReviews: true },
        data: {
          me: {
            ...existingReviews.me,
            reviews: {
              ...existingReviews.me.reviews,
              edges: newReviews
            }
          }
        }
      })
    }
  })

  const handleDeleteReview = () =>
    Alert.alert("Delete Review", "Do you want to delete this review?", [
      {
        text: "Cancel",
        onPress: () => { },
        style: "cancel"
      },
      {
        text: "Ok",
        onPress: async () => {
          try {
            await deleteReview({ variables: { deleteReviewId: reviewId } })
          } catch (error) {
            console.log(error)
          }
        },
      }
    ])

  return (
    <View style={styles.reviewActionbar}>
      <Link to={`/${id}`} style={[styles.viewButton, styles.button]}>
        <Text color="white" fontWeight="bold">View Repository</Text>
      </Link>
      <Pressable onPress={handleDeleteReview} style={[styles.deleteButton, styles.button]}>
        <Text color="white" fontWeight="bold">Delete Review</Text>
      </Pressable>
    </View>
  )
}

export default ReviewActionBar