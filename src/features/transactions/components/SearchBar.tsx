import { StyleSheet, View } from "react-native";
import PrimaryInput from "@/src/components/PrimaryInput";
import { scale } from "@/src/utils/scale";
import { useState } from "react";

type SearchBarProps = {
  search: (text: string) => void;
};
const SearchBar: React.FC<SearchBarProps> = ({
  search,
}) => {
  const [searchText, setSearchText] = useState('');
  return (
    <View
      style={{
        marginTop: scale(25),
        marginBottom: scale(2),
        alignItems: "center",
      }}
    >
      <PrimaryInput
        placeholder="Search transactions"
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
          search(text);
        }}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
