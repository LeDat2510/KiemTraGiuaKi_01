import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Icon, TextInput } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'
import { useMyContextController } from '../store'

const Home = ({navigation}) => {
  const [value, setValue] = useState('')
  const [data, setData] = useState([]);
  const JOBS = firestore().collection('JOBS');

  const [controller, dispatch] = useMyContextController()
  const { userLogin } = controller;

  useEffect(() => {
    if (userLogin == null) {
      navigation.navigate("Login")
    }
  }, [userLogin])

  useEffect(() => {
    const getData = () => {
      try {
        JOBS.onSnapshot((snapShot) => {
          const jobs = []
          snapShot.forEach((doc) => {
            const data = doc.data();
            const idjob = doc.id;
            jobs.push({ idjob, ...data })
          })
          setData(jobs);
        })
      } catch (error) {
        console.log(error)
      }
    }
    return getData();
  }, [])

  const addData = async () => {
    const data = {
      Job_name: value
    }
    await JOBS.add(data);
    console.log('Thêm thành công')
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignSelf: 'center', width: '90%', marginTop: 30 }}>
        <TextInput mode='outlined' label='add new entity' value={value} onChangeText={setValue} style={{ flex: 1, fontSize: 18 }} activeOutlineColor='#3c7be8' />
        <Button mode='contained' style={{ borderRadius: 0, marginTop: 6, justifyContent: 'center' }} buttonColor='#3c7be8' textColor='#ffffff' onPress={() => addData()}>Add</Button>
      </View>
      <View style={{ padding: 5, marginTop: 40 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={{ alignSelf: 'center', width: '90%', borderBottomWidth: 1, padding: 10, marginTop: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.Job_name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}

export default Home