import React from "react";
import { View, Text } from "react-native";
import { Feather, Ionicons } from '@expo/vector-icons';
import moment from "moment";


export type CardProps = {
    id? : string;
    barberName: string;
    clientName: string;
    date: string;
    id_user: number;
}

type Props = {
    data: CardProps
}

export function Card({data}: Props) {
    const formatedDate = moment(data.date, 'YYYY-MM-DD').toDate()

    return (
    <View className="border-2 border-red-600 bg-[#1e1e1e] w-80 h-32 mt-2">
        <View className="flex-row ios:mt-6">
            <Feather style={{marginLeft: 16}} name="scissors" size={24} color="#F01212" />
            <Text className="ml-2 mt-1 font-semibold text-[#fff]">
                Barbeiro: {data.barberName}
            </Text>
        </View>
        <View className="flex-row mt-1">
            <Feather style={{marginLeft: 16}} name="clock" size={24} color="#F01212" />
            <Text className="ml-2 mt-2 font-semibold text-[#fff]">
                Horario: {moment(formatedDate).format('DD/MM/YYYY')}
            </Text>
        </View>
        <View className="flex-row mt-1">
            <Ionicons style={{marginLeft: 16}} name="person-circle-outline" size={24} color="#F01212" />
            <Text className="ml-2 mt-2 font-semibold text-[#fff]">
                Cliente: {data.clientName}
            </Text>
        </View>
    </View>
    )
}
