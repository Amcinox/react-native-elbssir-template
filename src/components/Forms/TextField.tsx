import React from "react";
import { FormControl, Input, WarningOutlineIcon, IInputProps } from "native-base";
import { useController, useForm } from "react-hook-form";
import { Rules } from "../../types";


interface TextFieldProps extends IInputProps {
    name: string;
    control: ReturnType<typeof useForm>["control"];
    defaultValue?: string;
    HelperText?: string;
    rules?: Rules;
    label?: string;
    isRequired?: boolean;
    isReadOnly?: boolean;

}

export default function TextField(props: TextFieldProps) {
    const { name, control, defaultValue, HelperText, rules, label, isRequired, isReadOnly } = props
    const { field, fieldState } = useController({
        name,
        control,
        defaultValue,
        rules
    })

    return (
        <FormControl mb={2} isReadOnly={isReadOnly} isRequired={isRequired} isInvalid={fieldState.invalid}>
            {label && <FormControl.Label>{label}</FormControl.Label>}
            <Input  {...props} value={field.value} onChangeText={field.onChange} />
            {HelperText && <FormControl.HelperText>
                {HelperText}
            </FormControl.HelperText>}
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                {fieldState.error?.message}
            </FormControl.ErrorMessage>
        </FormControl>
    );
}
