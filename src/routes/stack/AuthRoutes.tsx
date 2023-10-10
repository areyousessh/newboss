import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Login } from "@pages/login"
import { SignUp } from "@pages/signup"
import { ForgotPassword } from "@pages/forgotpassword"
import { Home } from "@pages/home"

const Stack = createNativeStackNavigator()

export function AuthRoutes() {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="SignUp" component={SignUp}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
            <Stack.Screen name="Home" component={Home}/>
        </Stack.Navigator>
    )
}