import React, {useState} from 'react';
import {Text, TextInput, View, Platform, StyleSheet} from 'react-native';
import colors from '../../resources/colors';

export default function CoinSearch({onChange}) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleText = query => {
    setSearchQuery(query);
    if (onChange) {
      onChange(query);
    }
  };

  // console.log(searchQuery);

  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          Platform.OS === 'ios' ? styles.textInputIOS : styles.textInputAndroid,
        ]}
        onChangeText={handleText}
        value={searchQuery}
        placeholder="Search coin"
        placeholderTextColor="#fff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: colors.charade,
    paddingLeft: 16,
    color: '#fff',
  },
  textInputAndroid: {
    borderTopWidth: 2,
    borderBottomColor: colors.zircon,
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8,
    backgroundColor: colors.blackPearl,
  },
});
