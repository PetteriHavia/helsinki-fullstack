import { View, StyleSheet, FlatList, Pressable } from "react-native"
import Text from "../Text"
import Constants from 'expo-constants'
import AppBarTab from "./AppBarTab"
import { useQuery, useApolloClient } from "@apollo/client"
import { ME } from "../../../graphql/queries"
import { Link, useNavigate } from "react-router-native"
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
  const navigate = useNavigate()

  const tabs = [
    {
      id: 1,
      label: "Repositories",
      link: "/"
    },
  ]

  const handleLogout = async () => {
    try {
      await authStorage.removeAccessToken()
      apolloClient.resetStore()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={({ item }) => <AppBarTab item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatlistContainer}
        showsHorizontalScrollIndicator={false}
      />
      {data?.me ?
        <Link to={`/signin`} onPress={handleLogout}>
          <Text color="white" fontSize="heading">Sign Out</Text>
        </Link>
        :
        <Link to={`/signin`}>
          <Text color="white" fontSize="heading">Sign In</Text>
        </Link>
      }
    </View>
  )
}

export default AppBar