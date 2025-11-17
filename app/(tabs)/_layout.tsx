import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'

const TabsLayout = () => (
  <Tabs screenOptions={{ headerShown: false }}>
    <Tabs.Screen name='index' options={{
      title: 'Search',
      tabBarIcon: ({ color }) =>
        <Ionicons name='search' size={20} color={color} />
      
    }} />
    <Tabs.Screen name='saved' options={{
      title: 'Saved',
      tabBarIcon: ({ color }) =>
        <Ionicons name='newspaper-outline' size={20} color={color} />
    }} />
    <Tabs.Screen name='me' options={{
      title: 'Me',
      tabBarIcon: ({ color }) =>
        <Ionicons name='home-outline' size={20} color={color} />
    }} />
  </Tabs>
)

export default TabsLayout