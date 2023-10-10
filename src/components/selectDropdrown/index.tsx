import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, FlatList} from 'react-native'
import {Entypo} from '@expo/vector-icons'

type SelectDropdownProps = {
  options: string[];
  placeholder: string;
  onChange: (selectedValue: string) => void;
  selectedValue: string;
}

export function SelectDropdown({options, placeholder, onChange, selectedValue}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false) 

  function handleOptionSelect(value: string) {
    onChange(value)
    setIsOpen(false)
  }
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

    </View>
  )
}