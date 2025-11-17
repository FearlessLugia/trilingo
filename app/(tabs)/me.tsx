import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '@/styles/globalStyles'
import { useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import { registerForNotifications, scheduleNotification, sendNotification } from '@/utils/notifications'
import { clearHistory } from '@/features/history/historySlice'
import { AppDispatch } from '@/store/store'
import { useDispatch } from 'react-redux'
import { clearSaved } from '@/features/saved/savedSlice'

const NotificationSetup = () => {
  useEffect(() => {
    registerForNotifications()
  }, [])
  
  const onTest = async () => {
    await sendNotification()
  }
  
  return (
    <Pressable style={styles.button} onPress={onTest}>
      <Text style={styles.buttonText}>Send me an Example Notification</Text>
    </Pressable>
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
    <Pressable style={styles.button} onPress={handleClearHistory}>
      <Text style={styles.buttonText}>Clear Search History</Text>
    </Pressable>
  )
}

const ClearSaved = () => {
  const dispatch: AppDispatch = useDispatch()
  
  const handleClearSaved = () => {
    Alert.alert('Confirm', 'Are you sure you want to clear your saved words? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK', onPress: () => {
            dispatch(clearSaved())
            Alert.alert('Saved Words Cleared', 'Your saved words has been successfully cleared.')
          }
        }
      ]
    )
  }
  
  return (
    <Pressable style={styles.button} onPress={handleClearSaved}>
      <Text style={styles.buttonText}>Clear all Saved Words</Text>
    </Pressable>
  )
}


const SignOut = () => {
  const handleSignOut = () => {
  }
  
  return (
    <Pressable style={styles.button} onPress={handleSignOut}>
      <Text style={styles.buttonText}>Sign Out</Text>
    </Pressable>
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
      <View style={styles.container}>
        <Text>Hello, My name!</Text>
        
        <NotificationSetup />
        
        <ClearHistory />
        <ClearSaved />
        
        <SignOut />
      </View>
    </View>
  )
}

export default MeScreen

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 5
  },
  
  button: {
    width: '96%',
    marginHorizontal: '2%',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#DDD'
  },
  
  buttonText: {}
})
