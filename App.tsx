import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

import { firebase } from './firebase/config';


type RouteParams = {
  Login: {},
  Register: {},
  Home: {}
}

const Stack = createStackNavigator<RouteParams>();


export default function App() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [user, setUser] = React.useState<firebase.User | null>(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user === null) {
        setLoading(false);
        return;
      }
      setUser(user);
      setLoading(false);
    });
  }, []);

  const loginCallback = (user: firebase.User) => {
    setUser(user);
  }

  const logout = () => {
    firebase.auth().signOut()
    .then(() => {
      setUser(null);
    })
    .catch(err => alert(err));
  }


  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  }

  if (user === null) {
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName={'Login'}>
        <Stack.Screen name='Login' options={{ headerShown: false}}>
          {props => <Login {...props} loginCallback={loginCallback}/>}
        </Stack.Screen>
        <Stack.Screen name='Register' options={{ headerShown: false }}>
              {props => <Register {...props} loginCallback={loginCallback}/>}
            </Stack.Screen>
      </Stack.Navigator>
  </NavigationContainer>
    )
  }

  return (
    <View style={styles.container}>
      <Home logout={logout} user={user}/>
      <StatusBar style='light' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
