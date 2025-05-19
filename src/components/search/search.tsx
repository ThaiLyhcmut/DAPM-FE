import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search food..."
        placeholderTextColor="#999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    padding: 10,
    fontSize: 16,
  },
});

export default SearchBar;