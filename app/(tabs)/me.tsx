import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '@/styles/globalStyles'
import { useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import { registerForNotifications, scheduleNotification } from '@/utils/notifications'
import { clearHistory } from '@/features/history/historySlice'
import { AppDispatch } from '@/store/store'
import { useDispatch } from 'react-redux'

const NotificationSetup = () => {
  useEffect(() => {
    registerForNotifications()
  }, [])
  
  const onTest = async () => {
    await scheduleNotification()
  }
  
  return (
    <View style={styles.container}>
      <View style={{ height: 16 }} />
      <Button title='test' onPress={onTest} />
    </View>
  )
}

const ClearHistory = () => {
  const dispatch: AppDispatch = useDispatch()
  
  const handleClearHistory = () => {
    Alert.alert('Confirm', 'Are you sure you want to clear your history? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK', onPress: () => {
            dispatch(clearHistory())
            Alert.alert('History Cleared', 'Your history has been successfully cleared.')
          }
        }
      ]
    )
  }
  
  return (
    <View>
      <Button title='Clear Search History' onPress={handleClearHistory} />
    </View>
  )
}

const SignOut = () => {
  return (
    <View>
      <Text>Sign Out</Text>
    </View>
  )
}

const MeScreen = () => {
  useEffect(() => {
    registerForNotifications()
  }, [])
  
  async function registerForNotifications() {
    const { status } = await Notifications.requestPermissionsAsync()
    console.log('status', status)
  }
  
  return (
    <View style={globalStyles.container}>
      <Text>Hello, My name!</Text>
      
      <NotificationSetup />
      
      <ClearHistory />
      
      <SignOut />
    </View>
  )
}

export default MeScreen

const styles = StyleSheet.create({
  container: {}
})
