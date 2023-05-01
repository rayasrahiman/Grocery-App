import React, {useState} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import InputText from '../components/InputText';

export default function AddExpensesScreen({navigation}) {
  const [amountSpent, setamountSpent] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = async () => {
    try {
      const checkArr = await AsyncStorage.getItem('enteredTxt');
      const checkOutput = JSON.parse(checkArr);
      if (checkOutput?.length >= 0) {
        let arr = [...checkOutput, {spent: amountSpent, desc: description}];
        const output = JSON.stringify(arr);
        await AsyncStorage.setItem('enteredTxt', output);
        navigation.navigate('Expense');
      } else {
        let arr = [{spent: amountSpent, desc: description}];
        const output = JSON.stringify(arr);
        await AsyncStorage.setItem('enteredTxt', output);
        navigation.navigate('Expense');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <InputText
        Label1="Amount Spent"
        onChangeText1={txt => setamountSpent(txt)}
        Label3="Description"
        onChangeText3={txt => setDescription(txt)}
        submit="submit"
        onPress={onSubmit}
      />
    </View>
  );
}
