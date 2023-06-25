import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import LoginScreen from "../../screens/Auth/LoginScreen"
import RegisterScreen from "../../screens/Auth/RegisterScreen";
const Stack = createNativeStackNavigator();


export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
}
