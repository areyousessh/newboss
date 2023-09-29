import { StatusBar } from 'expo-status-bar'
import React, { useCallback } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { Router } from './routes'
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins'
import Toast from 'react-native-toast-message'
import { AppContextProvider } from './context/globalContext'

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded])
  if (!fontsLoaded) {
    return null
  }

  return (
    <AppContextProvider>
      <StatusBar style="light" />
      <Router/>
      <Toast />
    </AppContextProvider>
  );
}
