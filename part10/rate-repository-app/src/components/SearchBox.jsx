import { TextInput } from "react-native";
import formStyles from "./formStyles";

const SearchBox = ({ setSearch, search }) => {

  return (
    <TextInput
      autoFocus
      style={formStyles.input}
      placeholder='Search Repository'
      value={search}
      onChangeText={(text) => setSearch(text)}
    />
  )
}

export default SearchBox;