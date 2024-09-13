import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigation from './main/MainStackNavigation';
import AuthenStackNavigation from './authen/AuthenStackNavigation';
import { AppContext } from './AppContext';
import Adress from './Adress';

const AppNavigation = () => {
    const appState = useSelector(state => state.app);
    return (
        <NavigationContainer>
            {/* {
                appState.user ? <MainStackNavigation /> :
                    <AuthenStackNavigation />
            } */}
            <Adress/>
        </NavigationContainer>
    )
}

export default AppNavigation

const styles = StyleSheet.create({})