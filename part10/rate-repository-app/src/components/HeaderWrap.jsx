import SearchBox from "./SearchBox"
import PickerBox from "./PickerBox"
import { View } from "react-native"
import formStyles from "./formStyles"

const HeaderWrapper = ({ setOrderBy, setOrderDirection, orderBy, orderDirection, setSearch, search }) => {
  return (
    <View style={formStyles.form}>
      <SearchBox setSearch={setSearch} search={search} />
      <PickerBox setOrderBy={setOrderBy} setOrderDirection={setOrderDirection} orderBy={orderBy} orderDirection={orderDirection} />
    </View>
  )
}

export default HeaderWrapper