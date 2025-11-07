import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
})

export async function registerForNotifications() {
  const { status } = await Notifications.requestPermissionsAsync()
  console.log('status', status)
}

export async function sendNotification() {
  await Notifications.scheduleNotificationAsync({
    content: { title: 'Time to review', body: '12 saved words waiting' },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5
    }
  })
}


export async function scheduleNotification() {
  await Notifications.scheduleNotificationAsync({
    content: { title: 'Time to review', body: '12 saved words waiting' },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 20,
      minute: 0
    }
  })
}
