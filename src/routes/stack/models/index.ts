import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export type propsNavigationStack = {
    Login: undefined,
    SignUp: undefined,
    ForgotPassword: undefined,
    Home: undefined,
}

export type propsStack = NativeStackNavigationProp<propsNavigationStack>