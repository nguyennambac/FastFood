import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Login';
import Register from './Register';

const AuthenStack = createNativeStackNavigator();

const AuthenStackNavigation = () => {
  return (
    <AuthenStack.Navigator screenOptions={{headerShown: false}}>
        <AuthenStack.Screen name="Login" component={Login} />
        <AuthenStack.Screen name="Register" component={Register} />
    </AuthenStack.Navigator>
  )
}

export default AuthenStackNavigation