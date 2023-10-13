import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native'
import {Entypo} from '@expo/vector-icons'
import { Dimensions } from 'react-native';

type SelectDropdownProps = {
  options: string[];
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export function SelectDropdown({options, value, placeholder, onChange}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false) 
  const [selectedValue, setSelectedValue] = useState(value)
  const {height} = Dimensions.get('window');
  const MAX_FLATLIST_HEIGHT = height * 0.3;

  const dropdownRef = useRef(null)

  function handleOptionSelect(option: string) {
    setSelectedValue(option)
    onChange(option)
    setIsOpen(false)
  }

  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  return (
    <View className='border-2 border-red-700 w-10/12 h-10 rounded-lg mt-10 items-center justify-center'>
      <TouchableOpacity activeOpacity={0.7} className=' flex flex-row w-full h-10 rounded-lg items-center justify-center absolute' onPress={() => setIsOpen(!isOpen)}>
        <Text className='font-semibold text-lg text-[#fff] ml-12'>
          {selectedValue || placeholder}
        </Text>
        <View className='ml-8'>
          <Entypo name='chevron-small-down' size={24} color='red'/>
        </View>
      </TouchableOpacity>
      {isOpen && (
        <View className='top-20 h-28 w-full items-center'>
          <FlatList className='w-full border-2 border-red-700' data={options} keyExtractor={(item) => item} scrollEnabled={options?.length * 10 > MAX_FLATLIST_HEIGHT} renderItem={({item}) => (
            <TouchableOpacity className='w-full items-center' onPress={() => handleOptionSelect(item)}>
              <Text className='font-semibold mt-2 text-lg text-[#fff]'>{item}</Text>
            </TouchableOpacity>
          )}/>
        </View>
      ) }
    </View>
  )
}