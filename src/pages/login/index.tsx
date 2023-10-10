import React, { useContext, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View, Image } from "react-native";
import { Entypo } from '@expo/vector-icons'
import { Button } from "@components/button";
import { Input } from "@components/input";
import { useNavigation } from "@react-navigation/native";
import { propsStack } from "@routes/stack/models";
import { useForm, Controller } from 'react-hook-form'
import axios from "axios";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { AppContext } from "@context/globalContext";


type FormDataProps = {
    email: string;
    password: string
}

export function Login() {

    const [visible, setVisible] = useState<boolean>(true)
    const navigation = useNavigation<propsStack>()
    const { control, handleSubmit } = useForm<FormDataProps>();
    const { setTokenJwt } = useContext(AppContext)

    async function HandleLogin(data) {
        try {
            const response = await axios.post('http://localhost:3001/login', {
                email: data.email,
                password: data.password
            });
            const { token } = response.data
            setTokenJwt(token)
            if (response.status === 200) {
                navigation.navigate('Home')
                Toast.show({
                    type: 'success',
                    text1: 'Autenticação bem sucedida'
                })
            }
        } catch (e: any) {
            if (e.response) {
                console.log('Erro:', e.response.data.error);
            }
            if (e.response.status === 401) {
                Toast.show({
                    type: 'error',
                    text1: 'Usuário ou senha incorretos'
                })
            }
            if (e.response.status === 500) {
                Toast.show({
                    type: 'error',
                    text1: 'Erro interno do servidor'
                })
            }
            else {
                console.log('Erro:', e.message)
            }
        }
    }
    return (
        <SafeAreaView className="flex-1 bg-[#1e1e1e]">
            <View className="ios:mt-4 android:mt-10 flex-row">
                <Button type="medium" title="Entrar" onPress={() => setVisible(!visible)} />
                <TouchableOpacity activeOpacity={0.5}>
                    <Entypo name="instagram" size={30} color='#F01212' />
                </TouchableOpacity>
            </View>
            <View className="items-center justify-center">
                <Image source={require('../../assets/logo.png')} />
            </View>
        {
            visible === true ? <>
                <View className="items-center">
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange } }) => (
                            <Input placeholder="Email" onChangeText={onChange} />
                        )}
                    />
                </View>
                <View />
                <View className="items-center mt-6">
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange } }) => (
                            <Input secureTextEntry={true} placeholder="Senha" onChangeText={onChange} />
                        )}
                    />
                </View>
                <View className="mt-8 items-center">
                    <Button type="submit" title="Entrar" onPress={handleSubmit(HandleLogin)} />
                </View>
                <View className="mt-2 items-center">
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text className="text-[#fff] text-extrabold">
                            Esqueci minha senha
                        </Text>
                    </TouchableOpacity>
                </View>
            </>
                :
                <View className="items-center">
                    <Text>teste</Text>
                </View>
        }
            <View className="items-center justify-center ios:mt-44 android:mt-36">
                <Text className="text-[#fff] font-normal text-xs mb-2">Venha ser um boss !</Text>
                <Button type="large" title="Cadastre-se" onPress={() => navigation.navigate('SignUp')} />
                <Text className="mt-2 text-[#5D5858] font-normal text-xs">Todos os direitos reservados ®SesshTech</Text>
                <Button type="small" title="Contato" />
            </View>

        </SafeAreaView>
    )
}
