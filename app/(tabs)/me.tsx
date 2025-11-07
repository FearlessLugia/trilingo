import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'
import { useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import { registerForNotifications, scheduleNotification } from '../../utils/notifications'

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
      
      <SignOut />
    </View>
  )
}

export default MeScreen

const styles = StyleSheet.create({
  container: {}
})
