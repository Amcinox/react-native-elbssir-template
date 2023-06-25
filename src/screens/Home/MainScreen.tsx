import { Text, Center, Divider, Heading } from "native-base";
import React from "react";
import useSettings from "../../hooks/useSettings";
import useAuth from "../../hooks/useAuth";

export default function MainScreen() {
    const { colorMode, language, settingsInitilized, walkThrough, biometry, SecureStoreAvailable } = useSettings()
    const { isAuthenticated, isEnrolledBiometric, user } = useAuth()
    return (
        <Center>
            <Heading>Settings</Heading>
            <Text>Color Mode : {colorMode}</Text>
            <Text>Language: {language}</Text>
            <Text>is Completed: {JSON.stringify(settingsInitilized)}</Text>
            <Text>walkThrough : {JSON.stringify(walkThrough)}</Text>
            <Divider color="red.200" my={2} />
            <Heading>Device</Heading>
            <Text>Biometry Type : {biometry?.type}</Text>
            <Text>has Biometry Hardware : {JSON.stringify(biometry?.hasHardware)}</Text>
            <Text>Secure Store Available : {JSON.stringify(SecureStoreAvailable)}</Text>
            <Text>Error : {JSON.stringify(biometry?.error)}</Text>

            <Divider color="red.200" my={2} />
            <Heading>Auth</Heading>
            <Text>is Authenticated : {JSON.stringify(isAuthenticated)}</Text>
            <Text>is Enrolled Biometric : {JSON.stringify(isEnrolledBiometric)}</Text>
            <Text>User : {JSON.stringify(user)}</Text>

        </Center>
    );
}
