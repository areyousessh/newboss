import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState} from "react";
import { SafeAreaView, View, TouchableOpacity, FlatList, Image, Text, Dimensions, Linking, ScrollView} from "react-native";
import { propsStack } from "@routes/stack/models";
import { Entypo, AntDesign, EvilIcons } from '@expo/vector-icons';
import { Button } from "@components/button";
import { CustomModal } from "@components/modal";
import {useForm, Controller} from 'react-hook-form'
import { AppContext } from "@context/globalContext";
import { Card, CardProps } from "@components/card";
import { Loading } from "@components/loading";
import * as ImagePicker from "expo-image-picker"
import Toast from "react-native-toast-message";
import axios from "axios";
import jwtDecode from 'jwt-decode'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DayPicker } from "@components/dayPicker";
import { SelectDropdown } from "@components/selectDropdrown";


type FormDataProps = {
    barberName: string;
    date: string;
}

type UserDataProps = {
    name: string; 
    cellphone: string;
    email: string;
    id: number;
    password: string;
    isAdmin: boolean
}

type availableSchedules = {
    dayOfMonth: number;
    dayOfWeek: string;
    hours: string[]
}

export function Home() {
    const navigation = useNavigation<propsStack>()
    const [modalProfileVisible, setModalProfileVisible] = useState(false);
    const [modalScheduleVisible, setModalScheduleVisible] = useState(false);
    const [image, setImage] = useState(null || undefined)
    const [userData, setUserData] = useState<UserDataProps>()
    const [dates, setDates] = useState<availableSchedules[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDays, setSelectedDays] = useState({})
    const [barberName, setBarberName] = useState('')
    const [schedules, setSchedules] = useState<CardProps[]>([])
    const [filteredSchedule, setFilteredSchedule] = useState<CardProps[]>([])
    const {control, handleSubmit} = useForm<FormDataProps>(); 
    const {tokenJwt, setTokenJwt} = useContext(AppContext)
    const barber = ["Bruno", "Mauricio", "Luiz"]
    const {height} = Dimensions.get('window');
    const MAX_FLATLIST_HEIGHT = height * 0.3;
    const decodedToken = jwtDecode(tokenJwt) as {userId: string}
    const id_user = decodedToken.userId
    const InstaURL =  'https://www.instagram.com/newbossbarbershop_'


    function generateDates(): availableSchedules[] {
        const startDate = new Date();
        const dates: availableSchedules[] = [];
      
        for (let i = 0; i < 14; i++) {
          const currentDate = new Date(startDate);
          currentDate.setDate(startDate.getDate() + i);
      
          const dayOfMonth = currentDate.getDate();
          const dayOfWeek = getDayOfWeek(currentDate);
      
          const hours = generateHours();
      
          dates.push({ dayOfMonth, dayOfWeek, hours });
        }
      
        return dates;
      }
      
    function getDayOfWeek(date: Date): string {
        const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Quar', 'Qui', 'Sex', 'Sáb'];
        return daysOfWeek[date.getDay()];
      }
      
    function generateHours(): string[] {
        const hours: string[] = [];
        const startTime = 9 * 60; // 09:00 em minutos
        const endTime = 20 * 60; // 20:00 em minutos
        const interval = 40; // 40 minutos
      
        for (let i = startTime; i < endTime; i += interval) {
          const hour = Math.floor(i / 60);
          const minute = i % 60;
          const formattedHour = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          hours.push(formattedHour);
        }
      
        return hours;
      }

    function handleDaySelect(dayOfMonth, dayOfWeek, isSelected) {
        const updatedSelectedDays = {
         available: {dayOfMonth, dayOfWeek, isSelected},
        };
        setSelectedDays(updatedSelectedDays);
        console.log(updatedSelectedDays)
     }

    function toggleModalProfile() {
        setModalProfileVisible(!modalProfileVisible)
    }

    function toggleModalSchedule() {
        setModalScheduleVisible(!modalScheduleVisible)
    }

    async function pickImage() {
        const profileImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        console.log(profileImage)
        if (!profileImage.canceled) {
            setImage(profileImage.assets[0].uri)
            await AsyncStorage.setItem('profileImage', profileImage.assets[0].uri)
        }
        else {
            Toast.show({
                type: "error",
                text1: "Caso não tenha uma imagem de perfil selecione uma"
            })
        }
    }

    async function getStoredImage() {
        const storedImage = await AsyncStorage.getItem('profileImage')
        if (storedImage) {
            setImage(storedImage)
        }
    }

    async function getSchedules() {
        try {
            const response = await axios.get('http://localhost:3001/schedules')
            setSchedules(response.data)
            if (response.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Agendamentos carregados !'
                })
            }
        } catch (e: any) {
            if (e.response) {
                console.log('Erro:', e.response.data.error)
            } 
        }
    }

    async function openInsta() {
        const supported = await Linking.canOpenURL(InstaURL)
        if (supported) {
            await Linking.openURL(InstaURL)
        } else {
            Toast.show({
                type: 'error',
                text1: 'Erro ao abrir o link'
            })
        }
    }

    async function getUserData() {
        try {
            const response = await axios.get(`http://localhost:3001/user/${id_user}`)
            setUserData(response.data)
        } catch (e) {
            if (e.response) {
                console.log('Erro:', e.response.data.error)
            } else {
                console.log('Erro:', e.message)
            }
        }
    }

    function Logout() {
        setTokenJwt(null)
        navigation.navigate('Login')
            Toast.show({
                type: "success",
                text1: "Sessão encerrada com sucesso !"
        })

  
    }

    function FilterSchedules() {
        if (userData?.isAdmin === true) {
            return schedules
        } else {
            return schedules.filter((schedule) => schedule.id_user === userData?.id)
        }
    };

    useEffect(() => {
        const filtered = FilterSchedules();
        setFilteredSchedule(filtered)
    }, [userData, schedules])

    useEffect(() => {
        async function fetchData() {
          const generatedDates = generateDates();
          setDates(generatedDates);
        }
    
        fetchData();
        console.log(dates)
      }, []);

    useEffect(() => {
        getSchedules()
        getUserData()
        getStoredImage()
    }, [])

    return (
    <SafeAreaView className="flex-1 bg-[#1e1e1e]">
         <View className="ios:mt-4 android:mt-10 flex-row">
            <TouchableOpacity className="mr-72 ml-3" onPress={() => toggleModalProfile()}>
                <EvilIcons name="user" size={44} color="red" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} className="ml-2" onPress={() => openInsta()}>
                <Entypo name="instagram" size={30} color='#F01212'/>
            </TouchableOpacity>
        </View>
        <View className="items-center justify-center">
                <Image className="h-32 w-32" source={require('../../assets/logo.png')}/>
        </View>
        <View className="flex-1 items-center max-h-fit">
            <FlatList data={filteredSchedule} 
            renderItem={({item}) => (
            <Card 
            data={item}/>
            )} keyExtractor={(item) => item.id.toString()} 
            scrollEnabled={filteredSchedule?.length * 50 > MAX_FLATLIST_HEIGHT}/>
        </View>
        <View className="items-center mt-16 android:mb-4">
            <Button type="large" title="Agendar um horário" onPress={() => toggleModalSchedule()}/>
        </View>
        <CustomModal isVisible={modalProfileVisible} onClose={() => toggleModalProfile()}>
            <TouchableOpacity className="ml-4 -mt-6 w-10 h-10" onPress={() => Logout()}>
                <AntDesign name="logout" size={30} color="#F01212" />
            </TouchableOpacity>
            <View className="items-center mt-4">
                <View className="border-4 h-32 w-32 border-red-600 rounded-full" >
                    <TouchableOpacity className="w-32 h-32 rounded-full" onPress={() => pickImage()}>
                    {image && <Image source={{uri: image}} className="h-32 w-32 -ml-1 -mt-1  rounded-full"/>} 
                    </TouchableOpacity>
                </View>
                <View className="items-center border-2 border-red-600 w-80 h-32 mt-8 rounded-lg ">
                    <Text className="text-[#fff] font-bold mt-4">
                        {userData?.name}
                    </Text>
                    <Text className="text-[#fff] font-bold mt-2">
                        {userData?.cellphone}
                    </Text>
                    <Text className="text-[#fff] font-bold mt-2">
                        {userData?.email}
                    </Text>
                </View>
                {userData?.isAdmin === true ?
                <>
                 <Controller name="barberName" control={control} defaultValue="" render={({field: {onChange}}) => (
                    <SelectDropdown options={barber} placeholder="Selecione o seu barbeiro" onChange={(selectedValue) => {
                        onChange(selectedValue);
                        setBarberName(selectedValue)
                    }}
                    selectedValue={barberName}
                    />
                 )}/>
                 { barberName !== '' ?
                <>
                {dates.length != 0 ? (
                    <View className="h-32 w-10/12 mt-10 items-center">
                        <ScrollView horizontal>
                            {dates.map((date, index) => (
                            <DayPicker key={index} dayOfMonth={date.dayOfMonth} dayOfWeek={date.dayOfWeek} onSelect={handleDaySelect}/>
                            ))}
                        </ScrollView>
                    </View>
                ) : (
                    <Loading isLoading={true}/>
                )}
                </> 
                : null }
                </>
                : null} 
                    <Loading isLoading={isLoading}/>
            </View>
        </CustomModal>
        <CustomModal isVisible={modalScheduleVisible} onClose={() => toggleModalSchedule()}>
            <View className="items-center justify-center">
                <Image className="h-32 w-32 -mt-10" source={require('../../assets/logo.png')}/>
            </View>
           <Text className="text-white text-center font-extrabold text-2xl -mt-4">Agende seu atendimento</Text>

           <View className="items-center -mt-3">
           <Controller control={control} name="barberName" render={({field: {onChange}}) => (
                     <SelectDropdown options={barber} placeholder="Selecione o seu barbeiro" onChange={(selectedValue) => {
                        onChange(selectedValue);
                        setBarberName(selectedValue)
                    }}
                    selectedValue={barberName}
                    />
            )}/>
            </View>
            <View className="items-center ios:mt-8 android:mt-6">
                <Button type="large" title="Agendar"/>
            </View>
        </CustomModal>
    </SafeAreaView>
    )
}
