import { Tabs } from 'expo-router'
import { colors } from '../../constants/colors'

const TabsLayout = () => (
  <Tabs
    screenOptions={
      {
        headerShown: false,
        // headerStyle: {
        //   backgroundColor: colors.primary,
        //   height: 50
        // },
        // headerTintColor: colors.white,
        // headerTitleStyle: { fontWeight: 'bold' },
        // headerTitleAlign: 'center',
        // headerTitleAllowFontScaling: true,
        // headerBackTitle: 'Back',
        
        tabBarStyle: { height: 50 },
        tabBarLabelStyle: { marginBottom: -10 }
      }
    }
  >
    <Tabs.Screen name='index' options={{ title: 'Trilingo' }} />
  </Tabs>
)

export default TabsLayout