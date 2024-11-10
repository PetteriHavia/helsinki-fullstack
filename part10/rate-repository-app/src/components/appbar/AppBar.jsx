import { View, StyleSheet, FlatList, ScrollView } from "react-native"
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
      <ScrollView horizontal>
        <FlatList
          horizontal={true}
          data={tabs}
          renderItem={({ item }) => <AppBarTab item={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatlistContainer}
        />
      </ScrollView>
    </View>
  )
}

export default AppBar