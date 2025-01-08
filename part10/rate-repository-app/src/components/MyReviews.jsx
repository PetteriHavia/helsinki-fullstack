import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { ME } from '../../graphql/queries'
import { useQuery } from '@apollo/client'
import ReviewItem from './ReviewItem'
import { ItemSeparator } from './SingleRepository'
import ReviewActionBar from './ReviewActionBar'

const MyReviews = () => {
  const { data, error, loading } = useQuery(ME, { variables: { includeReviews: true }, fetchPolicy: "cache-and-network" })

  if (loading) {
    return <Text>Loading...</Text>
  }
  if (error) {
    return <Text>An error has occured while loading reviews</Text>
  }

  const repositoryNodes = data ? data.me.reviews.edges.map(edge => edge.node) : []

  return (
    <View>
      <FlatList
        data={repositoryNodes}
        renderItem={({ item }) => <ReviewItem review={item} ReviewActionBar={ReviewActionBar} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={<ItemSeparator />}
      />
    </View>
  )
}

export default MyReviews