import { isLoading } from "expo-font";
import React from "react";
import { ActivityIndicator, ActivityIndicatorProps, View } from "react-native";

type Props =  ActivityIndicatorProps & {
    isLoading: boolean;
}

export function Loading ({isLoading, ...rest}: Props) {
    if (!isLoading) {
        return null;
} else {
    return (
            <View className="flex flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#F01212" />
            </View>
        );
}
}