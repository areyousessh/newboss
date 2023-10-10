import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View, Image} from "react-native";
import { Entypo } from '@expo/vector-icons';
import { propsStack } from '@routes/stack/models';
import { useNavigation } from '@react-navigation/native';
import { Input } from '@components/input';
import { Button } from '@components/button';
import { CheckBox } from 'react-native-elements';
import {useForm, Controller} from 'react-hook-form'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import SelectDropdown from "react-native-select-dropdown";


type FormDataProps = {
    name: string;
    email: string;
    cellphone: string;
    password: string;
    isAdmin: boolean;
}



export function SignUp() {
    const navigation = useNavigation<propsStack>()
    const [checked, setChecked] = useState<boolean>(false);
    const {control, handleSubmit} = useForm<FormDataProps>();
    const options = [
        {label: 'Funcionário', value: true},
        {label: 'Cliente', value: false}
    ]

    async function handleSignUp(data) {
        try {
            const response = await axios.post('http://localhost:3001/create-user', {
                name: data.name,
                email: data.email,
                cellphone: data.cellphone,
                password: data.password,
                isAdmin: data.isAdmin.value
            })
            if (response.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Usuário criado com sucesso'
                })
                navigation.navigate('Login')
            }
        } catch (e: any) { 
            if (e.response.status === 409) {
                Toast.show({
                    type: 'error',
                    text1: 'Usuário já existe'
                })
                console.log('Erro:', e.response.data.error)
            } else {
                console.log('Erro:', e.message)
            }
        }
    }

    return (
    <SafeAreaView className="flex-1 bg-[#1e1e1e]">
        <View className="ios:mt-4 android:mt-12 flex-row">
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
                <Controller 
                control={control}
                name="name"
                render={({field: {onChange}}) => (
                <Input placeholder="Nome Completo" onChangeText={onChange}/>
                )}
                />
            </View>
            <View className="items-center mt-4">
            <Controller 
                control={control}
                name="email"
                render={({field: {onChange}}) => (
                <Input placeholder="Email" onChangeText={onChange}/>
                )}
                />
            </View>
            <View className="items-center mt-4">
            <Controller 
                control={control}
                name="password"
                render={({field: {onChange}}) => (
                <Input secureTextEntry={true} placeholder="Senha" onChangeText={onChange}/>
                )}
                />
            </View>
            <View className="items-center mt-4">
            <Controller 
                control={control}
                name="cellphone"
                render={({field: {onChange}}) => (
                <Input placeholder="Telefone" onChangeText={onChange}/>
                )}
                />
            </View>
            <View className="items-center mt-4">
            <Controller 
                control={control}
                name="isAdmin"
                render={({field: {onChange}}) => (
                    <SelectDropdown 
                    buttonStyle={{width: 355, marginTop: 2, borderWidth: 2,
                    borderColor: '#F51C12', borderRadius: 24, backgroundColor: 'transparent'}}
                    dropdownStyle={{backgroundColor: '#1E1E1E'}}
                    rowTextStyle={{color: '#FFF'}}
                    rowTextForSelection={(item, index) => {
                        return item.label
                    }}
                    buttonTextAfterSelection={(Selecteditem, index) => {
                        return Selecteditem.label
                    }}
                    buttonTextStyle={{color: '#FFF7', fontWeight: 'bold', fontSize: 16}}
                    defaultButtonText="Funcionário ou Cliente"
                    data={options}
                    onSelect={onChange}
                    />
                )}
                />
            </View>
            <View className="items-center">
                <CheckBox 
                checkedColor="#F01212"
                textStyle={{color: '#fff'}}
                containerStyle={{backgroundColor: '#1e1e1e', borderColor: '#1e1e1e'}} 
                checked={checked} onPress={() => setChecked(!checked)} title="Aceito os termos de uso e diretrizes do app"/>
            </View>
            <View className="items-center">
                <Button type="submit" title="Cadastrar" onPress={handleSubmit(handleSignUp)}/>
            </View>
            <View className="items-center justify-center ios:mt-14 android:mt-6">
                <Text className="mt-2 text-[#5D5858] font-normal text-xs">Todos os direitos reservados ®SesshTech</Text>
                <Button type="small" title="Contato"/>
            </View>
    </SafeAreaView>
    )
}
