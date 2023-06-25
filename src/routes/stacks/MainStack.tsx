import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon, useToken } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons"

// Screens
import MainScreen from "../../screens/Home/MainScreen";

const Drawer = createDrawerNavigator();
export default function MainStack() {
    return (
        <Drawer.Navigator initialRouteName="Home"
            screenOptions={(navigation) => ({
                drawerActiveTintColor: "white",
                drawerContentContainerStyle: {
                    backgroundColor: useToken('colors', "muted.900"),
                    flex: 1
                },
                headerLeft: () => (
                    <Icon onPress={() => navigation.navigation.toggleDrawer()}
                        as={FontAwesome5}
                        name="bars"
                        color="coolGray.800"
                        _dark={{
                            color: "white"
                        }}
                        size="lg"
                        ml={2}
                    />
                ),
            })}
        >
            <Drawer.Screen name="Home" component={MainScreen} />
            <Drawer.Screen name="Second" component={MainScreen} />
        </Drawer.Navigator>
    );
}
