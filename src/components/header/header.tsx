import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Smart Table</Text>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: 'https://example.com/avatar.png' }} // Thay bằng URL avatar thực tế
          style={styles.avatar}
        />
        <Text style={styles.username}>Your name...</Text>
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://example.com/bell-icon.png' }} // Thay bằng icon chuông
            style={styles.bellIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 15,
    alignItems: 'center',
    // display: "contents"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  username: {
    marginLeft: 10,
    fontSize: 16,
  },
  bellIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
});

export default Header;