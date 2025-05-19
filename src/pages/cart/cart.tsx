import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Sử dụng Ionicons cho biểu tượng

const { width } = Dimensions.get('window');

const initialCartItems = [
  { id: '1', name: 'Gà Chiên Mắm', image: 'https://example.com/ga-chien-mam.jpg', price: 139000, quantity: 2 },
  { id: '2', name: 'Gà Quay', image: 'https://example.com/ga-quay.jpg', price: 139000, quantity: 1 },
  { id: '3', name: 'Gà Sốt Chanh Dây', image: 'https://example.com/ga-sot-chanh.jpg', price: 139000, quantity: 1 },
];

const CartScreen = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(10000); // Giả định thuế cố định
  const [note, setNote] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [members, setMembers] = useState<any>([]); // Danh sách thành viên

  // Tính toán subtotal mỗi khi cartItems thay đổi
  useEffect(() => {
    const calculatedSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setSubtotal(calculatedSubtotal);
  }, [cartItems]);

  const handleIncrease = (id: any) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecrease = (id: any) => {
    setCartItems(cartItems.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const handleRemove = (id: any) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleAddMember = () => {
    if (email.trim()) {
      setMembers([...members, { id: members.length.toString(), email, name: email.split('@')[0] }]);
      setEmail('');
      setModalVisible(false);
    }
  };

  const handleRemoveMember = (id: any) => {
    setMembers(members.filter((member: any) => member.id !== id));
  };

  const formatPrice = (price: any) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' đ';
  };

  const renderCartItem = ({ item }: {item: any}) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.itemInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => handleDecrease(item.id)} style={styles.quantityButton}>
            <Icon name="remove" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleIncrease(item.id)} style={styles.quantityButton}>
            <Icon name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.removeButton}>
        <Icon name="close" size={20} color="#000" />
      </TouchableOpacity>
      <Text style={styles.totalItemPrice}>{formatPrice(item.price * item.quantity)}</Text>
    </View>
  );

  const renderMemberItem = ({ item }: {item: any}) => (
    <View style={styles.memberItem}>
      <Text style={styles.memberName}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleRemoveMember(item.id)}>
        <Icon name="close" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.addMember}>+ add member</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal:</Text>
          <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Tax:</Text>
          <Text style={styles.summaryValue}>{formatPrice(tax)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total:</Text>
          <Text style={styles.summaryValue}>{formatPrice(subtotal + tax)}</Text>
        </View>
      </View>
      <View style={styles.noteContainer}>
        <Text style={styles.noteLabel}>Note:</Text>
        <TextInput
          style={styles.noteInput}
          placeholder="abc..."
          value={note}
          onChangeText={setNote}
        />
      </View>
      <TouchableOpacity style={styles.placeOrderButton}>
        <Text style={styles.placeOrderText}>Place Order</Text>
      </TouchableOpacity>

      {/* Modal Add People */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add people</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalLabel}>Emails</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g., maria@gmail.com"
              value={email}
              onChangeText={setEmail}
            />
            <FlatList
              data={members}
              renderItem={renderMemberItem}
              keyExtractor={(item) => item.id}
              style={styles.memberList}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.addButton]}
                onPress={handleAddMember}
              >
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addMember: {
    fontSize: 16,
    color: '#4682B4',
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 100,
    justifyContent: 'space-between',
    padding: 5,
  },
  quantityButton: {
    padding: 5,
    backgroundColor: '#4682B4',
    borderRadius: 5,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    marginHorizontal: 10,
  },
  totalItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summary: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteContainer: {
    marginBottom: 10,
  },
  noteLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  placeOrderButton: {
    backgroundColor: '#4682B4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 10,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width - 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  memberList: {
    maxHeight: 100,
    marginBottom: 20,
  },
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  memberName: {
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4682B4',
  },
  addButton: {
    backgroundColor: '#4682B4',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4682B4',
  },
});

export default CartScreen;