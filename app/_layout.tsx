import { Stack } from 'expo-router'
import { colors } from '../constants/colors'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { store } from '../store/store'
import { Provider } from 'react-redux'
import { loadHistory } from '../storage/historyStorage'
import { setHistory } from '../features/history/historySlice'
import { useEffect } from 'react'
import { loadSaved } from '../storage/savedStorage'
import { setSaved } from '../features/saved/savedSlice'

export default function RootLayout() {
  useEffect(() => {
    loadHistory().then((history) => {
      store.dispatch(setHistory(history))
    })
    
    loadSaved().then((saved) => {
      store.dispatch(setSaved(saved))
    })
  }, [])
  
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView edges={['top']} style={styles.container}>
          <Stack screenOptions={{ headerShown: false }}>
          
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  }
})