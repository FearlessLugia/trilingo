import { StyleSheet } from 'react-native'
import { colors } from '@/constants/colors'

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  }
})
