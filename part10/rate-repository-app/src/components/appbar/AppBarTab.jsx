import { Text, Pressable, StyleSheet, View, Alert } from "react-native"

const styles = StyleSheet.create({
  tabStyle: {
    fontSize: 20,
    color: "#FFF",
  }
})

const AppBarTab = ({ item }) => {
  return (
    <View>
      <Pressable onPress={() => Alert.alert("Pressed!")}>
        <Text style={styles.tabStyle}>{item.label}</Text>
      </Pressable>
    </View>
  )
}

export default AppBarTab