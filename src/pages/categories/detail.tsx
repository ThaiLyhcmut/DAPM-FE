import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RouteProp } from '@react-navigation/native';
import type { HomeStackParamList } from '../../../navigate';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../actions/cartActions';

const { width } = Dimensions.get('window');

type CategoryDetailScreenRouteProp = RouteProp<HomeStackParamList, 'CategoryDetail'>;

type Props = {
  route: CategoryDetailScreenRouteProp;
};

const CategoryDetailScreen = ({ route }: Props) => {
  const { item } = route.params;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);

  const totalPrice = (parseInt(item.price.replace(/\D/g, '')) * quantity) / 1000 + 'k đ';
  const handleAddToCart = () => {
    // Logic to add item to cart
    dispatch(addToCart({ ...item, quantity }));
  };
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.time}>{item.time}</Text>
          <Text style={styles.rating}>{item.rating} ★</Text>
        </View>
        <Text style={styles.price}>{item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={handleDecrease} style={styles.quantityButton}>
            <Icon name="remove" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={handleIncrease} style={styles.quantityButton}>
            <Icon name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.description}>
        Details: Thăn phấn gầm gà, nướng rấm, hần nà ...
      </Text>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalPrice}>{totalPrice}</Text>
      </View>
      <TouchableOpacity style={styles.orderButton} onPress={handleAddToCart}>
        <Icon name="cart" size={20} color="#fff" />
        <Text style={styles.orderButtonText}>Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: width - 20,
    height: 300,
    borderRadius: 10,
    margin: 10,
  },
  info: {
    padding: 10,
    backgroundColor: '#4682B4',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  time: {
    fontSize: 16,
    color: '#fff',
  },
  rating: {
    fontSize: 16,
    color: '#fff',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 120,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
  },
  quantityButton: {
    padding: 5,
    backgroundColor: '#4682B4',
    borderRadius: 5,
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  orderButton: {
    backgroundColor: '#4682B4',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 20, // Add margin to ensure button is not cut off
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CategoryDetailScreen;