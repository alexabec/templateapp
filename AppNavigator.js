import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

import SellerScreen from './screens/SellerScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import EditInfoSellerScreen from './screens/EditInfoSellerScreen';
import OrdersScreen from './screens/OrdersScreen';
import EditShopScreen from './screens/EditShopScreen';
import EditShopInfoScreen from './screens/EditShopInfoScreen';
import AddItemScreen from './screens/AddItemScreen';
import AddFeaturedScreen from './screens/AddFeaturedScreen';
import EditItemScreen from './screens/EditItemScreen';
import CustomerSignUpScreen from './screens/CustomerSignUpScreen';
import Login from './screens/Login';


const SellerStack = createStackNavigator({
    Seller: {
        screen: SellerScreen,
        navigationOptions: () => ({
            headerShown: false,
            gestureEnabled: false,
        }),
    },
    OrderDetails: {
        screen: OrderDetailsScreen,
        navigationOptions: () => ({
            headerShown: false,
            gestureEnabled: false,
        }),
    },
    EditSeller: {
        screen: EditInfoSellerScreen,
        navigationOptions: () => ({
            headerShown: false,
            gestureEnabled: false,
            unmountInactiveRoutes: true,
        }),
    },

});

const OrdersStack = createStackNavigator({
    Orders: {
        screen: OrdersScreen,
        navigationOptions: () => ({
            headerShown: false,
            gestureEnabled: false,
        }),
    },
    OrderDetails: {
        screen: OrderDetailsScreen,
        navigationOptions: () => ({
            headerShown: false,
            gestureEnabled: false,
        }),
    },
});

const ShopEditStack = createStackNavigator({
    EditShop: {
        screen: EditShopScreen,
        navigationOptions: () => ({
            headerShown: false,
            gestureEnabled: false,
        }),
    },
    EditShopInfo: {
        screen: EditShopInfoScreen,
        navigationOptions: () => ({
            headerShown: false,
            gestureEnabled: false,
        }),
    },
    AddFeatured: {
        screen: AddFeaturedScreen,
        navigationOptions: () => ({
            headerShown: false,
            gestureEnabled: false,
        }),
    },
    AddItem: {
        screen: AddItemScreen,
        navigationOptions: () => ({
            headerShown: false,
            gestureEnabled: false,
        }),
    },
    EditItem: {
        screen: EditItemScreen,
        navigationOptions: () => ({
            headerShown: false,
            gestureEnabled: false,
        }),
    },
});

const BusinessTabNavigator = createBottomTabNavigator({
    Shop: {
        screen: ShopEditStack,
        navigationOptions: {
            tabBarLabel: 'Shop',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-pricetags" color={tintColor} size={20} />
            )
        }
    },
    Account: {
        screen: SellerStack,    
        navigationOptions: {
            tabBarLabel: 'Account',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-person" color={tintColor} size={20} />
            )
        }
    },
    Orders: {
        screen: OrdersStack,
        navigationOptions: {
            tabBarLabel: 'Orders',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-list" color={tintColor} size={20} />
            )
        }
    },
},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarOptions: {
                activeTintColor: '#bab9b6',
                inactiveTintColor: '#616161',
                style: {
                    backgroundColor: '#000',
                }
            },
        })
    }
);

const AppNavigator = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: () => ({
                headerShown: false,
                gestureEnabled: false,
            }),
        },
        Sellers: {
            screen: BusinessTabNavigator,
            navigationOptions:() => ({
                headerShown: false,
                gestureEnabled: false
            })
        },
        SignUp: {
            screen: CustomerSignUpScreen,
            navigationOptions: () => ({
                headerShown: false,
                gestureEnabled: false,
            }),
        },
        initialRouteName: 'Login',
    });

const Application = createAppContainer(AppNavigator);

export default Application;