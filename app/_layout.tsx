import { Stack } from 'expo-router'
import { colors } from '../constants/colors'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} style={styles.container}>
        <Stack screenOptions={{ headerShown: false }}>
        
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})