import { Tabs } from 'expo-router'
import { colors } from '../../constants/colors'

const TabsLayout = () => (
  <Tabs
    screenOptions={
      {
        headerShown: false,
        
        tabBarStyle: { height: 50 },
        tabBarLabelStyle: { marginBottom: -10 }
      }
    }
  >
    <Tabs.Screen name='index' options={{ title: 'Trilingo' }} />
    <Tabs.Screen name='saved' options={{ title: 'Saved' }} />
    <Tabs.Screen name='me' options={{ title: 'Me' }} />
    
    <Tabs.Screen name='word/[headword]' options={{ href: null }} />
    <Tabs.Screen name='synset/[id]' options={{ href: null }} />
  </Tabs>
)

export default TabsLayout