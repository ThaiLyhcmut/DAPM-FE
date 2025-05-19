import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const foodItems = [
  { name: 'Gà Chiên Mắm', image: 'https://example.com/ga-chien-mam.jpg', time: '25 min', rating: 4.5, price: '139.000 đ' },
  { name: 'Gà Quay', image: 'https://example.com/ga-quay.jpg', time: '25 min', rating: 4.5, price: '139.000 đ' },
  { name: 'Gà Sốt Chanh Dây', image: 'https://example.com/ga-sot-chanh.jpg', time: '25 min', rating: 4.5, price: '139.000 đ' },
  { name: 'Gà Nướng Mật Ong', image: 'https://example.com/ga-nuong-mat-ong.jpg', time: '25 min', rating: 4.5, price: '99.000 đ' },
  { name: 'Gỏi Gà Măng Cút', image: 'https://example.com/goi-ga-mang-cut.jpg', time: '25 min', rating: 4.5, price: '139.000 đ' },
  { name: 'Gà Bó Xôi', image: 'https://example.com/ga-bo-xoi.jpg', time: '25 min', rating: 4.5, price: '139.000 đ' },
  { name: 'Gà Rang Gừng', image: 'https://example.com/ga-rang-gung.jpg', time: '25 min', rating: 4.5, price: '129.000 đ' },
];

const FoodList = ({ category = 'Chicken' }) => {
  const renderItem = ({ item }: {item: any}) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.details}>
          <Text style={styles.time}>{item.time}</Text>
          <Text style={styles.rating}>{item.rating} ★</Text>
        </View>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <FlatList
        data={foodItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    width: width - 20, // Chiếm toàn bộ chiều rộng trừ padding
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  rating: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  list: {
    paddingBottom: 10,
  },
});

export default FoodList;