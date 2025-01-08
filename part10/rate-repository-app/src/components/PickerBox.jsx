import { Picker } from "@react-native-picker/picker";

const PickerBox = ({ setOrderBy, setOrderDirection, orderBy, orderDirection }) => {

  const SORT_OPTIONS = [
    { label: "Latest repositories", orderBy: "CREATED_AT", orderDirection: "DESC" },
    { label: "Highest rated repositories", orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
    { label: "Lowest rated repositories", orderBy: "RATING_AVERAGE", orderDirection: "ASC" }
  ];

  const handleValueChange = (label) => {
    const selectedOption = SORT_OPTIONS.find(option => option.label === label);
    if (selectedOption) {
      setOrderBy(selectedOption.orderBy);
      setOrderDirection(selectedOption.orderDirection);
    }
  };

  const selectedValue = SORT_OPTIONS.find(option => option.orderBy === orderBy && option.orderDirection === orderDirection)?.label

  return (
    <Picker selectedValue={selectedValue} onValueChange={handleValueChange}>
      {SORT_OPTIONS.map((option) => (
        <Picker.Item label={option.label} value={option.label} key={option.label} />
      ))}
    </Picker>
  );
};

export default PickerBox
