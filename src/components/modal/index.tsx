import React, { ReactNode } from "react";
import { Modal, SafeAreaView, TouchableOpacity, View } from "react-native";
import {AntDesign} from '@expo/vector-icons'; 

type Props = {
    isVisible: boolean
    onClose: () => void
    children: ReactNode;
}

export function CustomModal({isVisible, onClose, children}: Props) {
    return (
    <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}>
        <SafeAreaView className="flex-1 bg-[#1e1e1e]">
            <View className="flex-row ml-80 mt-4">
            <TouchableOpacity className="ml-10" activeOpacity={0.5}>
                <AntDesign name="close" size={30} color='#F01212' onPress={() => onClose()}/>
            </TouchableOpacity>
            </View>
            {children}
        </SafeAreaView>
    </Modal>
    )
}
