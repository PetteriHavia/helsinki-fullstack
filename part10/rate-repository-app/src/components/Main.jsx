import { View, StyleSheet } from 'react-native'
import { Route, Routes, Navigate } from "react-router-native"
import RepositoryList from './RepositoryList'
import AppBar from './appbar/AppBar'
import SignIn from './SignIn'
import SingleRepository from './SingleRepository'
import ReviewForm from './ReviewForm'
import SignUp from './SignUp'
import MyReviews from './MyReviews'

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
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/:id" element={<SingleRepository />} />
        <Route path="/create-review" element={<ReviewForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/my-reviews" element={<MyReviews />} />
      </Routes>
    </View>
  )
}

export default Main