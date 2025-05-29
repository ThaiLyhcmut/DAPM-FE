import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Header from '../../components/header/header';
import SearchBar from '../../components/search/search';
import BottomNavigation from '../../components/button/button';
import List from '../../components/list/list';
import { useApiClient } from '../../repositories/service';

const categories = [
  { name: 'All', image: 'https://example.com/all.png' },
  { name: 'Chicken', image: 'https://example.com/chicken.png' },
  { name: 'Wine', image: 'https://example.com/wine.png' },
  { name: 'Beef', image: 'https://example.com/beef.png' },
  { name: 'Seafood', image: 'https://example.com/seafood.png' },
  { name: 'Duck', image: 'https://example.com/duck.png' },
  { name: 'Lamb', image: 'https://example.com/lamb.png' },
  { name: 'Vegetarian', image: 'https://example.com/vegetarian.png' },
  { name: 'Hot pot', image: 'https://example.com/hotpot.png' },
  { name: 'Desserts', image: 'https://example.com/desserts.png' },
  { name: 'Chicken', image: 'https://example.com/chicken2.png' },
  { name: 'Chicken', image: 'https://example.com/chicken3.png' },
];

const sales = [
  { name: 'Sale Sưu Tầm 50% Giảm 50%', image: 'https://example.com/sale-50.jpg' },
  { name: 'Ẩm Thực Bò Gà Giảm 10%', image: 'https://example.com/am-thuc-bo-ga.jpg' },
  { name: 'Heineken 2025 Tặng Bia Miễn Phí Sale S', image: 'https://example.com/heineken.jpg' },
  { name: 'Combo Gia Đình Giảm 20%', image: 'https://example.com/combo-gia-dinh.jpg' },
  { name: 'Món Ăn Vặt Giảm 15%', image: 'https://example.com/mon-an-vat.jpg' },
  // Thêm các mục khác nếu cần
];

const bestSales = [
  { name: 'Gà chiên mắm đầy', image: 'https://example.com/ga-chien-mam.jpg' },
  { name: 'Gà sốt chanh muối', image: 'https://example.com/ga-sot-chanh.jpg' },
  { name: 'Gà gỏi gù', image: 'https://example.com/ga-goi-gu.jpg' },
  { name: 'Heo quay', image: 'https://example.com/heo-quay.jpg' },
  { name: 'Bò nướng lá lốt', image: 'https://example.com/bo-nuong.jpg' },
  { name: 'Cá chiên giòn', image: 'https://example.com/ca-chien.jpg' },
  // Thêm các mục khác nếu cần
];


const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const [sales, setSales] = useState([]);
  const [bestSales, setBestSales] = useState([]);
  const api = useApiClient();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCategories:any = await api.get("/api/categories");
        const responseSales:any = await api.get("/api/categories");
        const responseBestSales:any = await api.get("/api/foods");
        setCategories(responseCategories.data.categories);
        setSales(responseSales.data.categories);
        setBestSales(responseBestSales.data.foods);
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }

    }
    fetchData();
  },[])
  if (categories.length === 0 || sales.length === 0 || bestSales.length === 0) {
    return <View style={styles.container}><Header /><SearchBar /><BottomNavigation /></View>;
  }
  return (
    <View style={styles.container}>
      <Header text='Smart Table' />
      <ScrollView>
        <SearchBar />
        <List Data={categories} text='categories' />
        <List Data={sales} text='sales'/>
        <List Data={bestSales} text='bestSales' Type='food'/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;