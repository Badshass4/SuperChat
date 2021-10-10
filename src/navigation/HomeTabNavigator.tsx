import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import ChatScreen from '../screens/Chat/ChatScreen';
import Header from '../components/Header';

const Tab = createMaterialTopTabNavigator();

import {Text, View} from 'react-native';
function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}
const HomeTabNavigator = () => {
  return (
    <React.Fragment>
      <Header />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontSize: 12},
          // tabBarItemStyle: {width: 100},
          tabBarStyle: {backgroundColor: 'powderblue'},
        }}>
        <Tab.Screen name="Chats" component={ChatScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </React.Fragment>
  );
};

export default HomeTabNavigator;
