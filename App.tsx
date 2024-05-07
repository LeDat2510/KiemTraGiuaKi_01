import { View, Text } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { MyContextControllerProvider } from './store'
import { NavigationContainer } from '@react-navigation/native'
import Router from './screen/Router'

const App = () => {
  return (
    <MyContextControllerProvider>
      <NavigationContainer>
        <Router/>
      </NavigationContainer>
    </MyContextControllerProvider>
  )
}

export default App