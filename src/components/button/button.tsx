import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons từ react-native-vector-icons

const BottomNavigation = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon name="home-outline" size={30} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="fast-food-outline" size={30} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="cart-outline" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
});

export default BottomNavigation;