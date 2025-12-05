import { Alert, Platform, Pressable, StyleSheet, Switch, Text, View } from 'react-native'
import { globalStyles } from '@/styles/globalStyles'
import { useMemo, useState } from 'react'
import {
  cancelAllNotifications,
  registerForNotifications,
  scheduleDailyReminder,
  sendTestNotification
} from '@/utils/notifications'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { clearHistoryAsync } from '@/features/history/historyThunks'
import { selectSaved } from '@/features/saved/savedSlice'
import { clearSavedAsync } from '@/features/saved/savedThunks'
import { selectUserState } from '@/features/user/userSlice'
import { resetUserAsync, updatePreferenceAsync } from '@/features/user/userThunks'
import { supabase } from '@/utils/supabase'
import DateTimePicker from '@react-native-community/datetimepicker'

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
  const preference = useSelector(selectUserState).preference
  const enabled = preference.reminderEnabled
  const hour = preference.reminderHour ?? 20
  const minute = preference.reminderMinute ?? 0
  const reminderTime = useMemo(
    () => new Date(new Date().setHours(hour, minute, 0, 0)),
    [hour, minute]
  )
  
  const saved = useSelector(selectSaved)
  const todaySavedCount = useMemo(
    () => saved.filter(entry => isToday(entry.timestamp)).length,
    [saved]
  )
  
  const dispatch: AppDispatch = useDispatch()
  
  const [showPicker, setShowPicker] = useState(false)
  
  const handleSwitch = async (value: boolean) => {
    if (!value) {
      dispatch(updatePreferenceAsync({
        reminderEnabled: false
      }))
      
      await cancelAllNotifications()
      return
    }
    
    dispatch(updatePreferenceAsync({
      reminderEnabled: true,
      reminderHour: hour,
      reminderMinute: minute
    }))
    
    const granted = await registerForNotifications()
    if (!granted) {
      Alert.alert(
        'Notifications disabled',
        'Daily reminders may not show because notification permission is turned off in system settings.'
      )
      return
    }
    
    dispatch(updatePreferenceAsync({
      reminderEnabled: true,
      reminderHour: hour,
      reminderMinute: minute
    }))
    
    await cancelAllNotifications()
    await scheduleDailyReminder(hour, minute, todaySavedCount)
  }
  
  const handleTimeChange = async (event: any, selected: Date | undefined) => {
    if (event.type !== 'set' || !selected) {
      setShowPicker(false)
      return
    }
    
    setShowPicker(false)
    
    const newHour = selected.getHours()
    const newMinute = selected.getMinutes()
    
    dispatch(updatePreferenceAsync({
      reminderHour: newHour,
      reminderMinute: newMinute
    }))
    
    await cancelAllNotifications()
    await scheduleDailyReminder(newHour, newMinute, todaySavedCount)
  }
  
  return (
    <View style={styles.group}>
      <View style={[styles.button, styles.notification]}>
        <Text style={styles.buttonText}>Daily Reminder</Text>
        
        <View style={styles.notificationRight}>
          {enabled && Platform.OS === 'ios' && (
            <View style={styles.timeWrapper}>
              <DateTimePicker
                mode='time'
                value={reminderTime}
                onChange={handleTimeChange}
              />
            </View>
          )}
          
          {enabled && Platform.OS === 'android' && (
            <Pressable onPress={() => setShowPicker(true)}>
              <Text style={{ fontSize: 16 }}>
                {hour.toString().padStart(2, '0')}:
                {minute.toString().padStart(2, '0')}
              </Text>
            </Pressable>
          )}
          
          <Switch style={styles.switch} value={enabled} onValueChange={handleSwitch} />
        </View>
      </View>
      
      {Platform.OS === 'android' && showPicker && (
        <DateTimePicker
          value={reminderTime}
          mode='time'
          display='spinner'
          onChange={handleTimeChange}
        />
      )}
      
      <Pressable style={styles.button} onPress={() => sendTestNotification(todaySavedCount)}>
        <Text style={styles.buttonText}>Send an Example Notification</Text>
      </Pressable>
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
            dispatch(clearHistoryAsync())
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
            dispatch(clearSavedAsync())
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
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch()
  
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      Alert.alert('Error', 'Failed to sign out. Please try again.')
      return
    }
    
    Alert.alert('Signed Out', 'You have been successfully signed out.')
    
    await dispatch(resetUserAsync())
    
    router.replace('/signIn')
  }
  
  return (
    <Pressable style={styles.button} onPress={handleSignOut}>
      <Text style={styles.buttonText}>Sign Out</Text>
    </Pressable>
  )
}

const MeScreen = () => {
  const user = useSelector(selectUserState)
  
  return (
    <View style={globalStyles.container}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Hello, {user.username}!</Text>
        
        <NotificationSetup />
        
        <View style={styles.group}>
          <ClearHistory />
          <ClearSaved />
        </View>
        
        <SignOut />
      </View>
    </View>
  )
}

export default MeScreen

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 20
  },
  
  headerText: {
    fontSize: 24,
    paddingLeft: 20,
    paddingTop: 20,
    fontWeight: 'bold'
  },
  
  button: {
    width: '96%',
    marginHorizontal: '2%',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#DDD'
  },
  
  buttonText: {},
  
  group: {
    gap: 5
  },
  
  notification: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  
  notificationRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  
  timeWrapper: {
    justifyContent: 'center',
    height: 15
  },
  
  switch: {
    height: 20,
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? -10 : 0
  }
})
