import { Heading, Text, VStack, Center, Button, useColorMode, View } from "native-base";
import { Image, ImageSourcePropType } from "react-native"
import React from "react";
import useSettings from "../../hooks/useSettings";


export interface Step {
    active: boolean;
    image: ImageSourcePropType;
    headline: string;
    description: string;
    action: () => void;
    actionLabel: string;
}

export default function FirewallScreen({ steps }: { steps: Step[] }) {
    const { updateTheme } = useSettings()
    const { colorMode, toggleColorMode } = useColorMode();

    // filter steps and return only steps with active true
    const filteredSteps = steps.filter((step) => step.active)

    if (filteredSteps.length === 0) {
        return <View></View>
    }


    const changeThemeHandler = () => {
        updateTheme(colorMode === "dark" ? "light" : "dark")
        toggleColorMode()
    }

    return (
        <VStack flex={1} px={10}>
            <VStack flex={1} justifyContent="flex-end">
                <Center>
                    <Image
                        source={filteredSteps[0].image}
                        alt="moka"
                        style={{
                            aspectRatio: 1,
                            height: "90%"
                        }}
                    />
                </Center>
            </VStack>
            <VStack flex={1} >
                <Center flex={1} justifyContent="flex-end">
                    <Heading>{filteredSteps[0].headline}</Heading>
                    <Text
                        textAlign="center"
                        py={4}
                        color="coolGray.300"
                        _dark={{
                            color: "coolGray.300"
                        }}
                        _light={{
                            color: "coolGray.500"
                        }}
                    >{steps[0].description}</Text>
                </Center>

                <VStack flex={1} space={2} justifyContent="center">
                    <Button
                        onPress={filteredSteps[0].action}>
                        <Text
                            color="white"
                            fontWeight="bold"
                        >{filteredSteps[0].actionLabel}</Text>
                    </Button>
                    {__DEV__ && <Button bgColor="secondary.800" onPress={changeThemeHandler}>Color Toggle ( Dev Only )</Button>}
                </VStack>

            </VStack>
        </VStack>
    );
}
