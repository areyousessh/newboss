import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { Button } from "../../components/button";
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "../../routes/stack/models";
import {Entypo} from '@expo/vector-icons'
import { Input } from "../../components/input";


export function ForgotPassword() {
    const [visible, setVisible] = useState<boolean>(true)
    const navigation = useNavigation<propsStack>()


    return (
        <SafeAreaView className="flex-1 bg-[#1e1e1e]">
            <View className="ios:mt-4 android:mt-10 flex-row">
            <TouchableOpacity className="mr-72 ml-4" onPress={() => navigation.goBack()}>
                <Entypo name="chevron-left" size={30} color="red" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
                <Entypo name="instagram" size={30} color='#F01212'/>
            </TouchableOpacity>
        </View>
        <View className="items-center justify-center">
            <Image source={require('../../assets/logo.png')}/>
        </View>
        <View className="items-center">
            <Input placeholder="Email"/>
        </View>
        <View className="items-center mt-8">
            <Button type="submit" title="Recuperar senha"/>
        </View>
        <View className="items-center justify-center mt-80">
            <Text className="mt-2 text-[#5D5858] font-normal text-xs">Todos os direitos reservados ®SesshTech</Text>
            <Button type="small" title="Contato"/>
        </View>
        </SafeAreaView>
)
}
