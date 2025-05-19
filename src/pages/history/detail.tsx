import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import BottomNavigation from '../../components/button/button';

// Dữ liệu mẫu cho hóa đơn
const invoiceData = {
  date: '8:15 PM',
  location: 'Bàn 8 Tầng 1',
  items: [
    { id: '1', name: 'Cánh gà chiên mắm', price: 139000, quantity: 2, total: 278000 },
    { id: '2', name: 'Gà quay', price: 139000, quantity: 1, total: 139000 },
    { id: '3', name: 'Cánh gà chiên mắm', price: 139000, quantity: 1, total: 139000 },
  ],
  subtotal: 556000,
  discount: 10000,
  total: 556000,
};

// Dữ liệu mẫu cho thành viên
const members = [
  { id: '1', name: 'You', avatar: 'https://via.placeholder.com/30' },
  { id: '2', name: 'Kacie', avatar: 'https://via.placeholder.com/30' },
  { id: '3', name: 'Sienna', avatar: 'https://via.placeholder.com/30' },
  { id: '4', name: 'Jack', avatar: 'https://via.placeholder.com/30' },
];

const HistoryDetailScreen = () => {
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemRow}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.price.toLocaleString()}đ</Text>
      <Text style={styles.itemQuantity}>x {item.quantity}</Text>
      <Text style={styles.itemTotal}>{item.total.toLocaleString()}đ</Text>
    </View>
  );

  const renderMember = ({ item }: { item: any }) => (
    <View style={styles.memberItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <Text style={styles.memberName}>{item.name}</Text>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Detail</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoText}>Ngày: {invoiceData.date}</Text>
          <Text style={styles.infoText}>Địa điểm: {invoiceData.location}</Text>
        </View>
        <View style={styles.itemsContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Tên hàng</Text>
            <Text style={styles.headerCell}>Đ.Giá</Text>
            <Text style={styles.headerCell}>SL</Text>
            <Text style={styles.headerCell}>Thành tiền</Text>
          </View>
          <FlatList
            data={invoiceData.items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.itemsList}
          />
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Tổng tiền hàng: {invoiceData.subtotal.toLocaleString()}đ</Text>
          <Text style={styles.totalText}>Chiết khấu: {invoiceData.discount.toLocaleString()}đ</Text>
          <Text style={styles.totalText}>Tổng cộng: {invoiceData.total.toLocaleString()}đ</Text>
        </View>
        <View style={styles.memberSection}>
          <Text style={styles.sectionTitle}>Member</Text>
          <FlatList
            data={members}
            renderItem={renderMember}
            keyExtractor={(item) => item.id}
            style={styles.memberList}
          />
        </View>
      </View>
      <BottomNavigation />
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
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  info: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemsContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerCell: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  itemsList: {
    maxHeight: 200,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemName: {
    flex: 1,
    textAlign: 'center',
  },
  itemPrice: {
    flex: 1,
    textAlign: 'center',
  },
  itemQuantity: {
    flex: 1,
    textAlign: 'center',
  },
  itemTotal: {
    flex: 1,
    textAlign: 'center',
  },
  totalContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  totalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  memberSection: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  memberList: {
    maxHeight: 200,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  memberName: {
    fontSize: 16,
  },
});

export default HistoryDetailScreen;