import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '@/styles/globalStyles'
import { useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import { registerForNotifications, scheduleDailyReminder, sendNotification } from '@/utils/notifications'
import { clearHistory } from '@/features/history/historySlice'
import { AppDispatch } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { clearSaved, selectSaved } from '@/features/saved/savedSlice'

const isToday = (timestamp: number | undefined) => {
  if (!timestamp) return false
  const d = new Date(timestamp)
  const now = new Date()
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  )
}

const NotificationSetup = () => {
  useEffect(() => {
    registerForNotifications()
  }, [])
  
  const saved = useSelector(selectSaved)
  
  const todaySavedCount = saved.filter((entry: any) =>
    isToday(entry.timestamp)
  ).length
  
  const onTest = async () => {
    await sendNotification(todaySavedCount)
  }
  
  return (
    <Pressable style={styles.button} onPress={onTest}>
      <Text style={styles.buttonText}>Send me an Example Notification</Text>
    </Pressable>
  )
}

const DailyReminder = () => {
  const saved = useSelector(selectSaved)
  
  const todaySavedCount = saved.filter((entry: any) =>
    isToday(entry.timestamp)
  ).length
  
  const handleScheduleDaily = async () => {
    // 这里先写死每天 20:00，你可以改成自己喜欢的时间
    await scheduleDailyReminder(20, 0, todaySavedCount)
    Alert.alert(
      'Reminder set',
      `Daily reminder at 20:00 with ${todaySavedCount} saved words today.`
    )
  }
  
  return (
    <Pressable style={styles.button} onPress={handleScheduleDaily}>
      <Text style={styles.buttonText}>Schedule Daily Reminder (20:00)</Text>
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
        <Text style={styles.headerText}>Hello, User!</Text>
        
        <NotificationSetup />
        <DailyReminder />
        
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
  
  headerText: {
    fontSize: 24,
    padding: 20,
    fontWeight: 'bold'
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
