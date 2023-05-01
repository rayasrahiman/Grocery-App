import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useRoute} from '@react-navigation/native';

export default function InputText({
  Label1,
  Label2,
  Label3,
  onChangeText1,
  onChangeText2,
  onChangeText3,
  value1,
  value2,
  value3,
  onPress,
  submit,
}) {
  const route = useRoute();

  const {str} = route.params;

  return (
    <View>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{Label1}</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText1}
        value={value1}
      />
      {str === 'Grocery' ? (
        <View>
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>{Label2}</Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText2}
            value={value2}
          />
        </View>
      ) : null}
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{Label3}</Text>
      </View>
      {str === 'Grocery' ? (
        <TextInput
          editable
          style={[styles.input, {textAlignVertical: 'top'}]}
          onChangeText={onChangeText3}
          value={value3}
        />
      ) : (
        <TextInput
          editable
          multiline
          numberOfLines={4}
          style={[styles.input, {textAlignVertical: 'top'}]}
          onChangeText={onChangeText3}
          value={value3}
        />
      )}
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Text style={styles.buttonText}>{submit}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  labelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  input: {
    margin: 12,
    borderWidth: 0.3,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  buttonContainer: {
    backgroundColor: '#000000',
    borderRadius: 6,
    padding: 10,
    alignItems: 'center',
    width: '95%',
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
