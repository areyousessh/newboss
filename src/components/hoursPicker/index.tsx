import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type Props = {
    time: string;
    selected: boolean;
    onSelect: (time: string) => void;
}

export function HoursPicker({time, selected, onSelect}: Props) {
    function HandlePress() {
        onSelect(time)
    }
    return (
        <TouchableOpacity activeOpacity={0.7} className={`border-2 mr-2 rounded-lg w-24 h-16 ${selected === false ? 'border-red-700' : 'border-[#fff]'}`} onPress={HandlePress}>
            <Text className="font-bold text-[#fff] text-2xl text-center mt-4">{time}</Text>
        </TouchableOpacity>
    )
}