import React from 'react'
import { Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const MainStacks = createNativeStackNavigator();
const MainTabs = createBottomTabNavigator();

// tabs
import User from './tabs/User';
import Search from './tabs/Search';
import Bell from './tabs/Bell';
import Home from './tabs/Home';

const userIcon = require('../../../assets/images/user.png');
const homeIcon = require('../../../assets/images/home.png');
const searchIcon = require('../../../assets/images/search.png');
const bellIcon = require('../../../assets/images/bell.png');

const userIconFocus = require('../../../assets/images/userfocus.png');
const homeIconFocus = require('../../../assets/images/homefocus.png');
const searchIconFocus = require('../../../assets/images/searchfocus.png');
const bellIconFocus = require('../../../assets/images/bellfocus.png');

// stacks
import Detail from './stacks/Detail';
import Payment from './stacks/Payment';
import Personal from './stacks/Personal';
import Settings from './stacks/Settings';
import AllProduct from './stacks/AllProduct';
import Cart from './stacks/Cart';
import EditProfile from './stacks/EditProfile';

const MainTabsNavigation = () => {
    return (
        <MainTabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size }) => {
                    let iconSource;

                    if (route.name === 'Home') {
                        iconSource = focused ? homeIconFocus : homeIcon;
                    } else if (route.name === 'Search') {
                        iconSource = focused ? searchIconFocus : searchIcon;
                    } else if (route.name === 'Bell') {
                        iconSource = focused ? bellIconFocus : bellIcon;
                    } else if (route.name === 'User') {
                        iconSource = focused ? userIconFocus : userIcon;
                    }
                    return <Image source={iconSource} style={{ width: focused ? 20 : size, height: size, tintColor: '#221F1F' }} />;
                },
                headerShown: false,
                tabBarLabelStyle: { display: 'none' },
                tabBarStyle: [{ display: 'flex' }, null]
            })}
        >
            <MainTabs.Screen name="Home" component={Home} />
            <MainTabs.Screen name="Search" component={Search} />
            <MainTabs.Screen name="Bell" component={Bell} />
            <MainTabs.Screen name="User" component={User} />
        </MainTabs.Navigator>
    );
};

const MainStackNavigation = () => {
    return (
        <MainStacks.Navigator screenOptions={{ headerShown: false }}>
            <MainStacks.Screen name="MainTabs" component={MainTabsNavigation} />
            <MainStacks.Screen name="AllProduct" component={AllProduct} />
            <MainStacks.Screen name="Cart" component={Cart} />
            <MainStacks.Screen name="EditProfile" component={EditProfile} />
            <MainStacks.Screen name="Detail" component={Detail} />
            <MainStacks.Screen name="Payment" component={Payment} />
            <MainStacks.Screen name="Personal" component={Personal} />
            <MainStacks.Screen name="Settings" component={Settings} />
        </MainStacks.Navigator>
    )
}

export default MainStackNavigation