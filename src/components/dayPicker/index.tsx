import React, { useContext } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { AppContext } from "../../context/globalContext";


type Props = {
    dayOfWeek: string
    dayOfMonth: number
    onSelect: (dayOfWeek: string, dayOfMonth: number, isSelected: boolean) => void
}

export function DayPicker({dayOfWeek, dayOfMonth, onSelect}: Props) {
    const {selected, setSelected} = useContext(AppContext)
    const isSelected = selected[dayOfMonth] || false

    function toggleSelected() {
        const newSelectedValue = !isSelected;
        if (newSelectedValue) {
            const deselectedDays = {};
            for (const key in selected) {
                deselectedDays[key] = false
            }
            setSelected(deselectedDays);
        }
        setSelected((prevSelected) => ({
            ...prevSelected,
            [dayOfMonth]: newSelectedValue,
        }));
        onSelect(dayOfWeek, dayOfMonth, newSelectedValue);
    }

    return (
       <View className="flex flex-1 flex-row">
            <TouchableOpacity className={`border-2 mr-2 rounded-lg ${ isSelected === false ? 'border-red-700 w-20' : 'border-[#fff] w-20'}`} 
            onPress={() => {toggleSelected(); onSelect(dayOfWeek, dayOfMonth, isSelected)}} activeOpacity={0.7}>
                <Text className="font-bold text-[#fff] text-2xl text-center mt-4">{dayOfMonth}</Text>
                <Text className="font-bold text-red-700 text-2xl text-center mt-4">{dayOfWeek}</Text>
            </TouchableOpacity>
       </View>
    )
}
