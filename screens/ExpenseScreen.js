import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

export default function ExpenseScreen({route}) {
  const [listItem, setListItem] = useState([]);
  const isFocused = useIsFocused();

  const getItem = async () => {
    try {
      const data = await AsyncStorage.getItem('enteredTxt');
      const output = JSON.parse(data);
      setListItem(output);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getItem();
  }, [isFocused]);

  return (
    <View>
      {listItem === [] ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={30} color="#000000" />
        </View>
      ) : (
        <FlatList
          data={listItem}
          keyExtractor={(item, index) => index}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '60%',
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: '#000000',
                }}>
                No Expense
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: '#7e7e7e',
                }}>
                Please Add
              </Text>
            </View>
          )}
          renderItem={({item}) => {
            return (
              <View
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
                  Amount Spent: {item.spent}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    letterSpacing: 0.4,
                    fontSize: 16,
                    color: '#000000',
                  }}>
                  Description: {item.desc}
                </Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}
