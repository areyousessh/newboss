import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { AntDesign } from '@expo/vector-icons'

export type ScheduleProps = {
    id?: string
    name: string
    cellphone: string
    schedule: string
}

type Props = {
    data: ScheduleProps
}

export function ScheduleCard({data}: Props) {


    return (
        <View className="bg-gray-700 w-11/12 h-32  border-red-700 border-2">
            <View className="bg-red-700 w-6 h-6 rounded-full ml-80 mt-2">
            </View>
            <Text className="ml-5 font-semibold text-slate-200">
                Cliente: {data.name}
            </Text>
            <Text className="ml-5 mt-1 font-semibold text-slate-200">
                Barbeiro: {data.cellphone}
            </Text>
            <Text className="ml-5 mt-1 font-semibold text-slate-200">
                Horario: {data.schedule}
            </Text>
        </View>
)
}

