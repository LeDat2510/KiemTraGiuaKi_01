import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import { logout, useMyContextController } from '../store';
import { Button } from 'react-native-paper';

const Stack = createStackNavigator();

export default Router = () => {
    const [controller, dispatch] = useMyContextController();
    const { userLogin } = controller;
    return (
        <Stack.Navigator initialRouteName='Login'
            screenOptions={{
                headerTitleAlign: 'center'
            }}
        >
            <Stack.Screen name='Home' component={Home} options={{
                headerTitle: userLogin ? userLogin.fullName : 'Home',
                headerLeft: null,
                headerTitleAlign: 'left',
                headerRight: () => (<Button mode='contained' style={{marginRight: 10}} buttonColor='#3c7be8' textColor='#ffffff' onPress={() => logout(dispatch)}>Log Out</Button>)
            }} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
        </Stack.Navigator>
    )
}

//const [controller, dispatch] = useMyContextController();
//  const { userLogin } = controller;

