import { Alert, Pressable, StyleSheet, Switch, Text, View } from 'react-native'
import { globalStyles } from '@/styles/globalStyles'
import { useEffect, useState } from 'react'
import {
  cancelAllNotifications,
  registerForNotifications,
  scheduleDailyReminder,
  sendTestNotification
} from '@/utils/notifications'
import { AppDispatch } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { selectSaved } from '@/features/saved/savedSlice'
import DateTimePicker from '@react-native-community/datetimepicker'
import { clearHistoryAsync } from '@/features/history/historyThunks'
import { clearSavedAsync } from '@/features/saved/savedThunks'
import { supabase } from '@/utils/supabase'
import { useRouter } from 'expo-router'
import { User } from '@supabase/auth-js'

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
  
  const [enabled, setEnabled] = useState(true)
  const [time, setTime] = useState(() => new Date(new Date().setHours(20, 0, 0, 0)))
  
  const saved = useSelector(selectSaved)
  const todaySavedCount = saved.filter((entry) => isToday(entry.timestamp)).length
  
  useEffect(() => {
    if (enabled) {
      scheduleDailyReminder(time.getHours(), time.getMinutes(), todaySavedCount)
    } else {
      cancelAllNotifications()
    }
  }, [enabled, time, todaySavedCount])
  
  return (
    <View style={styles.group}>
      <View style={[styles.button, styles.notification]}>
        <Text style={styles.buttonText}>Daily Reminder</Text>
        
        <View style={styles.notificationRight}>
          {enabled && (
            <View style={styles.timeWrapper}>
              <DateTimePicker
                mode='time'
                value={time}
                onChange={(_, selected) =>
                  selected && setTime(selected)
                }
              />
            </View>
          )}
          
          <Switch style={styles.switch} value={enabled} onValueChange={setEnabled} />
        </View>
      </View>
      
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
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
  }
  
  return (
    <Pressable style={styles.button} onPress={handleSignOut}>
      <Text style={styles.buttonText}>Sign Out</Text>
    </Pressable>
  )
}

const MeScreen = () => {
  const [user, setUser] = useState<User | null>(null)
  
  const router = useRouter()
  
  useEffect(() => {
    const checkLogin = async () => {
      const { data } = await supabase.auth.getSession()
      
      if (!data.session) {
        router.replace('/signIn')
        return
      }
      
      const sessionUser = data.session.user
      setUser(sessionUser)
    }
    
    checkLogin()
  }, [])
  
  const username = user?.email?.split('@')[0] ?? 'User'
  
  return (
    <View style={globalStyles.container}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Hello, {username}!</Text>
        
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
    transform: [{ scaleX: .65 }, { scaleY: .78 }],
    height: 20,
    alignSelf: 'center',
    marginTop: -5
  }
})
