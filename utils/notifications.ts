import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
})

export const registerForNotifications = async () => {
  const { status } = await Notifications.requestPermissionsAsync()
  console.log('status', status)
  return status
}

export const sendTestNotification = async (
  savedCount: number
) => {
  let body: string
  
  if (savedCount === 0) {
    body = 'You have no saved words today. Add some today!'
  } else if (savedCount === 1) {
    body = '1 saved word waiting for you'
  } else {
    body = `${savedCount} saved words waiting for you`
  }
  
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Time to review',
      body
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5
    }
  })
}

export const scheduleDailyReminder = async (
  hour: number,
  minute: number,
  savedCount: number
) => {
  let body: string
  
  if (savedCount === 0) {
    body = 'You have no saved words today. Add some today!'
  } else if (savedCount === 1) {
    body = '1 saved word waiting for you'
  } else {
    body = `${savedCount} saved words waiting for you`
  }
  
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Time to review',
      body: `${savedCount} saved words waiting`
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: hour,
      minute: minute
    }
  })
}

export const cancelAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync()
}