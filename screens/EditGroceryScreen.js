import React from 'react';
import {View, Text} from 'react-native';

import InputText from '../components/InputText';

export default function EditGroceryScreen() {
  return (
    <View>
      <InputText Label1="Quantity" Label3="Price" submit="submit" />
    </View>
  );
}
