import React from "react";
import {TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
    placeholder: string
}

    export function Input({placeholder, ...rest}: Props) {
        return (
            <TextInput autoComplete="off" autoCapitalize="none" className="w-10/12 h-12 border-2 border-red-600 rounded-full justify-center text-center font-bold text-[#fff]" placeholder={placeholder} {...rest} placeholderTextColor="#FFF7"/>
        )
}
