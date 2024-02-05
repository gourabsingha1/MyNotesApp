import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Splash from './screens/Splash';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddNotes from './screens/AddNotes';

export type RootNavigationProps = {
    Splash: undefined;
    Login: undefined;
    Signup: undefined;
    Home: undefined;
    AddNotes: undefined;
}

const Stack = createNativeStackNavigator<RootNavigationProps>()

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                
                <Stack.Screen
                    name="Splash"
                    component={Splash}
                    options={
                        { headerShown: false }} />

                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={
                        { headerShown: false }} />

                <Stack.Screen
                    name="Signup"
                    component={Signup}
                    options={
                        { headerShown: false }} />
                
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={
                        { headerShown: false }} />
                
                <Stack.Screen
                    name="AddNotes"
                    component={AddNotes}
                    options={
                        { headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator