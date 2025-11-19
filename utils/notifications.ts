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
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Time to review',
      body: `${savedCount} saved words waiting`
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