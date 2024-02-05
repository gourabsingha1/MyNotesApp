import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RootNavigationProps } from '../AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../../styles';
import Loader from '../components/Loader';

interface MyProps {
    navigation: NativeStackNavigationProp<RootNavigationProps, 'Signup'>
}

const Signup = ({ navigation }: MyProps) => {
    const [name, setName] = useState<string>('')
    const [badName, setBadName] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [badEmail, setBadEmail] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [badPassword, setBadPassword] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const validate = () => {
        let valid = true
        if (name == '') {
            setBadName(true)
            valid = false
        }
        else {
            setBadName(false)
        }
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

    const signup = async () => {
        setLoading(true)

        const headers = new Headers()
        headers.append("Content-Type", "application/json")
        const body = { name: name, email: email, password: password }
        const res = await fetch(
            'https://( SIGNUP API URL )',
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
            <Text style={styles.heading}>Create New Account</Text>

            <TextInput
                placeholder='Enter Name'
                style={styles.input}
                value={name}
                onChangeText={text => setName(text)} />
                
            {badName && <Text style={styles.errorText} >Enter Name</Text>}

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
                        signup()
                    }
                    else {

                    }
                }}>
                    
                <Text style={styles.textBtn}>
                    Signup
                </Text>
            </TouchableOpacity>
            
            <Loader visible = {loading}/>
        </View>
    )
}

export default Signup