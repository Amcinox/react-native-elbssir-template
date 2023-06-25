import { View, StyleSheet } from "react-native";
import Lottie from 'lottie-react-native';
import { ColorMode } from "../context/SettingsContext";

import React from "react";

interface SplashScreenProps {
    colorMode: ColorMode
}

export default function SplashScreen({ colorMode }: SplashScreenProps) {

    return (
        <View style={[styles.container, { backgroundColor: colorMode === "dark" ? "black" : "white" }]}>
            <Lottie
                source={require('../assets/loading.json')}
                style={{
                    width: 200
                }}
                autoPlay
                loop
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "black"
    }
})
