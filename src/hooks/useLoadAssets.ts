import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';


export default function useLoadAssets(): { assetsInitilized: boolean, assetsError: string | null } {
    const [assetsInitilized, setSssetsInitilized] = useState(false)
    // Load Fonts
    const [fontsLoaded, error] = useFonts({
        // Light
        "Poppins-Light": require('../../assets/fonts/Poppins/Poppins-Light.ttf'),
        "Poppins-LightItalic": require('../../assets/fonts/Poppins/Poppins-LightItalic.ttf'),
        // regular 
        "Poppins-Regular": require('../../assets/fonts/Poppins/Poppins-Regular.ttf'),
        "Poppins-Italic": require('../../assets/fonts/Poppins/Poppins-Italic.ttf'),

        //Medium
        "Poppins-Medium": require('../../assets/fonts/Poppins/Poppins-Medium.ttf'),
        "Poppins-MediumItalic": require('../../assets/fonts/Poppins/Poppins-MediumItalic.ttf'),
        // Bold 
        "Poppins-Bold": require('../../assets/fonts/Poppins/Poppins-Bold.ttf'),
        "Poppins-BoldItalic": require('../../assets/fonts/Poppins/Poppins-BoldItalic.ttf'),
    });

    useEffect(() => {
        if (fontsLoaded) {
            setSssetsInitilized(true)
        }
    }, [fontsLoaded])

    return {
        assetsInitilized,
        assetsError: error?.message || null
    }
}
