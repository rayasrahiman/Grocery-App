import React, {useState} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import InputText from '../components/InputText';

export default function AddGroceryScreen({navigation}) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();

  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Quantity should be 3 or more!',
    });
  };

  const onSubmit = async () => {
    try {
      const checkArr = await AsyncStorage.getItem('enteredGrocery');
      const checkOutput = JSON.parse(checkArr);
      if (quantity < 3) {
        showToast();
      } else {
        if (checkOutput?.length >= 0) {
          let arr = [
            {
              id: Math.random().toString(),
              name: name,
              quantity: quantity,
              price: price,
            },
            ...checkOutput,
          ];
          const output = JSON.stringify(arr);
          await AsyncStorage.setItem('enteredGrocery', output);
          navigation.navigate('Dashboard');
        } else {
          let arr = [
            {
              id: Math.random().toString(),
              name: name,
              quantity: quantity,
              price: price,
            },
          ];
          const output = JSON.stringify(arr);
          await AsyncStorage.setItem('enteredGrocery', output);
          navigation.navigate('Dashboard');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <InputText
        Label1="Name"
        onChangeText1={txt => setName(txt)}
        Label2="Quantity"
        onChangeText2={txt => setQuantity(txt)}
        Label3="Price"
        onChangeText3={txt => setPrice(txt)}
        submit="submit"
        onPress={onSubmit}
      />
    </View>
  );
}
