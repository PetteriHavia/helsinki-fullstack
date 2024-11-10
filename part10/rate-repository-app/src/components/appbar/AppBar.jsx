import { View, StyleSheet, FlatList } from "react-native"
import Constants from 'expo-constants'
import AppBarTab from "./AppBarTab"

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    padding: 16,
  },
  flatlistContainer: {
    gap: 10
  }
})


const AppBar = () => {

  const tabs = [
    {
      id: 1,
      label: "Repositories",
      link: "/"
    },
    {
      id: 2,
      label: "Sign In",
      link: "/signin"
    }
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