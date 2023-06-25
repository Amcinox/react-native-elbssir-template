import React from "react";
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import FirewallScreen from "../../screens/middleware/FirewallScreen";



const Stack = createNativeStackNavigator();




export default function MiddlewareStack({ steps }: any) {


    // can be used later for other screen but for now only Firewall
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}
            initialRouteName="Firewall">
            <Stack.Screen name="Firewall">
                {() => <FirewallScreen steps={steps} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}