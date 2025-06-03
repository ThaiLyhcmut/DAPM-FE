import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const FreshMealsScreen = ({ navigation }: {navigation: any}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/Salad.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Fresh Meals</Text>
      <Text style={styles.subtitle}>Discover fresh, healthy meals</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BookTable')}>
        <Text style={styles.buttonText}>Next</Text>
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

export default FreshMealsScreen;