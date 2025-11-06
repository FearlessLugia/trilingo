import { Tabs } from 'expo-router'

const TabsLayout = () => (
  <Tabs screenOptions={{ headerShown: false }}>
    <Tabs.Screen name='index' options={{ title: 'Trilingo' }} />
    <Tabs.Screen name='saved' options={{ title: 'Saved' }} />
    <Tabs.Screen name='me' options={{ title: 'Me' }} />
  </Tabs>
)

export default TabsLayout