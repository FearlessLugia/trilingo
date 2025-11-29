import { Stack, useRouter } from 'expo-router'
import { colors } from '@/constants/colors'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { RootState, store } from '@/store/store'
import { Provider, useSelector } from 'react-redux'
import { useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import { loadHistoryAsync } from '@/features/history/historyThunks'
import { loadSavedAsync } from '@/features/saved/savedThunks'
import { loadUserAsync } from '@/features/user/userThunks'

const InnerLayout = () => {
  const router = useRouter()
  
  const userId = useSelector((state: RootState) => state.user.userId)
  
  useEffect(() => {
    store.dispatch(loadUserAsync())
    
    store.dispatch(loadHistoryAsync())
    store.dispatch(loadSavedAsync())
  }, [userId])
  
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(() => {
      router.navigate('/saved')
    })
    
    return () => subscription.remove()
  }, [router])
  
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} style={styles.container}>
        <Stack screenOptions={{ headerShown: false }}>
        
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <InnerLayout />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  }
})