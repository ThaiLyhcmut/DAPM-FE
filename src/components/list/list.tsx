import { useNavigation } from '@react-navigation/native';
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
import { HomeStackParamList } from '../../../navigate';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
interface Category {
  _id: string
  name: string;
  image: string;
  time: string | null;
  rating: string | null;
  price: string | null;
}

interface DataProps {
  Data: Category[];
  text: string;
  Type?: 'category' | 'food';
}
const windowWidth = Dimensions.get('window').width - 12;
const numColumns = 4;
const itemMargin = 8;
const itemSize = (windowWidth - itemMargin * 2 * numColumns) / numColumns;


const List = ({ Data, text, Type }: DataProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedData = isExpanded ? Data : Data.slice(0, 4);
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const handleDetailPress = (item: Category) => {
    if (Type && Type === 'food' && item.price && item.rating && item.time) {
      navigation.navigate('CategoryDetail', { item: {
        _id: item._id,
        name: item.name,
        image: item.image,
        time: item.time,
        rating: item.rating,
        price: item.price,
      } });
      return;
    } else {
      navigation.navigate('CategoryList', { _id: item._id, category: item.name });
    }

  };

  const renderItem = ({ item }: { item: Category }) => (
    <TouchableOpacity style={styles.categoryItem} onPress={() => handleDetailPress(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.categoryName} numberOfLines={2}>
        {item.name}
      </Text>
    </TouchableOpacity>
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
        keyExtractor={(item, index) => item._id || index.toString()}
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
