import { StyleSheet, ToastAndroid, Text, View, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform, SafeAreaView } from 'react-native'
import React, { useContext, useState } from 'react'
import ButtonCom from '../com/ButtonCom'
import AppStyles from '../AppStyles'
import InputCom from '../com/InputCom'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/UserAPI'

const Login = () => {
  const [remember, setRemember] = useState(false);
  const [ispassword, setIsPassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const isRemember = () => {
    setRemember(!remember);
  }

  const checkStatus = () => {
    setIsPassword(!ispassword)
  }

  const onPressLogin = async () => {
    if (email.trim().length <= 0) {
      ToastAndroid.show("Please enter email", ToastAndroid.SHORT);
      return;
    }
    if (password.trim().length <= 0) {
      ToastAndroid.show("Please enter a password", ToastAndroid.SHORT);
      return;
    }
    try {
      const body = {
        email,
        password
      };
      await dispatch(login(body));
      ToastAndroid.show("Welcome to delicious food!", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Login failed, please try again later!", ToastAndroid.SHORT);
      console.log(error);
    }
  }

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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../../assets/images/logo.png')} />
          </View>
          <View style={styles.containerTwo}>
            <Text style={styles.labelWelcome}>
              Welcome you!
            </Text>
            <Text style={styles.labelLogin}>
              Login with Account
            </Text>

            <View style={styles.touAcc}>
              <InputCom
                placeholder={"Enter email or phone number"}
                onChangeText={text => setEmail(text)}
                styles={{
                  container: email.trim().length <= 0 ? AppStyles.ipError : AppStyles.ip,
                  input: getLabelIPStyle()
                }} />
            </View>

            <View style={styles.touPass}>
              <InputCom
                placeholder={"Password"}
                onChangeText={text => setPassword(text)}
                secureTextEntry={ispassword}
                styles={{
                  container: password.trim().length <= 0 ? AppStyles.ipError : AppStyles.ip,
                  input: getLabelIPStyle(),
                }} />
              <TouchableOpacity onPress={checkStatus}
                style={styles.iceye}
              >
                <Image
                  source={ispassword ? require('../../../assets/images/eyehide.png') : require('../../../assets/images/eye.png')} />
              </TouchableOpacity>
            </View>

            <View style={styles.rememContainer}>
              <TouchableOpacity onPress={isRemember}>
                <View style={styles.remem}>
                  <Image
                    style={styles.rememIcon}
                    source={
                      remember ? require('../../../assets/images/rememberaccclick.png') : require('../../../assets/images/rememberacc.png')
                    } />
                  <Text style={styles.labelRemem}>
                    Remember
                  </Text>
                </View>
              </TouchableOpacity>
              <View>
                <TouchableOpacity>
                  <Text style={styles.labelForgot}>Forgot Password ?</Text>
                </TouchableOpacity>
              </View>
            </View>

            <ButtonCom
              title={'Login'}
              onpress={onPressLogin}
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
            Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.createAcc}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    paddingTop: 20
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
    color: '#FE724C'
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
    marginRight: 125
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
    height: 120,
  },
})