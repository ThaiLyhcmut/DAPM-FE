import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const PaymentScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thanh Toán</Text>
      <View style={styles.billDetails}>
        <View style={styles.row}>
          <Text>Tổng hóa đơn</Text>
          <Text>566.000 đ</Text>
        </View>
        <View style={styles.row}>
          <Text>Đặt cọc 30%</Text>
          <Text>170.000 đ</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.totalText}>Tổng cộng</Text>
          <Text style={styles.totalText}>170.000 đ</Text>
        </View>
      </View>
      <View style={styles.paymentMethods}>
        <Text style={styles.paymentMethodTitle}>Phương thức thanh toán</Text>
        <TouchableOpacity style={styles.methodRow}>
          <Text>Chuyển khoản ngân hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.methodRow, styles.selectedMethod]}>
          <Text>MoMo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.qrCodeContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Thay bằng đường dẫn mã QR thực tế
          style={styles.qrCode}
        />
      </View>
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
  billDetails: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalText: {
    fontWeight: 'bold',
  },
  paymentMethods: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  paymentMethodTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  methodRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  selectedMethod: {
    backgroundColor: '#e0e0e0', // Màu để đánh dấu phương thức đã chọn
  },
  qrCodeContainer: {
    alignItems: 'center',
  },
  qrCode: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderColor: '#007bff',
  },
});

export default PaymentScreen;