import React from 'react';
import { TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import Dashboard from '~/pages/Dashboard';
import DeliveryDetails from '~/pages/Delivery/Details';
import ReportProblem from '~/pages/Delivery/ReportProblem';
import ListProblem from '~/pages/Delivery/ListProblem';
import Confirm from '~/pages/Delivery/Confirm';
import Profile from '~/pages/Profile';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

function DeliveryStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: false,
        headerTintColor: '#000',

        headerLeftContainerStyle: {
          marginLeft: 20,
        },
      }}
    >
      <Stack.Screen
        name="Delivery"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeliveryDetails"
        component={DeliveryDetails}
        options={{
          headerTitle: 'Detalhes do pedido',
          headerStyle: {
            backgroundColor: '#7D40E7',
            elevation: 0,
            shadowColor: 'transparent',
          },
          headerTintColor: '#000',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Delivery')}>
              <Icon name="keyboard-arrow-left" size={28} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ReportProblem"
        component={ReportProblem}
        options={{
          headerTitle: 'Informar problema',
          headerStyle: {
            backgroundColor: '#7D40E7',
            elevation: 0,
            shadowColor: 'transparent',
          },
          headerTintColor: '#000',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('DeliveryDetails')}
            >
              <Icon name="keyboard-arrow-left" size={28} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ListProblem"
        component={ListProblem}
        options={{
          headerTitle: 'Listar problemas',
          headerStyle: {
            backgroundColor: '#7D40E7',
            elevation: 0,
            shadowColor: 'transparent',
          },
          headerTintColor: '#000',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('DeliveryDetails')}
            >
              <Icon name="keyboard-arrow-left" size={28} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Confirm"
        component={Confirm}
        options={{
          headerTitle: 'Confirmar entrega',
          headerStyle: {
            backgroundColor: '#7D40E7',
            elevation: 0,
            shadowColor: 'transparent',
          },
          headerTintColor: '#000',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('DeliveryDetails')}
            >
              <Icon name="keyboard-arrow-left" size={28} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default function createRouter(isSigned = false) {
  return !isSigned ? (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  ) : (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: '#7D40E7',
        inactiveTintColor: '#999999',
        style: {
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          paddingTop: 3,
        },
        labelStyle: {
          fontSize: 14,
          paddingTop: 3,
        },
        keyboardHidesTabBar: true,
      }}
    >
      <Tabs.Screen
        name="Dashboard"
        component={DeliveryStack}
        options={{
          tabBarLabel: 'Entregas',
          tabBarIcon: ({ color }) => (
            <Icon name="menu" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Meu Perfil',
          tabBarIcon: ({ color }) => (
            <Icon name="person" size={30} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
