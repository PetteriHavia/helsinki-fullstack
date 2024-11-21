import Text from "../Text"
import { Link } from "react-router-native"

const AppBarTab = ({ item }) => {
  return (
    <Link to={item.link}>
      <Text color="white" fontSize="heading">{item.label}</Text>
    </Link>
  )
}

export default AppBarTab