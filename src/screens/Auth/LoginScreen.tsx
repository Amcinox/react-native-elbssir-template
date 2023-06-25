import { Button, Icon, VStack, Center, Heading } from "native-base";
import React from "react";
import TextField from "../../components/Forms/TextField";
import { useForm } from "react-hook-form";
import { FontAwesome } from "@expo/vector-icons";
import { AuthRules } from "../../rules";

export default function LoginScreen() {
    const { control, handleSubmit, watch } = useForm();
    const [show, setShow] = React.useState(false)

    const handle = (data: any) => {
        console.log({ data })
    }

    return (
        <VStack flex={1} >
            <Center> <Heading>Login</Heading></Center>
            <VStack m={4} space={0} >
                <TextField
                    isRequired
                    label="Username"
                    name="username"
                    control={control}
                    rules={AuthRules.username}
                />
                <TextField
                    HelperText="Password must be at least 8 characters long"
                    label="Password"
                    type={show ? "text" : "password"}
                    InputRightElement={
                        <Icon as={<FontAwesome onPress={() => setShow(!show)} name={show ? "eye" : "eye-slash"} />}
                            size="md" m={2} />}
                    isRequired
                    name="password"
                    control={control}
                    rules={AuthRules.password}

                />
            </VStack>
            <VStack mx={4} >
                <Button onPress={handleSubmit(handle)}>Login</Button>
            </VStack>

        </VStack >
    );
}
