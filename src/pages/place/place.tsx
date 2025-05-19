import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Sử dụng Ionicons cho biểu tượng
import DateTimePicker from '@react-native-community/datetimepicker'; // Thư viện chọn ngày giờ

const { width } = Dimensions.get('window');

const PlaceOrder = () => {
  const [selectedFloor, setSelectedFloor] = useState('1st floor');
  const [selectedTable, setSelectedTable] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState('');

  const tables = [
    { id: '2', label: 'Table for 2', image: 'https://example.com/table2.png' },
    { id: '4', label: 'Table for 4', image: 'https://example.com/table4.png' },
    { id: '8', label: 'Table for 8', image: 'https://example.com/table8.png' },
    { id: 'more', label: 'More', image: 'https://example.com/more.png' },
  ];

  const floorTables: any = {
    '1st floor': ['A1', 'A2', 'A3', 'A4', 'A5'],
    '2nd floor': ['A6', 'A7', 'A8', 'A9', 'A5'],
  };

  const onChangeTime = (event: any, selectedTime: any) => {
    const currentTime = selectedTime || date;
    setShowTimePicker(false);
    setDate(currentTime);
  };

  const formatTime = (date: any) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDate = (date: any) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const renderTableItem = ({ item }: {item: any}) => (
    <TouchableOpacity style={styles.tableItem}>
      <Image source={{ uri: item.image }} style={styles.tableImage} />
      <Text style={styles.tableText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderFloorTable = (table: any) => (
    <TouchableOpacity
      style={[styles.floorTable, selectedTable === table && styles.selectedTable]}
      onPress={() => setSelectedTable(table)}
    >
      <Text style={styles.floorTableText}>{table}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Place Order</Text>
      <Text style={styles.sectionTitle}>List available tables</Text>
      <FlatList
        data={tables}
        renderItem={renderTableItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tableList}
      />
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Select table</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setSelectedFloor(selectedFloor === '1st floor' ? '2nd floor' : '1st floor')}
        >
          <Text style={styles.dropdownText}>{selectedFloor}</Text>
          <Icon name="chevron-down" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.letGoButton}>
          <Text style={styles.letGoText}>Let Go!</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.floorPlan}>
        {floorTables[selectedFloor].map((table: any) => renderFloorTable(table))}
      </View>
      <Text style={styles.noteText}>
        Note: The restaurant is open from 4pm to 11pm
      </Text>
      <View style={styles.timeContainer}>
        <Text style={styles.timeLabel}>Time:</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <Text style={styles.timeText}>{formatTime(date)}</Text>
        </TouchableOpacity>
        <Icon name="time-outline" size={20} color="#000" style={styles.timeIcon} />
        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            onChange={onChangeTime}
          />
        )}
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>Date:</Text>
        <Text style={styles.dateText}>{formatDate(date)}</Text>
        <Icon name="calendar-outline" size={20} color="#000" style={styles.dateIcon} />
      </View>
      <View style={styles.noteContainer}>
        <Text style={styles.noteLabel}>Note:</Text>
        <TextInput
          style={styles.noteInput}
          placeholder="TôI sẽ dành bàn này cho tôI và những người thân yêu..."
          value={note}
          onChangeText={setNote}
          multiline
        />
      </View>
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
        <Icon name="checkmark" size={16} color="#fff" style={styles.confirmIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableList: {
    paddingVertical: 10,
  },
  tableItem: {
    alignItems: 'center',
    marginRight: 10,
  },
  tableImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#4682B4',
  },
  tableText: {
    fontSize: 14,
    textAlign: 'center',
  },
  dropdownContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
  dropdownText: {
    fontSize: 16,
  },
  letGoButton: {
    backgroundColor: '#4682B4',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  letGoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  floorPlan: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 10,
  },
  floorTable: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#fff',
  },
  selectedTable: {
    backgroundColor: '#4682B4',
  },
  floorTableText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  noteText: {
    fontSize: 14,
    color: '#ff4500',
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 5,
  },
  timeLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  timeText: {
    fontSize: 16,
    flex: 1,
  },
  timeIcon: {
    marginLeft: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 5,
  },
  dateLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  dateText: {
    fontSize: 16,
    flex: 1,
  },
  dateIcon: {
    marginLeft: 10,
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
    textAlignVertical: 'top',
    minHeight: 80,
  },
  confirmButton: {
    backgroundColor: '#4682B4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  confirmIcon: {
    marginLeft: 5,
  },
});

export default PlaceOrder;