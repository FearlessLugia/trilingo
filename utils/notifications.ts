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

export async function sendNotification(
  savedCountToday: number
) {
  await Notifications.scheduleNotificationAsync({
    content: { title: 'Time to review', body: `${savedCountToday} saved words waiting` },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5
    }
  })
}


export async function scheduleDailyReminder(
  hour: number,
  minute: number,
  savedCountToday: number
) {
  await Notifications.scheduleNotificationAsync({
    content: { title: 'Time to review', body: `${savedCountToday} saved words waiting` },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: hour,
      minute: minute
    }
  })
}
