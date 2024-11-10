import { Text, View, StyleSheet } from 'react-native'
import RepositoryList from './RepositoryList'
import AppBar from './appbar/AppBar'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8"
  }
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <RepositoryList />
    </View>
  )
}

export default Main