import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Popover, {PopoverPlacement} from 'react-native-popover-view';
import IoniconIcon from 'react-native-vector-icons/dist/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';

export default function Filter({onPress}) {
  return (
    <Popover
      popoverStyle={styles.popover}
      placement={PopoverPlacement.BOTTOM}
      from={
        <TouchableOpacity style={styles.iconStyle}>
          <IoniconIcon name="filter" size={24} color="#000000" />
        </TouchableOpacity>
      }>
      <TouchableOpacity onPress={() => onPress('HL')} style={styles.container}>
        <View style={styles.iconContainer}>
          <FontAwesomeIcon
            name="long-arrow-down"
            size={20}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.title}>Price: High to low</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.borderLine} />
      <TouchableOpacity onPress={() => onPress('LH')} style={styles.container}>
        <View style={styles.iconContainer}>
          <FontAwesomeIcon
            name="long-arrow-up"
            size={20}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.title}>Price: Low to High</Text>
        </View>
      </TouchableOpacity>
    </Popover>
  );
}

const styles = StyleSheet.create({
  popover: {
    backgroundColor: 'white',
  },
  iconStyle: {
    marginRight: 10,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    padding: 5,
    alignItems: 'center',
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
  borderLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#cacaca',
    width: '100%',
  },
});
