import React, { use, useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import LoadingSpinner from '../../components/loading/loadSmall';
import { useApiClient } from '../../repositories/service';
import { RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '../../../navigate';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');
import * as Sentry from "@sentry/react-native";

const data = [
  { name: 'Gà Chiên Mắm', image: 'https://example.com/ga-chien-mam.jpg', time: '25 min', rating: 4.5, price: '139.000 đ' },
  { name: 'Gà Quay', image: 'https://example.com/ga-quay.jpg', time: '25 min', rating: 4.5, price: '139.000 đ' },
  { name: 'Gà Sốt Chanh Dây', image: 'https://example.com/ga-sot-chanh.jpg', time: '25 min', rating: 4.5, price: '139.000 đ' },
  { name: 'Gà Nướng Mật Ong', image: 'https://example.com/ga-nuong-mat-ong.jpg', time: '25 min', rating: 4.5, price: '99.000 đ' },
  { name: 'Gỏi Gà Măng Cút', image: 'https://example.com/goi-ga-mang-cut.jpg', time: '25 min', rating: 4.5, price: '139.000 đ' },
  { name: 'Gà Bó Xôi', image: 'https://example.com/ga-bo-xoi.jpg', time: '25 min', rating: 4.5, price: '139.000 đ' },
  { name: 'Gà Rang Gừng', image: 'https://example.com/ga-rang-gung.jpg', time: '25 min', rating: 4.5, price: '129.000 đ' },
];

type ListCategoryScreenRouteProp = RouteProp<HomeStackParamList, 'CategoryList'>;

type Props = {
  route: ListCategoryScreenRouteProp;
  navigation: NativeStackNavigationProp<HomeStackParamList>
};

const CategoriesListScreen = ({ route, navigation }: Props) => {
  const { _id, category } = route.params;
  console.log('Category:', _id);
  const [foodItems, setFoodItems] = useState([]);
  const api = useApiClient();
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response:any = await api.get("/api/categories/" + _id);
        setFoodItems(response.data.foods);
      }
      catch (error) {
        console.error('Error fetching food items:', error);
        Sentry.captureException(error)
      }
    }
    fetchFoodItems();
  }, []);
  const handleDetailPress = (item: any) => {
    if (!item) {
      console.error('Item not found:', _id);
      return;
    }
    navigation.navigate('CategoryDetail', {
      item: {
        _id: item._id,
        name: item.name,
        image: item.image,
        time: item.time,
        rating: item.rating,
        price: item.price,
      }
    })
  };
  if (foodItems.length === 0) { return <LoadingSpinner size={300} />; }
  const renderItem = ({ item }: {item: any}) => (
    <TouchableOpacity style={styles.card} onPress={() => handleDetailPress(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.details}>
          <Text style={styles.time}>{item.time}</Text>
          <Text style={styles.rating}>{item.rating} ★</Text>
        </View>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <FlatList
        data={foodItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => item._id}
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

export default CategoriesListScreen;