import { Alert, Image, View } from 'react-native'
import React, { useState } from 'react'
import { Button, HelperText, Text, TextInput } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

const Register = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const hasErrorName = () => name == ""
    const hasErrorEmail = () => !email.includes('@') 
    const hasErrorPass = () => password.length < 6
    const hasErrorPassConfirm = () => passwordConfirm != password || passwordConfirm.length < 6

    const USERS = firestore().collection("USERS")

    const handleCreateAccount = () => {
        auth().createUserWithEmailAndPassword(email, password)
            .then(response => {
                USERS.doc(email)
                    .set({
                        fullName: name,
                        email,
                        password,
                    })
                navigation.navigate("Login")
            })
            .catch(e => Alert.alert('Tài khoản đã tồn tại'))
    }

    const isDisabled =
        hasErrorName() ||
        hasErrorEmail() ||
        hasErrorPass() ||
        hasErrorPassConfirm();

    return (
        <View style={{ paddingTop: 30, justifyContent: 'center', alignContent: 'center' }}>
            <Image style={{ width: 150, height: 150, alignSelf: 'center' }} source={{ uri: 'https://miro.medium.com/max/600/1*R4c8lHBHuH5qyqOtZb3h-w.png' }}></Image>
            <TextInput label={'Full Name'} value={name} onChangeText={setName}
                style={{ margin: 10 }}
                mode='outlined'
            />
            <HelperText type='error' visible={hasErrorName()}>
                Sai name
            </HelperText>
            <TextInput label={'Email'} placeholder='email' value={email} onChangeText={setEmail}
                style={{ margin: 10 }}
                mode='outlined'
            />
            <HelperText type='error' visible={hasErrorEmail()}>
                Sai mail
            </HelperText>
            <TextInput label={'Password'} placeholder='password' value={password} onChangeText={setPassword}
                secureTextEntry={showPassword}
                style={{ margin: 10 }}
                right={<TextInput.Icon icon={showPassword ? "eye" : "eye-off"} onPress={() => setShowPassword(!showPassword)} />}
                mode='outlined'
            />
            <HelperText type='error' visible={hasErrorPass()}>
                Sai PassWord
            </HelperText>
            <TextInput label={"Confirm Password"} placeholder='password' value={passwordConfirm} onChangeText={setPasswordConfirm}
                secureTextEntry={showPasswordConfirm}
                style={{ margin: 10 }}
                right={<TextInput.Icon icon={showPasswordConfirm ? "eye" : "eye-off"} onPress={() => setShowPasswordConfirm(!showPasswordConfirm)} />}
                mode='outlined'
            />
            <HelperText type='error' visible={hasErrorPassConfirm()}>
                Sai PassWord
            </HelperText>
            <Button mode='contained-tonal' buttonColor='#3c7be8' textColor='#ffffff' onPress={() => handleCreateAccount()}
                style={{
                    margin: 10,
                    padding: 5
                }}
                labelStyle={{
                    fontSize: 20
                }}
                disabled={isDisabled}
            >
                Đăng ký
            </Button>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text>Already got an account ?</Text>
                <Button textColor='#3c7be8' onPress={() => navigation.navigate('Login')}>
                    Login
                </Button>
            </View>
        </View>
    )
}

export default Register