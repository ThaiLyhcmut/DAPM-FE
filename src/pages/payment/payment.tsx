import React, { use } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const totalAmount = useSelector((state: any) => state.cart.totalPrice);
  const depositAmount = Math.round(totalAmount * 0.3) + 10000; // 30% of total amount
  const formattedTotal = totalAmount.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  const formattedDeposit = depositAmount.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  const formattedTotalDeposit = depositAmount.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thanh Toán</Text>
      <View style={styles.billDetails}>
        <View style={styles.row}>
          <Text>Tổng hóa đơn</Text>
          <Text>{formattedTotal}</Text>
        </View>
        <View style={styles.row}>
          <Text>Đặt cọc 30%</Text>
          <Text>{formattedDeposit}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.totalText}>Tổng cộng</Text>
          <Text style={styles.totalText}>{formattedTotalDeposit}</Text>
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
      <TouchableOpacity style={styles.methodRow}>
        <Button title="Xác nhận thanh toán" onPress={() => {
          dispatch({ type: 'CLEAR_ALL_CART'});
          alert('Thanh toán thành công!'); // Thông báo thanh toán thành công
        }} />
      </TouchableOpacity>
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