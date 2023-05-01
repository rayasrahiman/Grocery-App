import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IoniconsIcon from 'react-native-vector-icons/dist/Ionicons';
import FontAwes5Icon from 'react-native-vector-icons/dist/FontAwesome5';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem('user'));
      if (userData?.email === email && userData?.password === password) {
        await AsyncStorage.setItem(
          'user',
          JSON.stringify({
            ...userData,
            isLogin: true,
          }),
        );
        navigation.reset({
          index: 0,
          routes: [{name: 'TabNav'}],
        });
      } else if (userData?.email !== email && userData?.password !== password) {
        alert('Please enter valid credentials');
      } else {
        alert('User not found');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <View style={styles.LogoIcon}>
          <IoniconsIcon name="square" size={80} color={'black'} />
        </View>
        <Text style={styles.titleTxt}>Login</Text>
        <Text style={styles.subtitleTxt}>Welcome back</Text>
        <TouchableOpacity
          onPress={() => alert('Please enter enter email and password')}
          style={styles.fbBtnContainer}>
          <FontAwes5Icon name="facebook" size={16} color={'white'} />
          <Text style={styles.fbBtnTxt}>Login with Facebook</Text>
        </TouchableOpacity>
        <View style={styles.orTxtWrapper}>
          <Text style={styles.txtStyle}>OR</Text>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.sideHeadingContainer}>
            <Text style={styles.txtStyle}>Email</Text>
          </View>
          <TextInput
            onChangeText={txt => setEmail(txt)}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.textInput}
          />
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.passsideHeading}>
            <Text style={styles.txtStyle}>Password</Text>
            <Text style={styles.forgotPass}>Forgot your password?</Text>
          </View>
          <TextInput
            onChangeText={txt => setPassword(txt)}
            secureTextEntry={true}
            autoCapitalize="none"
            style={styles.textInput}
          />
        </View>
        <TouchableOpacity onPress={loginUser} style={styles.loginBtnContainer}>
          <Text style={[styles.fbBtnTxt, {marginLeft: 0}]}>Login</Text>
        </TouchableOpacity>
        <View style={styles.bottomContainer}>
          <Text style={styles.txtStyle}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.forgotPass}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  LogoIcon: {alignItems: 'center'},
  titleTxt: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 20,
  },
  subtitleTxt: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  fbBtnContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#1778f2',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    marginHorizontal: 10,
  },
  fbBtnTxt: {
    color: 'white',
    fontSize: 14,
    marginLeft: 10,
  },
  orTxtWrapper: {
    alignItems: 'center',
    marginVertical: '10%',
  },
  txtStyle: {
    color: 'black',
    fontSize: 14,
  },
  mainContainer: {marginVertical: 10},
  sideHeadingContainer: {
    marginLeft: 10,
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#7e7e7e',
    borderRadius: 3,
    padding: 5,
    width: '95%',
    marginHorizontal: 10,
  },
  passsideHeading: {
    marginHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forgotPass: {
    textDecorationLine: 'underline',
    color: '#7e7e7e',
    fontSize: 14,
  },
  loginBtnContainer: {
    padding: 8,
    backgroundColor: 'black',
    borderRadius: 3,
    alignItems: 'center',
    width: '95%',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#7e7e7e',
    borderWidth: 0.8,
    marginTop: ' 15%',
    padding: 30,
    marginHorizontal: 10,
  },
});
