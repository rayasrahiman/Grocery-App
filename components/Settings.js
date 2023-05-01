import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Popover, {PopoverPlacement} from 'react-native-popover-view';
import IoniconIcon from 'react-native-vector-icons/dist/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
import OctIcon from 'react-native-vector-icons/dist/Octicons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings() {
  const navigation = useNavigation();

  const logout = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem('user'));
      if (userData !== null) {
        await AsyncStorage.setItem(
          'user',
          JSON.stringify({
            ...userData,
            isLogin: false,
          }),
        );
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Popover
      popoverStyle={styles.popover}
      placement={PopoverPlacement.BOTTOM}
      from={
        <TouchableOpacity
          style={{
            marginRight: 10,
            backgroundColor: '#ffffff',
            borderRadius: 6,
            padding: 5,
            alignItems: 'center',
          }}>
          <IoniconIcon name="settings" size={24} color="#000000" />
        </TouchableOpacity>
      }>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <IoniconIcon
            name="ios-notifications"
            size={20}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.title}>Notifications</Text>
        </View>
        <EntypoIcon
          name="chevron-down"
          size={20}
          color="#cacaca"
          style={styles.commonIcon}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <IoniconIcon
            name="language"
            size={20}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.title}>English</Text>
        </View>
        <EntypoIcon
          name="chevron-down"
          size={20}
          color="#cacaca"
          style={styles.commonIcon}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <FontAwesomeIcon
            name="inr"
            size={20}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.title}>Indian Rupees</Text>
        </View>
        <EntypoIcon
          name="chevron-down"
          size={20}
          color="#cacaca"
          style={styles.commonIcon}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <OctIcon name="stack" size={20} color="black" style={styles.icon} />
          <Text style={styles.title}>Theme</Text>
        </View>
        <EntypoIcon
          name="chevron-down"
          size={20}
          color="#cacaca"
          style={styles.commonIcon}
        />
      </View>
      <View style={styles.borderLine} />
      <TouchableOpacity onPress={logout} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </Popover>
  );
}

const styles = StyleSheet.create({
  popover: {
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    color: 'black',
  },
  commonIcon: {
    padding: 20,
  },
  borderLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#cacaca',
    width: '100%',
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: '#cacaca',
    padding: 5,
    alignItems: 'center',
    width: '90%',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: '#7e7e7e',
  },
});
