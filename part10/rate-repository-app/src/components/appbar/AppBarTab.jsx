import { Text, Pressable, StyleSheet, View } from "react-native"
import { Link } from "react-router-native"

const styles = StyleSheet.create({
  tabStyle: {
    fontSize: 20,
    color: "#FFF",
  }
})

const AppBarTab = ({ item }) => {
  return (
    <View style={styles.tabBox}>
      <Link to={item.link}>
        <Text style={styles.tabStyle}>{item.label}</Text>
      </Link>
    </View>
  )
}

export default AppBarTab