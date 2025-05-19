import React from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import BottomNavigation from '../../components/button/button';

const HistoryScreen = () => {
  // Dữ liệu mẫu cho danh sách lịch sử giao dịch
  const transactions = [
    { id: '1', type: 'Cọc hóa đơn', date: '16/4/2025 8:15 PM', amount: '566.000đ' },
    { id: '2', type: 'Thanh toán hóa đơn', date: '16/4/2025 8:15 PM', amount: '1.000.000đ' },
    { id: '3', type: 'Cọc hóa đơn', date: '16/4/2025 8:15 PM', amount: '170.000đ' },
    { id: '4', type: 'Cọc hóa đơn', date: '16/4/2025 8:15 PM', amount: '170.000đ' },
    { id: '5', type: 'Cọc hóa đơn', date: '16/4/2025 8:15 PM', amount: '170.000đ' },
    { id: '6', type: 'Cọc hóa đơn', date: '16/4/2025 8:15 PM', amount: '170.000đ' },
  ];

  const renderTransaction = ({ item }: {item: any}) => (
    <View style={styles.transactionItem}>
      <View style={styles.icon}>
        <Text style={styles.iconText}>⏰</Text>
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionType}>{item.type}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <Text style={styles.transactionAmount}>{item.amount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>History</Text>
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
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.transactionList}
      />
      <BottomNavigation />
    </View>
    
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