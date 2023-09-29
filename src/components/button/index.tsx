import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps, View } from "react-native";

type Props = TouchableOpacityProps & {
    title: string;
    type: 'small' | 'medium' | 'large' | 'submit'

}

    export function Button({title, type, ...rest}: Props) {
        {
            switch (type) {
                case 'large': return (
                <TouchableOpacity activeOpacity={0.5} className="w-64 h-10 bg-red-600 rounded-full justify-center" {...rest}>
                    <Text className="text-[#fff] font-semibold text-center text-base">
                    {title}
                    </Text>
                </TouchableOpacity>
                )
                case 'medium': return (
                <TouchableOpacity activeOpacity={0.5} className="border border-red-600 w-24 h-10 justify-center rounded-full ml-4 mr-56" {...rest}>
                    <Text className="text-[#fff] font-bold text-sm text-center">
                    {title}
                    </Text>
                </TouchableOpacity>
                )
                case 'small': return (
                <TouchableOpacity activeOpacity={0.5} className="border border-red-600 w-24 h-6 justify-center rounded mt-2"  {...rest}>
                    <Text className="text-[#fff] font-normal text-xs text-center">
                    {title}
                    </Text>
                </TouchableOpacity>
                )
                case 'submit': return (
                <TouchableOpacity activeOpacity={0.5} className="w-44 h-10 bg-red-600 rounded-lg justify-center"  {...rest}>
                    <Text className="text-[#fff] font-semibold text-center text-base">
                    {title}
                    </Text>
                </TouchableOpacity>
                )
            }
        }

    }
