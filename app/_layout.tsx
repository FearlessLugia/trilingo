import { Stack } from 'expo-router'
import { colors } from '../constants/colors'


const RootLayout = () => (
  <Stack
    screenOptions={
      {
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center',
        headerBackTitle: 'Back'
      }
    }
  >
    <Stack.Screen name='index' options={{ title: 'Trilingo' }} />
  </Stack>
)

export default RootLayout