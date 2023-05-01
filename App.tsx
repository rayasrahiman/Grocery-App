import React, {useEffect} from 'react';
import {StyleSheet, Text, View, LogBox} from 'react-native';
import Toast from 'react-native-toast-message';

import MainNavigator from './navigation/MainNavigator';

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);
  return (
    <View style={styles.container}>
      <MainNavigator />
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
