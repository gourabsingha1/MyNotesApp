import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RootNavigationProps } from '../AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../../styles';
import Loader from '../components/Loader';

interface MyProps {
    navigation: NativeStackNavigationProp<RootNavigationProps, 'Login'>
}

const Login = ({ navigation }: MyProps) => {
    const [email, setEmail] = useState<string>('')
    const [badEmail, setBadEmail] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [badPassword, setBadPassword] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const validate = () => {
        let valid = true
        if (email == '') {
            setBadEmail(true)
            valid = false
        }
        else {
            setBadEmail(false)
        }
        if (password == '') {
            setBadPassword(true)
            valid = false
        }
        else {
            setBadPassword(false)
        }
        return valid
    }

    const login = async () => {
        setLoading(true)

        const headers = new Headers()
        headers.append("Content-Type", "application/json")
        const body = { email: email, password: password }
        // CHECK USER EXISTS OR NOT
        const res = await fetch(
            'https://good-puce-xerus-suit.cyclic.app/api/auth/login',
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify(body)
            }
        )
        const data = await res.json()
        console.log(data)
        setLoading(false)
        navigation.navigate('Home', {id: data._id})
    }

    return (
        <View style={styles.containerLogin}>
            <Text style={styles.heading}>Welcome Back</Text>

            <TextInput
                placeholder='Enter Email'
                style={styles.input}
                value={email}
                onChangeText={text => setEmail(text)} />

            {badEmail && <Text style={styles.errorText} >Enter Email</Text>}

            <TextInput
                placeholder='Enter Password'
                style={styles.input}
                value={password}
                onChangeText={text => setPassword(text)} />

            {badPassword && <Text style={styles.errorText} >Enter Password</Text>}

            <TouchableOpacity
                style={styles.btnLogin}
                onPress={() => {
                    if (validate()) {
                        login()
                    }
                    else {

                    }
                }}>

                <Text style={styles.textBtn}>
                    Login
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.btnLogin, { backgroundColor: 'white', borderWidth: 1, borderColor: 'black', marginTop: 20 }]}
                onPress={() => {
                    navigation.navigate('Signup')
                }} >

                <Text style={[styles.textBtn, { color: 'black' }]}>
                    Create Account
                </Text>
            </TouchableOpacity>

            <Loader visible = {loading}/>
            
            <TouchableOpacity
                style={[styles.btnLogin, { backgroundColor: 'white', borderWidth: 1, borderColor: 'black', marginTop: 20 }]}
                onPress={() => {
                    navigation.navigate('Home')
                }} >

                <Text style={[styles.textBtn, { color: 'black' }]}>
                    Go to home screen
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login