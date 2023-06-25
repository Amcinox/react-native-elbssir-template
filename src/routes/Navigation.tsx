import React from "react";
import { NavigationContainer, Theme } from '@react-navigation/native';
// Hooks
import useAuth from "../hooks/useAuth";
// Stacks
import AuthStack from "./stacks/AuthStack";
import MainStack from "./stacks/MainStack";
import useSettings from "../hooks/useSettings";
import { useColorModeValue, useToken } from "native-base";
import MiddlewareStack from "./stacks/MiddlewareStack";

export default function Navigation() {
    const { isAuthenticated } = useAuth()
    const { colorMode, permissions } = useSettings()
    const [middleware, setMiddleware] = React.useState(false)

    const text = useToken('colors', useColorModeValue("black", "white"));
    const card = useToken('colors', useColorModeValue("white", "black"));
    const border = useToken('colors', useColorModeValue("white", "black"));
    const background = useToken('colors', useColorModeValue("white", "black"));

    const DarkTheme: Theme = {
        dark: true,
        colors: {
            primary: 'rgb(10, 132, 255)',
            background,
            card,
            text,
            border,
            notification: 'rgb(255, 69, 58)',
        },
    };
    const DefaultTheme: Theme = {
        dark: false,
        colors: {
            primary: 'rgb(0, 122, 255)',
            background,
            card,
            text,
            border,
            notification: 'rgb(255, 59, 48)',
        },
    };

    const steps = [
        {
            active: !permissions.notifications,
            image: require('../../assets/images/permissions/notification.png'),
            headline: "Enable Notification",
            description: "enable notifications so you don't miss another opportunity",
            action: () => console.log("Notification enabled"),
            actionLabel: "Go to Settings"
        }
    ]




    return (
        <NavigationContainer theme={colorMode === 'dark' ? DarkTheme : DefaultTheme}>
            {isAuthenticated ?
                (
                    middleware ?
                        <MiddlewareStack steps={steps} />
                        :
                        <MainStack />) :

                <AuthStack />
            }
        </NavigationContainer >
    );
}
