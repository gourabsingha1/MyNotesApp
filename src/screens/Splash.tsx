import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { RootNavigationProps } from '../AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../../styles';

interface MyProps {
    navigation: NativeStackNavigationProp<RootNavigationProps, 'Splash'>
}

const Splash = ({navigation}: MyProps) => {
    useEffect(() =>{
        setTimeout(()=>{
            navigation.navigate("Login")
        }, 2000)
    }, [])

    return (
        <View style={styles.containerSplash}>
            <Text style={styles.logo}>My Notes</Text>
        </View>
    )
}

export default Splash