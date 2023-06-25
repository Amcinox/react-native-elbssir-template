import { View, useColorMode, Text, useDisclose, Box, Stagger, IconButton, HStack, Icon, Button, Center } from "native-base"
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React from "react";
import useSettings from "../hooks/useSettings";
import useAuth from "../hooks/useAuth";

export default function DevBadge() {
    const { isOpen, onToggle } = useDisclose();
    const { colorMode, toggleColorMode } = useColorMode();
    const { updateTheme } = useSettings();
    const { login, isAuthenticated, logout, resetAuthState } = useAuth()



    const changeThemeHandler = () => {
        updateTheme(colorMode === "dark" ? "light" : "dark")
        toggleColorMode()
    }

    const authHandler = () => {
        isAuthenticated ? logout() : login()
    }

    const clearCache = () => {
        // clear async storage
        AsyncStorage.clear()
        resetAuthState()



    }




    return (
        <>
            {__DEV__ && (
                <>
                    <Button
                        onPress={onToggle}
                        position="absolute"
                        top={15}
                        right={-15}
                        bgColor="error.500"
                        paddingX={0}
                        paddingY={0}
                        // borderBottomLeftRadius={10}
                        // borderBottomRightRadius={10}
                        padding={1}
                        zIndex={1}
                        style={{
                            transform: [{ rotate: '45deg' }],
                        }} >


                        <Text color="white" bold >Dev Mode</Text>
                    </Button>
                    {isOpen &&
                        <Center right={5} bottom={5} position='absolute' zIndex={2}>
                            <Box alignItems="center" minH="220">
                                <Stagger visible={isOpen} initial={{
                                    opacity: 0,
                                    scale: 0,
                                    translateY: 34
                                }} animate={{
                                    translateY: 0,
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        type: "spring",
                                        mass: 0.8,
                                        stagger: {
                                            offset: 30,
                                            reverse: true
                                        }
                                    }
                                }} exit={{
                                    translateY: 34,
                                    scale: 0.5,
                                    opacity: 0,
                                    transition: {
                                        duration: 100,
                                        stagger: {
                                            offset: 30,
                                            reverse: true
                                        }
                                    }
                                }}>
                                    <IconButton
                                        onPress={changeThemeHandler}
                                        mb="4" variant="solid"
                                        colorScheme={colorMode === "dark" ? "dark" : "light"} borderRadius="full"
                                        icon={<Icon as={MaterialCommunityIcons}
                                            size="6" name="theme-light-dark"
                                            _dark={{
                                                color: "black"
                                            }} color="white" />}
                                    />
                                    <IconButton onPress={authHandler} mb="4" variant="solid" colorScheme={isAuthenticated ? "error" : "success"} borderRadius="full" icon={<Icon as={MaterialCommunityIcons} size="6" name={isAuthenticated ? "logout" : "login"} />} />
                                    <IconButton
                                        onPress={clearCache}
                                        mb="4" variant="solid"
                                        colorScheme="indigo"
                                        borderRadius="full"
                                        icon={
                                            <Icon as={MaterialCommunityIcons}
                                                size="6" name="broom"
                                            />}
                                    />
                                </Stagger>
                            </Box>
                        </Center>}
                </>
            )}
        </>
    );
}
