import { FlatList, Pressable, View } from "react-native"
import Text from "./Text"
import { GET_SINGLE_REPOSITORY } from "../../graphql/queries"
import { useParams } from "react-router-native"
import RepositoryItem from "./RepositoryItem"
import { useQuery } from "@apollo/client"
import * as Linking from 'expo-linking';
import { StyleSheet } from "react-native"
import theme from "./theme"
import ReviewItem from "./ReviewItem"
import { onEndReach } from "./utils/onEndReach"

const styles = StyleSheet.create({
  box: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  link: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 2
  },
  linkText: {
    textAlign: "center"
  },
  separator: {
    height: 10
  }
})

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <RepositoryItem item={repository} />
      <View style={styles.box}>
        <Pressable style={styles.link} onPress={() => Linking.openURL(repository.url)}>
          <Text style={styles.linkText} color="white" fontSize="heading" fontWeight="bold">
            Open in Github
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams()
  const { data, error, loading, fetchMore } = useQuery(GET_SINGLE_REPOSITORY,
    { variables: { id: id, first: 3 }, fetchPolicy: 'cache-and-network' })

  if (loading) {
    return <Text>Loading...</Text>
  }
  if (error) {
    console.log(error)
    return <Text>An Error has occured</Text>
  }

  const repositoryData = data?.repository ? data.repository : null
  const reviews = repositoryData ? repositoryData.reviews.edges.map(edge => edge.node) : []

  return (
    <FlatList
      ItemSeparatorComponent={ItemSeparator}
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repositoryData} />}
      onEndReached={() => onEndReach(data?.repository?.reviews, loading, fetchMore)}
    />
  )
}

export default SingleRepository