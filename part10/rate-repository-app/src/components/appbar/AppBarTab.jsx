import { Pressable } from "react-native"
import Text from "../Text"
import { useNavigate } from "react-router-native";

const AppBarTab = ({ item }) => {
  const navigate = useNavigate();

  const handlePress = async () => {
    if (item.action) {
      await item.action(); // Wait for the action to complete
    }
    navigate(item.link); // Navigate after action is complete
  };

  return (
    <Pressable onPress={handlePress}>
      <Text color="white" fontSize="subheading">{item.label}</Text>
    </Pressable>
  );
};

export default AppBarTab