import { View, StyleSheet, FlatList } from "react-native"
import Constants from 'expo-constants'
import AppBarTab from "./AppBarTab"

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    padding: 16,
  }
})


const AppBar = () => {

  const tabs = [
    {
      id: 1,
      label: "Repositories"
    },
  ]

  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={({ item }) => <AppBarTab item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default AppBar