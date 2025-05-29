import React, { use } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { logout } from '../../../actions/authActions';
import { useDispatch } from 'react-redux';
import { AuthStackParamList } from '../../../navigate';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reducers';
import Header from '../../components/header/header';


const ProfileScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  console.log('User data:', user);
  const handleLogout = () => {
    console.log('Logout');
    dispatch(logout());
  }

  return (
    <>
      <Header text='Profile' />
      <View style={styles.container}>

        <View style={styles.profileContainer}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
          <View style={styles.info}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{user.name}</Text>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user.email}</Text>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.value}>{user.phone}</Text>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>{user.address}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  editIcon: {
    fontSize: 20,
    marginBottom: 20,
  },
  info: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;