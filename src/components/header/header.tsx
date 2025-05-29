import React, { use } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

interface HeaderProps {
  text?: string;
}

const Header = ({text}: HeaderProps) => {
  const yourName = useSelector((state: any) => state.auth.user?.name) || 'Your name...';
  const yourAvatar = useSelector((state: any) => state.auth.user?.avatar) || 'https://example.com/default-avatar.png'; // Thay bằng URL avatar mặc định
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{text}</Text>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: yourAvatar }}
          style={styles.avatar}
        />
        <Text style={styles.username}>Xin chào {yourName}</Text>
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
    marginTop: 20,
    backgroundColor: '#f0f8ff', // Màu nền sáng
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc', // Màu viền dưới
    width: '100%',
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