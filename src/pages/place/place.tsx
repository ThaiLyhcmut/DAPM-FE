// App.js
import React, { use, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useApiClient } from '../../repositories/service';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CartStackParamList } from '../../../navigate';
import * as Sentry from "@sentry/react-native";

const PlaceScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<CartStackParamList>>();
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [selectedTable, setSelectedTable] = useState('A6');
  const [selectedTableSize, setSelectedTableSize] = useState(8);
  const [time, setTime] = useState("8:30 pm");
  const [date, setDate] = useState("20 April 2025");
  const [note, setNote] = useState("Tôi sẽ đến bị đau chân hay chờ tôi bàn ở tầng dưới");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const showTimePicker = () => setTimePickerVisibility(true);
  const hideTimePicker = () => setTimePickerVisibility(false);

  const handleConfirmDate = (selectedDate: Date) => {
    const formattedDate = selectedDate.toLocaleDateString();
    setDate(formattedDate);
    hideDatePicker();
  };

  const handleConfirmTime = (selectedTime: Date) => {
    const formattedTime = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTime(formattedTime);
    hideTimePicker();
  };

  interface floorI {
    _id: number,
    name: string,
    tables: any[],
  }
  
  const [floors, setFloors] = useState<floorI[]>([]);
  const api = useApiClient();
  useEffect(() => {
    const fetchFloors = async () => {
      try {
        const response: any = await api.get("/api/floors");
        console.log('Fetched floors:', response);
        response.data.floors.forEach(async (floor: any) => {
          const responseTables: any = await api.get("/api/floors/" + floor._id);
          console.log('Fetching tables for floor:', responseTables);
          const data = {
            _id: floor._id,
            name: floor.name,
            tables: responseTables.data.tables
            }
            setFloors(prevFloors => [...prevFloors, data]);
            console.log('Fetched floor:', data);
          });
        }catch (error) {
        console.error('Error fetching floors:', error);
        Sentry.captureException(error)
      }
    }
    fetchFloors();

  }, []);
  const [currentFloor, setCurrentFloor] = useState<floorI | undefined>(floors.find(f => f._id === selectedFloor));
  console.log('floors:', floors);

  const handleTableSizeSelection = (size: any) => {
    setSelectedTableSize(size);
  };

  const handleFloorChange = (floorId: any) => {
    setSelectedFloor(floorId);
    setCurrentFloor(floors.find(f => f._id === floorId))
  };

  const handleTableSelection = (tableId: any) => {
    setSelectedTable(tableId);
  };

  const TableIcon = ({ size }: { size: any }) => {
    const tableIcons: any = {
      2: "2x🪑",
      4: "4x🪑",
      6: "4x🪑",
      8: "8x🪑",
      10: "10x🪑"
    };

    return (
      <Text style={styles.tableIconText}>{tableIcons[size]}</Text>
    );
  };
  const cart = useSelector((state: any) => state.cart);
  const handleConfirmOrder = async () => {
    const data = {
      "tableId": selectedTable,
      "date": date,
      "time": time,
      "note": note,
      "friendList": cart.friendsList,
      "foodItem": cart.items.map((item: any) => ({
        "productId": item._id,
        "quantity": item.quantity
      })),
      "notefood": cart.notefood
    }
    console.log('Creating reservation with data:', data);
    try {
      const response = await api.post("/api/reservations", data);
      console.log('Reservation response:', response);
      navigation.navigate("Payment");
    } catch (error) {
      alert('Table is not available, please choose another table');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>List available tables</Text>

          {/* Table size selector */}
          <View style={styles.tableSizeContainer}>
            {[2, 4, 8].map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.tableSizeButton,
                  selectedTableSize === size && styles.tableSizeButtonSelected
                ]}
                onPress={() => handleTableSizeSelection(size)}
              >
                <View style={styles.tableIconContainer}>
                  <TableIcon size={size} />
                </View>
                <Text style={styles.tableSizeText}>Table for {size}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.tableSizeButton}
            >
              <View style={styles.tableIconContainer}>
                <Text style={styles.tableIconText}>⋯</Text>
              </View>
              <Text style={styles.tableSizeText}>More</Text>
            </TouchableOpacity>
          </View>

          {/* Floor selector */}
          <View style={styles.floorSelectorContainer}>
            <View style={styles.floorSelectorHeader}>
              <Text style={styles.floorSelectorTitle}>Select table</Text>
              <View style={styles.floorToggleContainer}>
                {floors.map((floor) => (
                  <TouchableOpacity
                    key={floor._id}
                    onPress={() => handleFloorChange(floor._id)}
                    style={[
                      styles.floorToggleButton,
                      selectedFloor === floor._id && styles.floorToggleButtonSelected
                    ]}
                  >
                    <Text style={styles.floorToggleText}>{floor.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Floor layout */}
          <View style={styles.floorLayout}>
            {currentFloor?.tables.map((table) => table.member === selectedTableSize && (
              <TouchableOpacity
                key={table._id}
                style={[
                  styles.tableButton,
                  { top: table.position.top, left: table.position.left },
                  selectedTable === table._id && styles.tableButtonSelected
                ]}
                onPress={() => handleTableSelection(table._id)}
              >
                <Text
                  style={[
                    styles.tableButtonText,
                    selectedTable === table._id && styles.tableButtonTextSelected
                  ]}
                >
                  {table._id.slice(-2)}
                </Text>
              </TouchableOpacity>
            ))}

            {/* Restaurant furniture elements */}
            <View style={[styles.furniture, { bottom: 20, left: 40 }]} />
            <View style={[styles.furniture, { bottom: 20, right: 40 }]} />
            <View style={styles.floorExit}>
              <Text style={styles.floorExitText}>FF</Text>
            </View>
          </View>

          {/* Opening hours notice */}
          <Text style={styles.openingHours}>Note: The restaurant is open from 4pm to 11pm</Text>

          {/* Note field */}
          <View style={styles.noteContainer}>
            <Text style={styles.noteLabel}>Note</Text>
            <TextInput
              style={styles.noteInput}
              value={note}
              onChangeText={setNote}
              multiline
            />
          </View>

          {/* Time picker */}
          <TouchableOpacity style={styles.inputContainer} onPress={showTimePicker}>
            <Text style={styles.inputLabel}>Time :</Text>
            <TextInput
              style={styles.input}
              value={time}
              editable={false}
              pointerEvents="none"
            />
            <Icon name="time-outline" size={20} color="#777" />
          </TouchableOpacity>

          {/* Date Picker */}
          <TouchableOpacity style={styles.inputContainer} onPress={showDatePicker}>
            <Text style={styles.inputLabel}>Date :</Text>
            <TextInput
              style={styles.input}
              value={date}
              editable={false}
              pointerEvents="none"
            />
            <Icon name="calendar-outline" size={20} color="#777" />
          </TouchableOpacity>

          {/* Pickers */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
          />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmTime}
            onCancel={hideTimePicker}
          />

          

          {/* Confirm button */}
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
            <Text style={styles.confirmButtonText}>Confirm ✓</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 20,
    color: '#777',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    color: '#555',
  },
  tableSizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tableSizeButton: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableSizeButtonSelected: {
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  tableIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    backgroundColor: '#fef3c7',
    borderRadius: 50,
    marginBottom: 4,
  },
  tableIconText: {
    fontSize: 14,
  },
  tableSizeText: {
    fontSize: 12,
  },
  floorSelectorContainer: {
    marginBottom: 15,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  floorSelectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  floorSelectorTitle: {
    fontWeight: '500',
  },
  floorToggleContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  floorToggleButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  floorToggleButtonSelected: {
    backgroundColor: '#dbeafe',
  },
  floorToggleText: {
    fontSize: 14,
  },
  floorLayout: {
    backgroundColor: '#eee',
    height: 256,
    borderRadius: 8,
    marginBottom: 15,
    position: 'relative',
  },
  tableButton: {
    position: 'absolute',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  tableButtonSelected: {
    backgroundColor: '#3b82f6',
  },
  tableButtonText: {
    color: 'black',
  },
  tableButtonTextSelected: {
    color: 'white',
  },
  furniture: {
    position: 'absolute',
    width: 128,
    height: 16,
    backgroundColor: '#9ca3af',
    borderRadius: 2,
  },
  floorExit: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 16,
    backgroundColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floorExitText: {
    fontSize: 12,
    color: '#4b5563',
    transform: [{ rotate: '90deg' }],
  },
  openingHours: {
    color: 'red',
    fontSize: 12,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'white',
  },
  inputLabel: {
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  noteContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'white',
  },
  noteLabel: {
    marginBottom: 5,
  },
  noteInput: {
    height: 40,
  },
  confirmButton: {
    backgroundColor: '#1d4ed8',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default PlaceScreen;