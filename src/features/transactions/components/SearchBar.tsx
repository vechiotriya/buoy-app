import { StyleSheet, Text, View } from 'react-native'
import PrimaryInput from '@/src/components/PrimaryInput'
import { useState } from 'react';
import { scale } from '@/src/utils/scale';

const SearchBar = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
  return (
    <View style={{marginTop: scale(25), marginBottom: scale(5),justifyContent: 'center', alignItems: 'center'}}>
    <PrimaryInput placeholder='Search transactions' value={searchKeyword} onChangeText={setSearchKeyword}/>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({})