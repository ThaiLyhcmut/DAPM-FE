import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { onBoard } from '../../../actions/authActions';

const OrderTogetherScreen = () => {
  const dispatch = useDispatch()
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/pana1.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Order Together</Text>
      <Text style={styles.subtitle}>Invite your friends to join the table, order and split the bill — all in one simple app</Text>
      <TouchableOpacity style={styles.button} onPress={() => {
        dispatch(onBoard(true))
      }}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  image: { width: 150, height: 150, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 40 },
  button: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5 },
  buttonText: { color: '#fff', fontSize: 16 },
});

export default OrderTogetherScreen;