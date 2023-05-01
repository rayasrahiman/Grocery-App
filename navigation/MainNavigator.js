import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignupScreen from '../screens/Authentication/SignupScreen';
import LoginScreen from '../screens/Authentication/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ExpenseScreen from '../screens/ExpenseScreen';
import Settings from '../components/Settings';
import AddGroceryScreen from '../screens/AddGroceryScreen';
import AddExpensesScreen from '../screens/AddExpensesScreen';
import EditGroceryScreen from '../screens/EditGroceryScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#333545',
        },
      }}>
      <Tab.Screen
        options={{
          headerTitle: () => (
            <View>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                Dashboard
              </Text>
            </View>
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AddGrocery', {str: 'Grocery'})
                }
                style={{
                  marginRight: 10,
                  backgroundColor: '#ffffff',
                  borderRadius: 6,
                  padding: 5,
                  alignItems: 'center',
                }}>
                <Text style={{color: '#000000', fontSize: 16}}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AddExpenses', {str: 'Expenses'})
                }
                style={{
                  marginRight: 10,
                  backgroundColor: '#ffffff',
                  borderRadius: 6,
                  padding: 5,
                  alignItems: 'center',
                }}>
                <Text style={{color: '#000000', fontSize: 16}}>
                  Add Expense
                </Text>
              </TouchableOpacity>
              <Settings />
            </View>
          ),
          tabBarLabel: tabInfo => (
            <View>
              <Text
                style={{
                  color: tabInfo.focused ? '#000000' : '#7e7e7e',
                  fontSize: 12,
                }}>
                Home
              </Text>
            </View>
          ),

          tabBarIcon: tabInfo => {
            return (
              <MaterialIcon
                name="dashboard"
                size={24}
                color={tabInfo.focused ? '#000000' : '#7e7e7e'}
              />
            );
          },
        }}
        name="Dashboard"
        component={DashboardScreen}
      />
      <Tab.Screen
        options={{
          headerTitle: () => (
            <View>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                Expenses
              </Text>
            </View>
          ),
          tabBarLabel: tabInfo => (
            <View>
              <Text
                style={{
                  color: tabInfo.focused ? '#000000' : '#7e7e7e',
                  fontSize: 12,
                }}>
                Expenses
              </Text>
            </View>
          ),

          tabBarIcon: tabInfo => {
            return (
              <MaterialIcon
                name="event"
                size={24}
                color={tabInfo.focused ? '#000000' : '#7e7e7e'}
              />
            );
          },
        }}
        name="Expense"
        component={ExpenseScreen}
      />
    </Tab.Navigator>
  );
};

export default function MainNavigator() {
  const [get, setGet] = useState(false);
  const [check, setCheck] = useState(false);

  const getUser = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem('user'));
      if (userData !== null) {
        setGet(userData.isLogin);
        setCheck(true);
      } else {
        setCheck(true);
      }
    } catch (error) {
      console.log(error);
      setCheck(true);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return check ? (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={get ? 'TabNav' : 'Login'}>
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: '#333545',
            },
            headerTitle: () => (
              <View>
                <Text
                  style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                  Signup
                </Text>
              </View>
            ),
            headerBackVisible: false,
          }}
          name="Signup"
          component={SignupScreen}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: '#333545',
            },
            headerTitle: () => (
              <View>
                <Text
                  style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                  Login
                </Text>
              </View>
            ),
            headerBackVisible: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="TabNav"
          component={TabNavigator}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="AddGrocery"
          component={AddGroceryScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="AddExpenses"
          component={AddExpensesScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="EditGrocery"
          component={EditGroceryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={30} color="#000000" />
    </View>
  );
}
