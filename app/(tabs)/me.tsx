import { Text, View } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'

const NotificationSetup = () => {
  return (
    <View>
      <Text>Notification Setup</Text>
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

const Me = () => {
  return (
    <View style={globalStyles.container}>
      <Text>My name</Text>
      
      <NotificationSetup />
      
      <SignOut />
    </View>
  )
}

export default Me