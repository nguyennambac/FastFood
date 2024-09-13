import { StyleSheet, ToastAndroid, Text, View, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform, SafeAreaView } from 'react-native'
import React, { useContext, useState } from 'react'
import { AppContext } from '../AppContext'
import ButtonCom from '../com/ButtonCom'
import AppStyles from '../AppStyles'
import InputCom from '../com/InputCom'
import AxiosInstance from '../helpers/AxiosInstance'
import { useNavigation } from '@react-navigation/native'

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("")
  const navigation = useNavigation();

  const onPressRegister = async () => {
    if (!name || !email || !password || !phone) {
      ToastAndroid.show('Please complete all information', ToastAndroid.SHORT);
      return;
    }

    if (!validateEmail(email)) {
      ToastAndroid.show('Invalid email', ToastAndroid.SHORT);
      return;
    }

    if (!validatePhone(phone)) {
      ToastAndroid.show('invalid phone number', ToastAndroid.SHORT);
      return;
    }

    console.log('onPressRegister');
    const body = {
      email: email,
      password: password,
      name: name
    };
    const result = await AxiosInstance().post('/users/register', body);
    console.log(result);
    if (result.status == true) {
      ToastAndroid.show('Sign Up Success', ToastAndroid.SHORT);
      navigation.navigate('Login');
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };


  const getLabelIPStyle = () => {
    return {
      fontSize: 12,
      fontWeight: '400',
      paddingVertical: 14,
      paddingLeft: 14,
    }
  }

  const touLabel = () => {
    return {
      fontSize: 20,
      fontWeight: '700',
      color: '#FFFFFF',
      textAlign: 'center',
      paddingHorizontal: 83,
      paddingVertical: 10
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.containerKeyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../../assets/images/logo.png')} />
          </View>
          <View style={styles.containerTwo}>
            <Text style={styles.labelWelcome}>
              Register
            </Text>
            <Text style={styles.labelLogin}>
              Create Account
            </Text>

            <View style={styles.touAcc}>
              <InputCom
                placeholder={"Name"}
                onChangeText={text => setName(text)}
                styles={{
                  container: name ? AppStyles.ip : AppStyles.ipError,
                  input: getLabelIPStyle()
                }} />
            </View>

            <View style={styles.touEmail}>
              <InputCom
                placeholder={"E-mail"}
                onChangeText={text => setEmail(text)}
                styles={{
                  container: email ? AppStyles.ip : AppStyles.ipError,
                  input: getLabelIPStyle()
                }} />
            </View>

            <View style={styles.touPhone}>
              <InputCom
                placeholder={"Phone"}
                onChangeText={text => setPhone(text)}
                styles={{
                  container: phone ? AppStyles.ip : AppStyles.ipError,
                  input: getLabelIPStyle()
                }} />
            </View>

            <View style={styles.touPass}>
              <InputCom
                placeholder={"Password"}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
                styles={{
                  container: password ? AppStyles.ip : AppStyles.ipError,
                  input: getLabelIPStyle(),
                }} />
            </View>

            <View style={styles.labelContainer}>
              <Text style={styles.label}>
              To register an account, you agree{' '}
                <Text style={styles.labelHight}>
                  Terms & Conditions
                </Text>{' '}
                and{' '}
                <Text style={styles.labelHight}>
                  Privacy Policy
                </Text>
              </Text>
            </View>


            <ButtonCom
              title={'Register'}
              onpress={onPressRegister}
              styles={{
                tou: AppStyles.tou,
                touLabel: touLabel()
              }}
            />

            <View style={styles.containerOr}>
              <Text style={styles.or}>
              </Text>
              <Text style={styles.labelOr}>Or</Text>
              <Text style={styles.or}>
              </Text>
            </View>

            <View style={styles.bbwithfb}>
              <TouchableOpacity>
                <Image
                  style={styles.ggIcon}
                  source={require('../../../assets/images/gg.png')} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={styles.fbIcon}
                  source={require('../../../assets/images/fb.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.endLogin}>
            <Text style={styles.question}>
            Do you already have an account?
            </Text>
            <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
              <Text style={styles.createAcc}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    paddingTop: 20
  },

  labelContainer: {
    marginTop: 7,
    marginBottom: 20,
    paddingHorizontal: 10
  },

  labelHight: {
    color: '#FE724C',
    paddingRight: 5,
  },

  label: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },

  touEmail: {
    marginTop: 10
  },

  touPhone: {
    marginTop: 10
  },

  imageBack: {
    marginLeft: 20,
    marginTop: 36
  },

  endLogin: {
    flexDirection: 'row',
    justifyContent: 'center'
  },

  question: {
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 30,
  },

  createAcc: {
    fontSize: 12,
    fontWeight: '400',
    color: '#FE724C',
    marginLeft: 7
  },

  ggIcon: {
    marginRight: 15
  },

  fbIcon: {
    marginLeft: 15
  },

  bbwithfb: {
    marginTop: 35,
    flexDirection: 'row',
    marginBottom: 29
  },

  containerOr: {
    flexDirection: 'row',
  },

  labelOr: {
    paddingHorizontal: 9,
    fontSize: 12,
    fontWeight: '500',
    color: '#000000',
    paddingTop: 20
  },

  or: {
    width: 120,
    borderBottomWidth: 1,
    borderBottomColor: '#FE724C',
    paddingTop: 0
  },

  rememIcon: {
    marginRight: 5
  },

  labelForgot: {
    marginTop: 3,
    fontSize: 11,
    fontWeight: '500',
    color: '#009245'
  },

  labelRemem: {
    marginTop: 3,
    fontSize: 11,
    fontWeight: '500',
    color: '#949090'
  },

  rememContainer: {
    flexDirection: 'row',
    marginBottom: 25
  },

  remem: {
    flexDirection: 'row',
    marginRight: 115
  },

  labelWelcome: {
    fontSize: 30,
    fontWeight: '700'
  },

  labelLogin: {
    fontSize: 18,
    fontWeight: '400'
  },

  touAcc: {
    marginTop: 20
  },

  touPass: {
    position: 'relative',
    marginTop: 10,
    marginBottom: 13
  },

  iceye: {
    position: 'absolute',
    top: 11,
    right: 10
  },

  container: {
    width: '100%',
    height: '100%'
  },

  containerTwo: {
    paddingHorizontal: 30,
    paddingTop: 4,
    alignItems: 'center'
  },

  image: {
    width: 120,
    height: 120
  },
})