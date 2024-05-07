import { Image, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { login, useMyContextController } from '../store'
import { Button, HelperText, Text, TextInput } from 'react-native-paper'

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const hasErrorEmail = () => !email.includes('@')
    const hasErrorPass = () => password.length < 6 
    const [controller, dispatch] = useMyContextController()
    const { userLogin } = controller;

    useEffect(() => {
        if (userLogin != null) 
        {
            navigation.navigate("Home")
        }
    }, [userLogin])

    const onSubmit = () => {
        login(dispatch, email, password);
    }

    const isDisabled =
    hasErrorEmail() ||
    hasErrorPass() 

    return (
        <View style={{ paddingTop: 30, justifyContent: 'center', alignContent: 'center' }}>
            <Image style={{width: 150, height: 150, alignSelf: 'center'}} source={{uri: 'https://miro.medium.com/max/600/1*R4c8lHBHuH5qyqOtZb3h-w.png'}}></Image>
            <TextInput placeholder='email' value={email} onChangeText={setEmail}
                style={{ margin: 10 }}
                mode='outlined'
            />
            <HelperText type='error' visible={hasErrorEmail()}>
                Sai mail
            </HelperText>
            <TextInput placeholder='password' value={password} onChangeText={setPassword}
                secureTextEntry={showPassword}
                style={{ margin: 10 }}
                right={<TextInput.Icon icon={showPassword ? "eye" : "eye-off"} onPress={() => setShowPassword(!showPassword)} />}
                mode='outlined'
            />
            <HelperText type='error' visible={hasErrorPass()}>
                Sai PassWord
            </HelperText>
            <Button mode='contained-tonal' onPress={onSubmit} buttonColor='#3c7be8' textColor='#ffffff'
                style={{
                    margin: 10,
                    padding: 5
                }}
                labelStyle={{
                    fontSize: 20
                }}
                disabled={isDisabled}
            >
                Đăng nhập
            </Button>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text>Don't have an account ?</Text>
                <Button textColor='#3c7be8' onPress={() => navigation.navigate('Register')}>
                    Sign up
                </Button>
            </View>
        </View>
    )
}

export default Login