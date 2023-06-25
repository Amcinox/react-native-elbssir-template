import React, { useEffect } from "react";
import { Slide, Alert, Text, View, Box } from "native-base";
import useSettings from "../hooks/useSettings";
import { useTranslation } from "react-i18next";

export default function AccessChecker() {
    const { network } = useSettings()
    const [isOpenTop, setIsOpenTop] = React.useState(true);
    const { t } = useTranslation()

    useEffect(() => {
        if (!network?.isInternetReachable) {
            setIsOpenTop(true)
        }
        // if it's already connected, then close the alert after 1 second
        if (network?.isInternetReachable) {
            setTimeout(() => {
                setIsOpenTop(false)
            }
                , 1000);
        }
    }, [network?.isInternetReachable])

    return (
        <Slide in={isOpenTop} placement="bottom" duration={1000}>
            <Alert flex={1} position="absolute" width="full" bottom={0} justifyContent="center" status={network?.isInternetReachable ? "success" : "error"}>
                <Alert.Icon />
                <Text color={network?.isInternetReachable ? "green.600" : "error.600"} fontWeight="medium">
                    {network?.isInternetReachable ? t("Connected") : t("No Internet Connection")}
                </Text>
            </Alert>
        </Slide>
    );
}
