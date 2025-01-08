import { View, StyleSheet, FlatList } from "react-native"
import Constants from 'expo-constants'
import AppBarTab from "./AppBarTab"
import { useQuery, useApolloClient } from "@apollo/client"
import { ME } from "../../../graphql/queries"
import useAuthStorage from "../hooks/useAuthStorage"

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    padding: 10,
    flexDirection: "row"
  },
  flatlistContainer: {
    gap: 10
  }
})


const AppBar = () => {
  const { data } = useQuery(ME)
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage();

  const handleLogout = async () => {
    try {
      await authStorage.removeAccessToken()
      apolloClient.resetStore()
    } catch (error) {
      console.log(error)
    }
  }

  const tabs = [
    { id: 1, label: "Repositories", link: "/" },
    ...(data?.me
      ? [
        { id: 2, label: "Create a review", link: "/create-review" },
        { id: 4, label: "My Reviews", link: "/my-reviews" },
        { id: 3, label: "Sign Out", link: "/signin", action: handleLogout },
      ]
      : [
        { id: 5, label: "Sign In", link: "/signin" },
        { id: 6, label: "Sign Up", link: "/signup" }
      ]
    ),
  ]

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={tabs}
        renderItem={({ item }) => <AppBarTab item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatlistContainer}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default AppBar