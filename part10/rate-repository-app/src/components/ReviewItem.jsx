import Text from "./Text"
import { View } from "react-native"
import { StyleSheet } from "react-native"
import theme from "./theme"



const styles = StyleSheet.create({
  reviewContainer: {
    flexDirection: "row",
    gap: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.white
  },
  reviewInfo: {
    flex: 1,
    gap: 5
  },
  rating: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 25
  },
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

const ReviewItem = ({ review, ReviewActionBar, refetch }) => {
  const formatDate = (createdAt) => {
    let date = new Date(createdAt)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }

  return (
    <View>
      <View style={styles.reviewContainer}>
        <View style={styles.rating}>
          <Text color="primary" fontWeight="bold">{review.rating}</Text>
        </View>
        <View style={styles.reviewInfo}>
          <Text fontWeight="bold">{review.user.username}</Text>
          <Text>{formatDate(review.createdAt)}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      {ReviewActionBar && <ReviewActionBar id={review.repositoryId} reviewId={review.id} refetch={refetch} />}
    </View>
  )
}

export default ReviewItem