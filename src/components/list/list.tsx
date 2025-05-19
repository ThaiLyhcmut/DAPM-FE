import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

interface Category {
  name: string;
  image: string;
}

interface DataProps {
  Data: Category[];
  text: string;
}
const windowWidth = Dimensions.get('window').width-12;
const numColumns = 4;
const itemMargin = 8;
const itemSize = (windowWidth - itemMargin * 2 * numColumns) / numColumns;


const List = ({ Data, text }: DataProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedData = isExpanded ? Data : Data.slice(0, 4);

  const renderItem = ({ item }: { item: Category }) => (
    <View style={styles.categoryItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.categoryName} numberOfLines={2}>
        {item.name}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{text}</Text>
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
          <Text style={styles.viewAll}>{isExpanded ? 'Hide' : 'View All'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={displayedData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        scrollEnabled={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    color: '#ff5a5f',
    fontWeight: '500',
  },
  listContainer: {
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: itemSize,
    marginHorizontal: itemMargin,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#eee',
    marginBottom: 6,
  },
  categoryName: {
    fontSize: 12,
    textAlign: 'center',
    flexWrap: 'wrap',
    maxWidth: 70,
  },
});

export default List;
