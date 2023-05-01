import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SearchBar from 'react-native-platform-searchbar';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

import {GROCERY} from '../data/dummy-data';
import Filter from '../components/Filter';

export default function DashboardScreen() {
  const [listItem, setListItem] = useState(GROCERY);
  const [search, setSearch] = useState('');
  const [dataSource, setDataSource] = useState(GROCERY);
  const isFocused = useIsFocused();

  const getItem = async () => {
    try {
      const data = await AsyncStorage.getItem('enteredGrocery');
      const output = data ? JSON.parse(data) : [];
      let arr = [...output, ...GROCERY];
      setDataSource(arr);
      setListItem(arr);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getItem();
  }, [isFocused]);

  const searchFilterFunction = text => {
    if (text) {
      const newData = dataSource.filter(function (item) {
        const itemData = item.name ? item.name.toLocaleLowerCase() : '';
        const textData = text.toLocaleLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setListItem(newData);
      setSearch(text);
    } else {
      setListItem(dataSource);
      setSearch(text);
    }
  };

  const sorting = val => {
    let arr = [...listItem];
    if (val === 'HL') {
      const newData = arr.sort((a, b) => b.price - a.price);
      setListItem(newData);
    } else {
      const newData = arr.sort((a, b) => a.price - b.price);
      setListItem(newData);
    }
  };

  const deleteGrocery = id => {
    let arr = [...dataSource];
    let filterArr = arr.filter(item => item.id != id);
    setListItem(filterArr);
    setDataSource(filterArr);
  };

  const rightSwipe = id => {
    return (
      <TouchableOpacity
        onPress={() => deleteGrocery(id)}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000000',
          width: '20%',
          height: 150,
          marginVertical: 10,
        }}>
        <AntIcon name="delete" size={30} color="#ffffff" />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.searchContainer}>
        <Filter onPress={sorting} />
        <SearchBar
          placeholder="Search"
          value={search}
          onChangeText={text => searchFilterFunction(text)}
          inputStyle={{borderRadius: 25, width: '75%'}}
          style={styles.searchBar}
        />
      </View>
      <View>
        <FlatList
          data={listItem}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => {
            return (
              <GestureHandlerRootView>
                <Swipeable renderRightActions={() => rightSwipe(item.id)}>
                  <View
                    // onPress={() =>
                    //   navigation.navigate('EditGrocery', {str: 'EditGrocery'})
                    // }
                    style={{
                      backgroundColor: '#FFFFFF',
                      elevation: 5,
                      padding: 10,
                      borderRadius: 6,
                      width: '95%',
                      height: 150,
                      marginHorizontal: 10,
                      marginVertical: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        letterSpacing: 0.4,
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#000000',
                      }}>
                      Name: {item.name}
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        letterSpacing: 0.4,
                        fontSize: 16,
                        color: '#000000',
                      }}>
                      Quantity: {item.quantity}
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        letterSpacing: 0.4,
                        fontSize: 16,
                        color: '#000000',
                      }}>
                      Price: {item.price}
                    </Text>
                  </View>
                </Swipeable>
              </GestureHandlerRootView>
            );
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  categoriesWrapper: {
    flexDirection: 'row',
    backgroundColor: '#891a28',
    padding: 10,
    borderRadius: 6,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  categoriesIconWrapper: {
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingTop: 2,
  },
  searchContainer: {
    marginTop: 10,
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
  },
  searchBar: {
    width: '85%',
    height: 45,
  },
});
