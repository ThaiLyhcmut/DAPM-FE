import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import BottomNavigation from '../../components/button/button';
import Header from '../../components/header/header';
import { useApiClient } from '../../repositories/service';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HistoryStackParamList } from '../../../navigate';
import * as Sentry from "@sentry/react-native";

const HistoryScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HistoryStackParamList>>();
  // Dữ liệu mẫu cho danh sách lịch sử giao dịch
  const [transactions, setTransactions] = useState<any[]>([])
  const cart = useSelector((state: any) => state.cart);
  console.log(cart)
  // ([
  //   { _id: '1', type: 'Cọc hóa đơn', date: '16/4/2025 8:15 PM', amount: '566.000đ' },
  //   { _id: '2', type: 'Thanh toán hóa đơn', date: '16/4/2025 8:15 PM', amount: '1.000.000đ' },
  //   { _id: '3', type: 'Cọc hóa đơn', date: '16/4/2025 8:15 PM', amount: '170.000đ' },
  //   { _id: '4', type: 'Cọc hóa đơn', date: '16/4/2025 8:15 PM', amount: '170.000đ' },
  //   { _id: '5', type: 'Cọc hóa đơn', date: '16/4/2025 8:15 PM', amount: '170.000đ' },
  //   { _id: '6', type: 'Cọc hóa đơn', date: '16/4/2025 8:15 PM', amount: '170.000đ' },
  // ]);
  const api = useApiClient();
  useEffect(() => {
    try {
      const fetchTransactions = async () => {
        const response: any = await api.get("/api/history/me");
        setTransactions(response.data.reservations);
      }
      fetchTransactions();
    }
    catch (error) {
      console.error('Error fetching transactions:', error);
      Sentry.captureException(error)
    }
  }, [cart]);

  const renderTransaction = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.transactionItem} onPress={() => {
      navigation.navigate('HistoryDetail', { item: item });
    }}>
      <View style={styles.icon}>
        <Text style={styles.iconText}>⏰</Text>
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionType}>{item.paystatus}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <Text style={styles.transactionAmount}>{item.amount}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Header text='History' />
      <View style={styles.container}>

        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search bill"
            placeholderTextColor="#888"
          />
        </View>
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.transactionList}
        />
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  transactionList: {
    paddingBottom: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  iconText: {
    fontSize: 20,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDate: {
    fontSize: 14,
    color: '#888',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HistoryScreen;