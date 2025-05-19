// App.js
import React, { useState } from 'react';
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
const PlaceScreen = () => {
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
  const floors: floorI[] = [
    {
      id: 1,
      name: "1st floor",
      tables: [
        { id: 'A1', position: { top: 10, left: 60 }, available: true, member: 2 },
        { id: 'A2', position: { top: 10, left: 180 }, available: true, member: 4 },
        { id: 'A3', position: { top: 10, left: 250 }, available: true, member: 2 },
        { id: 'A4', position: { top: 10, left: 180 }, available: true, member: 8 },
        { id: 'A5', position: { top: 50, left: 120 }, available: true, member: 8 },
        { id: 'A6', position: { top: 50, left: 60 }, available: true, member: 4 },
        { id: 'A7', position: { top: 50, left: 180 }, available: true, member: 6 },
        { id: 'A8', position: { top: 100, left: 60 }, available: true, member: 2 },
        { id: 'A9', position: { top: 100, left: 180 }, available: true, member: 4 },
        { id: 'A10', position: { top: 150, left: 120 }, available: true, member: 10 },
      ]
    },
    {
      id: 2,
      name: "2nd floor",
      tables: [
        { id: 'B1', position: { top: 10, left: 60 }, available: true, member: 2 },
        { id: 'B2', position: { top: 10, left: 180 }, available: true, member: 4 },
        { id: 'B3', position: { top: 50, left: 60 }, available: true, member: 4 },
        { id: 'B4', position: { top: 50, left: 180 }, available: true, member: 2 },
        { id: 'B5', position: { top: 100, left: 120 }, available: true, member: 6 },
        { id: 'B6', position: { top: 100, left: 60 }, available: true, member: 8 },
        { id: 'B7', position: { top: 150, left: 180 }, available: true, member: 4 },
        { id: 'B8', position: { top: 120, left: 120 }, available: true, member: 2 },
        { id: 'B9', position: { top: 150, left: 50 }, available: true, member: 4 },
        { id: 'B10', position: { top: 250, left: 120 }, available: true, member: 10 },
      ]
    }
  ];

  interface floorI {
    id: number,
    name: string,
    tables: any[],
  }
  console.log(selectedFloor)
  const [currentFloor, setCurrentFloor] = useState<floorI | undefined>(floors.find(f => f.id === selectedFloor));


  const handleTableSizeSelection = (size: any) => {
    setSelectedTableSize(size);
  };

  const handleFloorChange = (floorId: any) => {
    setSelectedFloor(floorId);
    setCurrentFloor(floors.find(f => f.id === floorId))
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Place Order</Text>
      </View>

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
                <TouchableOpacity
                  onPress={() => handleFloorChange(1)}
                  style={[
                    styles.floorToggleButton,
                    selectedFloor === 1 && styles.floorToggleButtonSelected
                  ]}
                >
                  <Text style={styles.floorToggleText}>1st floor</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleFloorChange(2)}
                  style={[
                    styles.floorToggleButton,
                    selectedFloor === 2 && styles.floorToggleButtonSelected
                  ]}
                >
                  <Text style={styles.floorToggleText}>2nd floor</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Floor layout */}
          <View style={styles.floorLayout}>
            {currentFloor?.tables.map((table) => table.member === selectedTableSize && (
              <TouchableOpacity
                key={table.id}
                style={[
                  styles.tableButton,
                  { top: table.position.top, left: table.position.left },
                  selectedTable === table.id && styles.tableButtonSelected
                ]}
                onPress={() => handleTableSelection(table.id)}
              >
                <Text
                  style={[
                    styles.tableButtonText,
                    selectedTable === table.id && styles.tableButtonTextSelected
                  ]}
                >
                  {table.id}
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

          {/* Confirm button */}
          <TouchableOpacity style={styles.confirmButton}>
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